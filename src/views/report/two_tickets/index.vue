<template>
  <div class="two_tickets" ref="two_tickets">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <div class="select__wrap">
          <div>选择时间：</div>
          <div>
            <el-date-picker
              v-model="time"
              align="right"
              type="month"
              placeholder="选择日期"
              size="small"
              :clearable="false"
              :editable="false"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :showAll="true"
            :showUnit="false"
            :showSys="false"
          ></cascade>
        </div>
        <BtnList
          resetContent="导出"
          btnStyle="textAlign:left;margin-left:32px"
          @check="checkList"
          @reset="onExport"
        />
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <div slot="title" class="title">
            <span class="span">{{ area_plant }}</span
            >&nbsp;<span class="span">{{ year }}</span> 年
            <span class="span">{{ month }}</span> 月 两票统计表
          </div>
          <div
            class="content-table"
            ref="zcurd"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <Zcurd ref="curd" :tableData="tableData" />
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>
<script>
import cascade from "@/components/selectOrg/index11.vue";
import layoutTable from "@/components/tableLayout/index";
import { getTwoTicketsData } from "@/api/report/lp.js";
import { excel } from "@/api/common";
import Zcurd from "./zcrud";
import { mapGetters } from "vuex";
import moment from "moment";
let area = "";
let plant = "";
export default {
  name: "two_tickets",
  props: {},
  data() {
    return {
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year(),
      month: moment(Date.now()).month(),
      time: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      query: {
        year: moment(Date.now()).year(),
        month: moment(Date.now()).month() + 1,
      },
      area: "",
      plant: "",
      area_plant: "",
      tableShow: true,
      rcode: "",
      pcode: "",
    };
  },
  components: { layoutTable, Zcurd, cascade },
  computed: {},
  created() {
    this.rcode = JSON.parse(sessionStorage.getItem("user")).user.regionCode;
    this.pcode = JSON.parse(sessionStorage.getItem("user")).user.projectCode;
    this.defAreaName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.regionName;
    this.defPlantName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.projectName;
    if (!this.defPlantName) {
      this.$nextTick(() => {
        this.area_plant = "";
      });
    } else {
      this.$nextTick(() => {
        this.area_plant = this.defAreaName
          ? this.defAreaName +
            (this.defPlantName ? " / " + this.defPlantName : "")
          : "";
      });
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.two_tickets.offsetHeight - 230;
      this.tableShow = true;
    });
    if (this.pcode) {
      this.query.areaCode = this.rcode;
      this.query.plantCode = this.pcode;
      this.checkList();
    } else {
      delete this.query.areaCode;
      delete this.query.plantCode;
    }
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year();
      this.query.month = moment(value).month() + 1;
    },
  },
  methods: {
    //查询
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.areaCode = this.$store.state.writeData.selectOptions.area;
        this.query.plantCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.areaCode = null;
        this.query.plantCode = null;
        area = "";
        plant = "";
      }
      // if (!this.query.plantCode) {
      //   return this.$message.error("请选择电厂");
      // }
      this.year = this.query.year;
      this.month = this.query.month;
      this.area_plant = area ? area + (plant ? " / " + plant : "") : "";
      getTwoTicketsData(this.query).then((res) => {
        let data = res.data;
        this.tableData = data;
      });
    },
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.areaCode = this.$store.state.writeData.selectOptions.area;
        this.query.plantCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.areaCode = null;
        this.query.plantCode = null;
        area = "";
        plant = "";
      }
      this.area_plant = area ? area + (plant ? " / " + plant : "") : "";
      // if (!this.query.plantCode) {
      //   return this.$message.error("请先选择电厂");
      // }
      // this.downloadFile("/datamonitor/desulphurizeExpendStatistics/excelDownload", {
      //   ...this.query,
      //   plantName: plant
      // });
      excel("/datamonitor/two_ticket_statics/export", {
        ...this.query,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.year}年 ${this.month}月 ${this.area_plant} 两票统计表.xlsx`;
        this.excel(data, excelName);
      });
    },
    onMyCascader(data) {
      // if (!data.area || !data.plant) {
      //   return this.$message("请选择区域和电厂");
      // }
      if (data.area == "all") {
        delete this.query.areaCode;
        delete this.query.plantCode;
        area = "";
        plant = "";
      } else {
        this.query.areaCode = data.area;
        this.query.plantCode = data.plant;
        area = data.name.split("/")[0];
        plant = data.name.split("/")[1];
      }
      this.checkList();
    },
  },
};
</script>
<style scoped lang="scss">
.two_tickets {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 20px 8px;
    .select__wrap {
      height: 42px;
      line-height: 42px;
      max-width: 25%;
      display: table;
      // width: 100%;
      & > div:nth-child(1) {
        display: table-cell;
        width: 0.1%;
        min-width: 90px;
        // height: 72px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.84);
        line-height: 12px;
        text-align: right;
      }
      & > div:nth-child(2) {
        display: table-cell;
      }
    }
  }
  .div__content-wrap {
    padding: 0 32px;

    .title {
      font-size: 18px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
    }
    .content-table {
      padding-bottom: 20px;
    }
  }
}
</style>
<style lang="scss">
.two_tickets {
  .el-card__body {
    padding: 0;
  }
  .avue-crud__menu {
    height: 0;
    min-height: 0;
    margin-bottom: 0;
  }
  .el-table thead.is-group th {
    background: #fff;
  }
  .el-table__fixed-footer-wrapper tbody td {
    background-color: #fff;
  }
  .el-table__footer-wrapper tbody td,
  .el-table__header-wrapper tbody td {
    background-color: #fff;
  }
}
.ht_master {
  height: 620px !important;
}
</style>

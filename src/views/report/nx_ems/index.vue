<template>
  <div class="de_gas" ref="nx_ems">
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
            :showAll="false"
            :showUnit="false"
            :showSys="false"
            :tlOrTx="'N'"
          ></cascade>
        </div>
        <!-- <SelOrg
          class="selorg-wrap"
          style="width:60%"
          @selectArear="selectArear"
          @selectPlant="selectPlant"
          :showDevice="false"
          :showSystem="false"
          :showUnit="false"
          :showAll="true"
          :hasAuthority="1"
        /> -->
        <!-- <el-button
            v-if="desulphurize_add"
              @click="onAdd"
              style="position:relative;right:-20px"
              type="primary"
              size="mini"
            >新增</el-button> -->
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
            <span class="span">{{ year }}</span>年 <span class="span">{{ month }}</span>月
            <span class="span">{{ area_plant }}</span> 脱硝装置耗用统计表
          </div>
          <div
            class="content-table"
            ref="zcurd"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <Zcurd
              ref="curd"
              :projectCode="projectCode"
              :year="year"
              :month="month"
              :height="tableHeight"
              :unitList="unitList"
              :tableData="tableData"
            />
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import layoutTable from "../../../components/tableLayout/index";
import { get_nx_ems } from "../../../api/report/nx_ems";
import moment from "moment";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud";
import { hasNoDataDays } from "./util";
import { excel } from "@/api/common";
import { mapGetters } from "vuex";
let area = "";
let plant = "";
export default {
  name: "nx_ems",
  props: {},
  data() {
    return {
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year(),
      month: moment(Date.now()).month() + 1,
      projectCode: "",
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
      unitList: ["#1", "#2"],
      code: "",
    };
  },
  components: { layoutTable, Zcurd, cascade },
  computed: {
    isNxSuccess() {
      return this.$store.state.nx_ems.isNxSuccess;
    },
    ...mapGetters(["permissions"]),
  },
  created() {
    this.desulphurize_add = this.permissions["txconsume_add"]; // 新增
    this.code = JSON.parse(sessionStorage.getItem("user")).user.projectCode;
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
        this.area_plant = this.defAreaName + "/" + this.defPlantName;
      });
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.nx_ems.offsetHeight - 230;
      this.tableShow = true;
    });
    if (this.code) {
      this.query.projectCode = this.code;
      this.checkList();
    } else {
      delete this.query.projectCode;
    }
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year();
      this.query.month = moment(value).month() + 1;
    },
    isNxSuccess(value) {
      if (value) {
        this.checkList();
        this.$store.commit("SET_ISNXSUCCESS", false);
      }
    },
  },
  methods: {
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      if (!this.query.projectCode) {
        return this.$message.error("请选择电厂");
      }
      this.year = this.query.year;
      this.month = this.query.month;
      this.projectCode = this.query.projectCode;
      this.area_plant = area + "/" + plant;
      this.get_nx_ems(this.query);
    },
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      this.area_plant = area + "/" + plant;
      if (!this.query.projectCode) {
        return this.$message.error("请先选择电厂");
      }
      // this.downloadFile("/datamonitor/hd_txconsume/export", {
      //   ...this.query,
      //   plantName: plant
      // });
      excel("/datamonitor/hd_txconsume/export", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.year}年 ${this.month}月 ${this.area_plant} 脱硝装置耗用统计表.xls`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   delete this.query.projectCode;
    // },
    // selectPlant(data) {
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.projectCode = data.deptCode;
    //   }
    // },
    get_nx_ems(query) {
      this.tableLoading = true;
      get_nx_ems(query).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        let { units, data } = datas;
        this.unitList = units;
        data.forEach((item) => {
          _.forOwn(item, (value, key) => {
            if (value == null) {
              item[key] = "--";
            }
          });
        });
        // let currentMonth = moment().format("MM");
        // let selectMonth = moment(this.time).format("MM");
        // let today = Number(moment().format("DD"));
        // if (selectMonth == currentMonth) {
        //   data = data.slice(0, today);
        // }
        this.tableData = data;
      });
    },
    // 点击新增按钮
    onAdd() {
      if (!this.query.projectCode) {
        return this.$message.error("请选择电厂");
      } else if (
        !this.tableData.length ||
        this.query.year + this.query.month != this.year + this.month
      ) {
        return this.$message.error("请先查询");
      }
      let curd = this.$refs.curd;
      curd.dialogFormVisible = true;
      let dayArray = hasNoDataDays(
        this.tableData,
        "day",
        this.query.year + "-" + this.query.month
      );
      curd.options = dayArray.map((item) => {
        return {
          label: this.query.year + "-" + this.query.month + "-" + item,
          value: item,
        };
      });
      curd.date = dayArray[dayArray.length - 1];
      curd.title = "新增记录";
      this.$store.commit("SET_QUERY", this.query);
      let datas = JSON.parse(JSON.stringify(this.tableData[0]));
      for (var key in datas) {
        datas[key] = null;
      }
      this.$store.commit("SET_ROW", datas);
    },
    onMyCascader(data) {
      if (!data.area || !data.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.query.projectCode = data.plant;
      area = data.name.split("/")[0];
      plant = data.name.split("/")[1];
      this.checkList();
    },
  },
};
</script>

<style scoped lang="scss">
.de_gas {
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
.de_gas {
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
</style>

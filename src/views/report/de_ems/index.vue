<template>
  <div class="de_gas" ref="de_ems">
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
            :tlOrTx="'S'"
          ></cascade>
        </div>
        <!--
            <SelOrg
            class="selorg-wrap"
            style="width:60%"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              :showDevice="false"
              :showSystem="false"
              :showUnit="false"
              :showAll="true"
              :hasAuthority="1"
        />-->
        <!-- <el-button
            v-if="desulphurize_add"
              @click="onAdd"
              style="position:relative;right:-20px"
              type="primary"
              size="mini"
        >新增</el-button>-->
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
            <span class="span">{{ year }}</span> 年 <span class="span">{{ month }}</span> 月
            <span class="span">{{ area_plant }}</span> 脱硫装置耗用统计表
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
              :point_code="pointCode"
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
import { mapGetters } from "vuex";
import { get_de_ems } from "../../../api/report/de_ems";
import moment from "moment";
import _ from "lodash";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud";
import { hasNoDataDays } from "./util";
import { excel } from "@/api/common";
let area = "";
let plant = "";
export default {
  name: "de_mes",
  props: {},
  data() {
    return {
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year().toString(),
      month:
        moment(Date.now()).month() + 1 > 9
          ? (moment(Date.now()).month() + 1).toString()
          : "0" + (moment(Date.now()).month() + 1),
      time: Date.now(),
      pointCode: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      query: {
        year: moment(Date.now()).year().toString(),
        month:
          moment(Date.now()).month() + 1 > 9
            ? (moment(Date.now()).month() + 1).toString()
            : "0" + (moment(Date.now()).month() + 1),
      },
      area: "",
      plant: "",
      area_plant: "",
      tableShow: true,
      unitList: ["#1", "#2"],
      rcode: "",
      pcode: "",
    };
  },
  components: { layoutTable, Zcurd, cascade },
  computed: {
    isSucess() {
      return this.$store.state.nx_ems.isSucess;
    },
    ...mapGetters(["permissions"]),
  },
  created() {
    this.desulphurize_add = this.permissions["desulphurize_add"]; // 新增
    this.desulphurize_update = this.permissions["desulphurize_update"]; // 修改
    this.desulphurize_delete = this.permissions["desulphurize_delete"]; // 删除
    this.desulphurize_download = this.permissions["desulphurize_download"]; // 下载
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
        this.area_plant = this.defAreaName + "/" + this.defPlantName;
      });
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.de_ems.offsetHeight - 230;
      this.tableShow = true;
    });
    if (this.pcode) {
      this.query.pointCode = this.rcode + "_" + this.pcode;
      this.checkList();
    } else {
      delete this.query.pointCode;
    }

  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month =
        moment(value).month() + 1 > 9
          ? (moment(value).month() + 1).toString()
          : "0" + (moment(value).month() + 1);
    },
    isSucess(value) {
      if (value) {
        this.checkList();
        this.$store.commit("SET_ISSUCESS", false);
      }
    },
  },
  methods: {
    //查询
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.pointCode =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.pointCode = null;
        area = "";
        plant = "";
      }
      if (!this.query.pointCode) {
        return this.$message.error("请选择电厂");
      }
      this.year = this.query.year;
      this.month = this.query.month;
      this.pointCode = this.query.pointCode;
      this.area_plant = area + "/" + plant;
      this.get_de_ems(this.query);
    },
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.pointCode =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.pointCode = null;
        area = "";
        plant = "";
      }
      this.area_plant = area + "/" + plant;
      if (!this.query.pointCode) {
        return this.$message.error("请先选择电厂");
      }
      // this.downloadFile("/datamonitor/desulphurizeExpendStatistics/excelDownload", {
      //   ...this.query,
      //   plantName: plant
      // });
      excel("/datamonitor/desulphurizeExpendStatistics/excelDownload", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.year}年 ${this.month}月 ${this.area_plant} 脱硫装置耗用统计表.xlsx`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   delete this.query.pointCode;
    //   this.query.area = data.deptCode;
    // },
    // selectPlant(data) {
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.pointCode = this.query.area + "_" + data.deptCode;
    //   }
    // },
    get_de_ems(query) {
      this.tableLoading = true;
      get_de_ems(query).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        let { unitList, data } = datas;
        this.unitList = unitList;
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
      if (!this.query.pointCode) {
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
        "date",
        this.query.year + "-" + this.query.month
      );
      curd.options = dayArray.map((item) => {
        return {
          label: this.query.year + "-" + this.query.month + "-" + item,
          value: item,
        };
      });
      // console.log(curd.options)
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
      this.query.pointCode = data.area + "_" + data.plant;
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
.ht_master {
  height: 620px !important;
}
</style>

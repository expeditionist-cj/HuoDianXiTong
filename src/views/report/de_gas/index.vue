<template>
  <div class="de_gas" ref="de_gas">
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
        <!-- <SelOrg
            class="selorg-wrap"
            style="width:60%"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              :showDevice="false"
              :showSystem="false"
              :showUnit="false"
              :showAll="true"
        />-->
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
            <span class="span">{{ y }}</span>年 <span class="span">{{ m }}</span>月
            <span class="span">{{ area_plant }}</span> 脱硫装置排放连续检测日平均值月报表
          </div>
          <div
            class="content-table"
            ref="zcurd"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <Zcurd
              :height="tableHeight"
              :sums="sums"
              :unitList="unitList"
              :tableData="tableData"
              @doSave="doSave"
            />
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import { DE_GAS_ORIGIN, DE_GAS_OVER } from "../../../dict/index";
import cascade from "@/components/selectOrg/index11.vue";
import layoutTable from "../../../components/tableLayout/index";
import { get_de_gas, saveAdjust } from "../../../api/report/de_gas";
import moment from "moment";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud";
import { excel } from "@/api/common";
import { completeData } from "./util";
let area = "";
let plant = "";
export default {
  name: "de_gas",
  props: {},
  data() {
    return {
      tableLoading: false,
      tableHeight: 400,
      y: moment(Date.now()).year(),
      m: moment(Date.now()).month() + 1,
      time: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      query: {
        y: moment(Date.now()).year(),
        m: moment(Date.now()).month() + 1,
      },
      area: "",
      plant: "",
      area_plant: "",
      tableShow: true,
      unitList: ["1", "2"],
      sums: {},
      code: "",
      defAreaName: "",
      defPlantName: "",
    };
  },
  components: { layoutTable, Zcurd, cascade },
  computed: {},
  created() {
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
      this.tableHeight = this.$refs.de_gas.offsetHeight - 230;
      this.tableShow = true;
    });
    if (this.code) {
      this.query.plant = this.code;
      this.checkList();
    } else {
      delete this.query.plant;
    }
  },
  watch: {
    time(value) {
      this.query.y = moment(value).year();
      this.query.m = moment(value).month() + 1;
    },
  },
  methods: {
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.plant = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.plant = null;
        area = "";
        plant = "";
      }
      if (!this.query.plant) {
        return this.$message.error("请选择电厂");
      }
      this.y = this.query.y;
      this.m = this.query.m;
      this.area_plant = area + "/" + plant;
      this.get_de_gas(this.query);
    },
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.plant = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.plant = null;
        area = "";
        plant = "";
      }
      this.area_plant = area + "/" + plant;
      if (!this.query.plant) {
        this.$message.error("请选择机组");
        return false;
      }
      // this.downloadFile('/datamonitor/emsOver/so2Exp',{...this.query,plantName:plant})
      excel("/datamonitor/emsOver/so2Exp", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.y}年 ${this.m}月 ${this.area_plant} 脱硫装置排放连续检测日平均值月报表.xls`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   delete this.query.plant;
    // },
    // selectPlant(data) {
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.plant = data.deptCode;
    //   }
    // },
    onMyCascader(data) {
      if (!data.area || !data.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.query.plant = data.plant;
      area = data.name.split("/")[0];
      plant = data.name.split("/")[1];
      this.checkList();
    },
    get_de_gas(query) {
      this.tableLoading = true;
      get_de_gas(query).then((res) => {
        this.tableLoading = false;
        let data = res.data.data;
        let { units, dataList, sums, maxs, mins, avgs, adjust } = data;
        this.unitList = units;
        let arry = completeData(dataList, `${this.query.y}-${this.query.m}`);
        let currentMonth = moment(Date.now()).month() + 1;
        let selectMonth = moment(this.time).month() + 1;
        if (selectMonth < currentMonth) {
          let tz = {};
          for (let i = 0; i < units.length; i++) {
            Object.keys(DE_GAS_ORIGIN).map((k) => {
              tz[units[i] + "_" + DE_GAS_ORIGIN[k].prop] = 0;
              // tz[units[i] + "_" + DE_GAS_ORIGIN[k].prop + "_bf"] =  
              //   avgs[units[i] + "_" + DE_GAS_ORIGIN[k].prop] || 0;
            });
            Object.keys(DE_GAS_OVER).map((k) => {
              tz[units[i] + "_" + DE_GAS_OVER[k].prop] = 0;
              // tz[units[i] + "_" + DE_GAS_OVER[k].prop + "_bf"] =  
              //   avgs[units[i] + "_" + DE_GAS_OVER[k].prop] || 0;
            });
          } 
          Object.keys(tz).map((k) => {
            Object.keys(adjust).map((key) => {
              if (k == key) {
                tz[k] = adjust[key];
              }
            });
          });
          tz.dy = "调整";
          arry.push(tz);
        }

        maxs.dy = "最大值";
        mins.dy = "最小值";
        avgs.dy = "合计或均值";

        arry.push(avgs);
        arry.push(maxs);
        arry.push(mins);
        arry.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (!isNaN(parseFloat(ele[k]))) {
              ele[k] = Math.round(ele[k] * 100) / 100;
            }
          });
        });
        this.tableData = arry;
        Object.keys(sums).map((k) => {
          if (!isNaN(parseFloat(sums[k]))) {
            sums[k] = Math.round(sums[k] * 100) / 100;
          }
        });
        this.sums = sums;
      });
    },
    //保存调整项
    doSave(data) {
      // for (let i = 0; i < this.unitList.length; i++) {
      //   Object.keys(DE_GAS_ORIGIN).map((k) => {
      //     delete data[units[i] + "_" + DE_GAS_ORIGIN[k].prop + "_bf"];
      //   });
      //   Object.keys(DE_GAS_OVER).map((k) => {
      //     delete data[units[i] + "_" + DE_GAS_ORIGIN[k].prop + "_bf"];
      //   });
      // }
      Object.keys(data).map((k) => {
        data[k] = data[k] ==="" ? 0 : Number(parseFloat(data[k]).toFixed(2))
      });
      saveAdjust({
        ...data,
        plant: this.query.plant,
        y: this.y,
        m: this.m,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.checkList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
    padding: 20px 8px;
    .select__wrap {
      height: 42px;
      line-height: 42px;
      max-width: 25%;
      display: table;
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
    // .u {
    //   // padding: 20px
    // }
    .title {
      font-size: 18px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgb(80, 78, 78);
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

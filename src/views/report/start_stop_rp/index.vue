<template>
  <div class="start_stop_rp" ref="start_stop_rp">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <!-- <SelOrg
            class="selorg-wrap"
            style="width:100%"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              @selectUnit="selectUnit"
              @selectDevice="selectDevice"
              :showSystem="false"
              :showDeviceAll="false"
        />-->
        <div class="select__wrap">
          <div>选择日期段：</div>
          <div>
            <el-date-picker
              style="width: 400px"
              v-model="time"
              type="daterange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
              :clearable="false"
              value-format="yyyy-MM-dd"
              :pickerOptions="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>筛选条件：</span>
          <cascade
            @plantCode="plantCode"
            @onMyCascader="onMyCascader"
            @selUnitCnName="selUnitCnName"
            @selPlantCnName="selPlantCnName"
            :showAll="showAll"
            :showSys="false"
          ></cascade>
        </div>
        <!-- <BtnList
          resetContent="查询近一月"
          checkContent="查询近一周"
          btnStyle="textAlign:left;margin-left:32px;display:inline-block;width:auto"
          @check="onWeek"
          @reset="onMonth"
          resetType="primary"
        ></BtnList>-->
        <BtnList
          resetContent="导出"
          btnStyle="textAlign:left;margin-left:32px;display:inline-block;width:auto"
          @check="checkList"
          @reset="onExport"
        ></BtnList>
        <div>
          <el-button
            v-if="hdunitrunstatus_add"
            type="primary"
            size="mini"
            style="margin-left: 10px"
            @click="onWrite"
            >启停填报</el-button
          >
        </div>
      </div>
      <div class="div__content-wrap">
        <layOutTable>
          <span class="title" slot="title">
            {{ this.title.area }}{{ this.title.plant ? "/" : ""
            }}{{ this.title.plant }} {{ this.title.unit }} 装置启停统计表
          </span>
          <!-- {{this.title.type}} -->
          <div slot="table">
            <el-table
              v-if="tableShow"
              v-loading="loading"
              border
              :data="tableData"
              style="width: 100%; min-height: 550px"
              :height="tableHeight"
              :cell-class-name="addCellClass"
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="region"
                label="区域"
                min-width="120"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="project"
                label="项目"
                width="120"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="deviceName"
                label="机组"
                min-width="120"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="stopTime"
                label="解列时刻"
                min-width="160"
                sortable
              ></el-table-column>
              <el-table-column
                align="center"
                prop="startTime"
                label="并网时刻"
                min-width="160"
                sortable
              >
                <!-- <template slot-scope="scope">
                  <span style="color:red">{{scope.row.startTime}}</span>
                </template>-->
              </el-table-column>
              <el-table-column
                align="center"
                prop="outageDuration"
                label="停运时长(h)"
                min-width="160"
                sortable
              >
                <!-- <template slot-scope="scope">
                  
                </template>-->
              </el-table-column>
            </el-table>
          </div>
        </layOutTable>
      </div>
    </Card>

    <el-dialog :title="stopTitle" :visible.sync="dialogVisible" width="30%">
      <div class="radio_tool_wrap">
        <div class="radio_wrap">
          <span>机组：</span>
          <el-radio-group v-model="radioUnit" @change="changeUnit">
            <el-radio
              v-for="item in unitCode"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </div>
        <div class="radio_wrap">
          <span>当前状态：</span>
          <span>{{ lastStatus }}</span>
        </div>
        <div class="radio_wrap">
          <span>切换状态：</span>
          <el-radio-group v-model="radioStatus">
            <el-radio :label="1" :disabled="isStartDisable">启机</el-radio>
            <el-radio :label="0" :disabled="isStopDisable">停机</el-radio>
          </el-radio-group>
        </div>
        <div class="radio_wrap" v-show="showStopType">
          <span>停机类型：</span>
          <el-radio-group v-model="radioType">
            <el-radio
              :label="2"
              :disabled="lastStatus == '停机' && stopType == 2"
              >备用</el-radio
            >
            <el-radio
              :label="1"
              :disabled="lastStatus == '停机' && stopType == 1"
              >检修</el-radio
            >
          </el-radio-group>
        </div>
        <div class="radio_wrap">
          <span>选择时间：</span>
          <el-date-picker
            v-model="selectTime"
            type="datetime"
            placeholder="选择日期时间"
            :pickerOptions="pickerOptions"
            :default-time="selectTime"
            size="small"
          ></el-date-picker>
        </div>
      </div>
      <el-dialog
        width="30%"
        title="确认"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div class="div_confirm_wrap">
          <div class="confirm_wrap">{{ currentSelectTime }}</div>
          <div class="confirm_wrap">
            <span>{{ activeUnitName }}</span>
            <span>即将</span>
            <span style="font-weight: bold">{{
              radioStatus == 1 ? "启机" : "停机"
            }}</span>
            <span v-show="showStopType">
              {{ radioType == 2 ? "备用" : "检修" }}
            </span>
          </div>
          <div class="confirm_wrap" style="color: red">
            请再次检查机组和时间后确认！
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="insideCancel">取 消</el-button>
          <el-button type="primary" @click="insideConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outsideCancel">取 消</el-button>
        <el-button type="primary" @click="outsideConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import moment from "moment";
import "moment/locale/zh-cn";
import {
  get_st_sp_rp,
  get_excel,
  saveStatusPoint,
  selectUnitRunStatus,
} from "../../../api/report/start_stop_rp";
import _ from "lodash";
import layOutTable from "../../../components/tableLayout/index";
import { excel, getUnit } from "@/api/common";
import { mapGetters } from "vuex";
moment.locale("zh-cn");
let stime = moment().subtract(6, "months").format("YYYY-MM-DD 00:00:00");
let etime = moment().format("YYYY-MM-DD 23:59:59");
export default {
  name: "stop_start_rp",
  props: {},
  data() {
    return {
      showAll: false,
      isStartDisable: true,
      isStopDisable: false,
      activeUnitName: "", //当前用户选择的机组
      unitCode: [],
      innerVisible: false,
      dialogVisible: false,
      selectTime: Date.now(), //当前用户选择的启停填报时间
      currentStopTime: "", //当前查询结果最新解列时刻
      radioUnit: 11,
      radioStatus: "2",
      radioType: "",
      showStopType: false,
      loading: false,
      tableShow: true,
      tableHeight: 400,
      stopTitle: "填写停机时间",
      time: [stime, etime],
      pickerOptions: {
        // selectableRange: ["22:00:00 - 23:59:59", "00:00:00 - 02:00:00"],
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      query: {
        stime,
        etime,
      },
      title: {
        area: "",
        plant: "",
        unit: "",
        // type: ""
      },
      catch: {},
      identity: "",
      lastStatus: "无",
      stopType: "",
    };
  },
  components: {
    layOutTable,
    cascade,
  },
  computed: {
    currentSelectTime() {
      return new Date(this.selectTime).toLocaleString("chinese", {
        hour12: false,
      });
    },
    ...mapGetters(["permissions"]),
  },
  created() {
    this.hdunitrunstatus_add = this.permissions["hdunitrunstatus_add"]; // 启停填报
    let defAreaName = JSON.parse(sessionStorage.getItem("user")).user
      .regionName;
    let defPlantName = JSON.parse(sessionStorage.getItem("user")).user
      .projectName;

    if (!defPlantName) {
      this.$nextTick(() => {
        this.title.area = "";
        this.title.plant = "";
      });
    } else {
      this.$nextTick(() => {
        this.title.area = defAreaName;
        this.title.plant = defPlantName;
      });
    }
    // 根据登录用户角色，决定筛选条件中是否显示全部公司
    this.identity = this.$store.state.writeData.identity;
    if (
      this.identity == "ROLE_ADMIN" ||
      this.identity == "ROLE_Analysiser" ||
      this.identity == "ROLE_Supervisor"
    ) {
      this.showAll = true;
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.start_stop_rp.offsetHeight - 260;
      this.tableShow = true;
    });
  },
  watch: {
    time(value) {
      this.query.stime = value[0];
      this.query.etime = value[1];
    },
    radioStatus(value) {
      if (value == 0) {
        this.showStopType = true;
      } else {
        this.showStopType = false;
      }
    },
    unitCode(value) {
      this.radioUnit = this.query.unitCode;
    },
    radioUnit(value) {
      let unitCode = this.unitCode;
      unitCode.forEach((ele) => {
        if (ele.value == value) {
          this.activeUnitName = ele.label;
        }
      });
    },
  },
  methods: {
    changeUnit(value) {
      this.radioStatus = 2;
      this.radioType = "";
      this.query.unitCode = value;
      this.checkList();
    },
    // 启停填报内层弹框 -- 点击确认
    insideConfirm() {
      this.innerVisible = false;
      this.dialogVisible = false;
      let ajaxData = {};
      ajaxData.plantCode = this.query.plantCode;
      ajaxData.unitCode = this.query.unitCode;
      ajaxData.isRun = this.radioStatus;
      if (this.radioStatus) {
        delete ajaxData.stopType;
      } else {
        ajaxData.stopType = this.radioType;
      }
      ajaxData.changeTime = moment(this.selectTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      saveStatusPoint(ajaxData).then((res) => {
        this.radioStatus = 2;
        this.radioType = "";
        let code = res.data.code;
        if (code == "0") {
          this.$message.success("操作成功");
          this.checkList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    // 启停填报外层弹窗 --  点击确认
    outsideConfirm() {
      if (this.radioStatus > 1) {
        return this.$message.error("请选择即将操作的状态");
      } else if (this.radioStatus == 0 && this.radioType == "") {
        return this.$message.error("请选择停机类型");
      } else if (this.selectTime > Date.now()) {
        return this.$message.error("请选择小于当前时刻的时间");
      } else if (this.selectTime < this.currentStopTime) {
        return this.$message.error("请选择大于上次解列时刻的时间");
      }
      this.innerVisible = true;
    },
    // 内层弹窗 -- 点击取消
    insideCancel() {
      this.innerVisible = false;
    },
    // 外层弹窗 -- 点击取消
    outsideCancel() {
      this.radioStatus = 2;
      this.radioType = "";
      this.dialogVisible = false;
    },
    // 筛选条件
    onMyCascader(data) {
      if (data.area == "all") {
        delete this.query.areaCode;
      } else {
        this.query.areaCode = data.area;
      }
      this.query.plantCode = data.plant;
      this.query.unitCode = data.unit;
      this.catch.area = data.name.split("/")[0];
      this.catch.plant = data.name.split("/")[1];
      this.catch.unit = data.name.split("/")[2];
      this.checkList();
    },
    // onWeek() {
    //   if (!this.query.unit) {
    //     this.$message.error("请选择机组");
    //     return false;
    //   }
    //   this.title = this.catch;
    //   let sta = moment()
    //     .subtract(7, "days")
    //     .format("YYYY-MM-DD");
    //   let end = moment().format("YYYY-MM-DD");
    //   this.time = [sta, end];
    //   this.$nextTick(() => {
    //     this.get_st_sp_rp(this.query);
    //   });
    // },
    // onMonth() {
    //   if (!this.query.unit) {
    //     this.$message.error("请选择机组");
    //     return false;
    //   }
    //   this.title = this.catch;
    //   let sta = moment()
    //     .subtract(30, "days")
    //     .format("YYYY-MM-DD");
    //   let end = moment().format("YYYY-MM-DD");
    //   this.time = [sta, end];
    //   this.$nextTick(() => {
    //     this.get_st_sp_rp(this.query);
    //   });
    // },
    checkList() {
      // if (!this.query.unitCode) {
      //   this.$message.error("请选择机组");
      //   return false;
      // }
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.areaCode = this.$store.state.writeData.selectOptions.area;
        this.query.plantCode = this.$store.state.writeData.selectOptions.plant;
        this.catch.area = this.$store.state.writeData.selectOptions.areaName;
        this.catch.plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.areaCode = null;
        this.query.plantCode = null;
        this.catch.area = "";
        this.catch.plant = "";
      }
      this.title = this.catch;
      this.$nextTick(() => {
        this.get_st_sp_rp(this.query);
      });
    },
    onExport() {
      // if (!this.query.unit) {
      //   this.$message.error("请选择机组");
      //   return false;
      // }
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.areaCode = this.$store.state.writeData.selectOptions.area;
        this.query.plantCode = this.$store.state.writeData.selectOptions.plant;
        this.catch.area = this.$store.state.writeData.selectOptions.areaName;
        this.catch.plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.areaCode = null;
        this.query.plantCode = null;
        this.catch.area = "";
        this.catch.plant = "";
      }
      this.title = this.catch;
      excel("/datamonitor/hdunitrunstatus/selectByParamExcel", this.query).then(
        (res) => {
          let data = res.data;
          let excelName = `${this.catch.area || ""}${this.catch.plant || ""}${
            this.catch.unit || ""
          }装置启停统计表.xlsx`;
          this.excel(data, excelName);
        }
      );
    },
    // 查询报表数据
    get_st_sp_rp(query) {
      this.loading = true;
      return selectUnitRunStatus(query).then((res) => {
        this.loading = false;
        let data = res.data.data;
        if (data == "无数据") {
          this.isStartDisable = true;
          this.isStopDisable = false;
          data = [];
          this.lastStatus = "无";
        } else if (data.length) {
          this.currentStopTime = new Date(
            data[data.length - 1].stopTime
          ).getTime();
          this.lastStatus =
            data[data.length - 1].lastStatus == 1
              ? "启机"
              : data[data.length - 1].lastStatus == 0
              ? "停机"
              : "无";
          this.stopType = data[data.length - 1].stopType;
          if (data[data.length - 1].lastStatus == "1") {
            this.isStartDisable = true;
            this.isStopDisable = false;
          } else {
            this.isStartDisable = false;
            this.isStopDisable = false;
          }
          let sumTotal = [];
          data.forEach((item) => {
            sumTotal.push(Number(item.outageDuration));
          });
          let sum = eval(sumTotal.join("+")).toFixed(2); //求和
          let obj = {
            startTime: "累计停运时长",
            outageDuration: sum,
          };
          data.push(obj);
        }
        this.tableData = data;
      });
    },
    addCellClass({ row, column, rowIndex, columnIndex }) {
      let len = this.tableData.length;
      if (len) {
        if (len - 1 == rowIndex && (columnIndex == 6 || columnIndex == 7)) {
          return "sum-cell";
        }
      }
    },
    //设置title
    setTitle(obj) {
      this.title = _.assign(this.title, obj);
    },
    // 打开启停填报弹窗
    onWrite() {
      this.selectTime = Date.now();
      if (!this.query.unitCode) {
        return this.$message.error("请先选择机组");
      } else {
        // 根据电厂查询机组
        getUnit(this.selectPlantCode).then((res) => {
          this.unitCode = [];
          let data = res.data.data;
          data.forEach((item) => {
            let obj = {};
            obj.label = item.deviceName;
            obj.value = item.deviceCode;
            this.unitCode.push(obj);
          });
        });
        this.dialogVisible = true;
      }
    },
    plantCode(code) {
      this.selectPlantCode = code;
    },
    selUnitCnName(unitName) {
      this.unitName = unitName;
    },
    selPlantCnName(name) {
      this.stopTitle = name;
    },
  },
};
</script>

<style scoped lang="scss">
.start_stop_rp {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 30px;
    .select__wrap {
      height: 42px;
      max-width: 50%;
      line-height: 42px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
  }
  .radio_tool_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .radio_wrap {
      display: flex;
      text-align: center;
      align-items: center;
      padding: 8px 0;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
.div_confirm_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .confirm_wrap {
    padding: 5px 0;
    font-size: 16px;
    span {
      margin-right: 10px;
    }
  }
}
</style>

<style lang="scss">
.start_stop_rp {
  .basic-container .el-card {
    // border-radius: 0px;
  }
  .el-table--border,
  .el-table--group {
    // border: 1px solid #333;
  }
  .avue-crud {
    width: 100%;
  }
  .avue-crud__header {
    margin-bottom: 0px;
  }
  .el-card__body {
    padding: 0;
  }
  .avue-crud__menu {
    height: 0;
    min-height: 0;
    margin-bottom: 0;
  }
  //   .el-table--border,
  //   .el-table--group {
  //     border: 1px solid #333;
  //   }
  //   .el-table--border td,
  //   .el-table--border th,
  //   .el-table__body-wrapper
  //     .el-table--border.is-scrolling-left
  //     ~ .el-table__fixed {
  //     border-right: 1px solid #333;
  //   }
  //   .el-table td,
  //   .el-table th.is-leaf {
  //     border-bottom: 1px solid #333;
  //     border-top: 1px solid #333;
  //   }
  .el-table thead.is-group th {
    background: #fff;
  }
  .sum-cell {
    padding: 0 !important;
    background: rgba(237, 241, 251, 1) !important;
    font-size: 16px !important;
    font-family: PingFang-SC-Bold, PingFang-SC !important;
    font-weight: bold !important;
    color: rgba(63, 158, 255, 1) !important;
    border: 1px solid rgba(220, 223, 230, 1);
  }
}
.title {
  font-size: 18px;
  font-family: PingFang-SC-Heavy, PingFang-SC;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}
</style>

<template>
  <div class="alarmhistory" ref="alarmhistory">
    <Card cardStyles="min-height:500px;margin-bottom:16px;padding:12px 32px;">
      <div style="display:flex;flex-direction:row;flex-wrap:wrap">
        <SelOrg
          style="width:65%;"
          @selectArear="selectArear"
          @selectPlant="selectPlant"
          @selectUnit="selectUnit"
          @selectDevice="selectDevice"
          :showSystem="false"
          ref="myorg"
        />
        <BtnList btnStyle="textAliconfigId:center;width:15%" @check="checkList" @reset="setReset" />
        <div style="display:flex;width:100%;">
          <div class="grid-content" style="width:17%;margin-right:20px;">
            <div>报警点类型：</div>
            <div>
              <el-select @change="changeSensor" size="small" v-model="sensor" placeholder="请选择">
                <el-option
                  v-for="item in sensorOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="grid-content" style="width:17%;margin-right:20px;">
            <div>报警级别：</div>
            <div>
              <el-select @change="changeAlarm" size="small" v-model="alarmLevel" placeholder="请选择">
                <el-option
                  v-for="item in alarmOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="grid-content" style="width:45%;margin-right:20px;">
            <div>时间：</div>
            <div>
              <el-date-picker
                size="small"
                v-model="time"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                aliconfigId="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div style="line-height:70px;text-aliconfigId:center;width:20%;margin-right:20px;">
            <el-button plain size="small" @click="clickWeek">查询近一周</el-button>
            <el-button plain size="small" @click="clickMonth">查询近一月</el-button>
          </div>
        </div>
        <div
          @click="clickExcel"
          class="excel"
          style="line-height:70px;text-align:left;width:12%"
        >
          <el-button size="mini" type="primary">
            导出Excel
            <i class="el-icon-download"></i>
          </el-button>
        </div>
        <div class="ipt__wrap">
          <input placeholder="报警名称" type="text" v-model="fuzzyIpt" />
          <i class="el-icon-search" @click="fuzzyCheck">查询</i>
        </div>
      </div>
      <!-- table 列表 -->
      <div class="list__wrap">
        <avue-crud
          ref="crud"
          :page="page"
          :data="listData"
          :table-loading="tableLoading"
          :option="tableOption"
          @on-load="getList"
        >
          <template slot-scope="scope" slot="configId">
            <el-radio
              v-model="radio"
              :label="scope.row.$index"
              @change="onRadio(scope.row)"
            >{{label}}</el-radio>
          </template>
        </avue-crud>
      </div>
    </Card>

    <!-- 曲线 -->
    <!-- <Mycard cardStyles="height:500px">
      <div class slot="header">
        <span>报警时刻曲线</span>
        <el-radio-group
          v-model="curveTieme"
          size="mini"
          style="float:right;position:relative;top:10px"
          :border="false"
        >
          <el-radio-button label="5min"></el-radio-button>
          <el-radio-button label="10min"></el-radio-button>
          <el-radio-button label="1h"></el-radio-button>
          <el-radio-button label="24h"></el-radio-button>
        </el-radio-group>
      </div>
      <div class slot="content" style="height:412px;width:100%">
        <v-chart style="width:100%" autoresize :options="curveOption" />
      </div>
    </Mycard> -->
    <Foot />
  </div>
</template>

<script>
import Card from "@/components/card/index";
import Mycard from "@/components/mycard/mycard";
import Foot from "@/components/footer/index";
import { lineConfig } from "./echartConfig";
import { RandomArray, createArray, getMin } from "@/util/util";
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import { tableOption } from "@/const/crud/datamon/alarmhistory";
import moment from "moment";
import { excel } from "@/api/common";
import {
  fetchAlarmLevle,
  getList,
  getCurveData,
  // ept_excel,
} from "@/api/datamon/alarmhistory";
import _ from "lodash";
import config from '../../../page/index/sidebar/config';
let count = 0;
export default {
  name: "alarmhistory",
  props: {},
  data() {
    return {
      radio: 0,
      label: "",
      curveTieme: "5min",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        },
      },
      curveOption: lineConfig({
        xData: [],
        seriesData: [],
      }),
      reset: false,
      sensor: "",
      alarmLevel: "",
      alarmOption: [],
      sensorOption: [
        {
          label: "全部",
          value: "all",
        },
        {
          label: "模拟量",
          value: "ax",
        },
        {
          label: "开关量",
          value: "dx",
        },
        {
          label: "计算量",
          value: "cal",
        },
        // {
        //   label: "长整型",
        //   value: "3",
        // },
        // {
        //   label: "浮点数",
        //   value: "4",
        // },
      ],
      time: [
        moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
      ],
      listData: [],
      fuzzyIpt: "",
      tableLoading: false,
      tableOption: tableOption,
      page: {
        total: 1000, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      query: {
        startTime: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      curveInter: 5,
      configId: "",
      stime: "",
    };
  },
  components: {
    Card,
    Foot,
    Mycard,
    SelOrg,
    BtnList,
  },
  computed: {},
  created() {},
  mounted() {
    // 获取报警级别
    fetchAlarmLevle().then((response) => {
      let {
        data,
        data: { data: res, code },
      } = response; 
      if (!code) {
        let arr = res.map((obj) => {
          return {
            label: obj.configName,
            value: obj.alarmLevel,
          };
        });
        arr.unshift({
          label: "全部",
          value: "all",
        }); 
        this.alarmOption = arr;
      }
    });
    count = 1;
  },
  watch: {
    time(value) {
      this.query.startTime = value[0];
      this.query.endTime = value[1];
    },
    fuzzyIpt(value) {
      !value
        ? (this.query = _.omit(this.query, "alarmName"))
        : (this.query.alarmName = value);
    },

    curveTieme(value) {
       
      let obj = {
        id: this.configId,
      };
      switch (value) {
        case "5min":
          this.curveInter = 5;
          obj.startTime = getMin(-5, this.stime);
          obj.endTime = getMin(0, this.stime);
          this.getCurveData(obj);
          break;
        case "10min":
          this.curveInter = 10;
          obj.startTime = getMin(-10, this.stime);
          obj.endTime = getMin(0, this.stime);
          this.getCurveData(obj);
          break;
        case "1h":
          this.curveInter = 60;
          obj.startTime = getMin(-60, this.stime);
          obj.endTime = getMin(0, this.stime);
          this.getCurveData(obj);
          break;
        default:
          this.curveInter = 60 * 24;
          obj.startTime = getMin(-60 * 24, this.stime);
          obj.endTime = getMin(0, this.stime);
          this.getCurveData(obj);
          break;
      }
    },
  },
  methods: {
    // 重置
    setReset() {
      this.$refs.myorg.reset1();
      this.sensor = "";
      this.alarmLevel = "";
      this.time = "";
      this.fuzzyIpt = "";
      this.query = {};
    },
    // 查询历史数据列表
    checkList() {
      // if (!this.query.sys) {
      //   return this.$message.error("请选择电厂");
      // } else 
      if (!this.time.length) {
        return this.$message.error("请选择查询时间");
      }
      this.getList(this.page, this.query);
    },
    // clickRow(row, event, column) {
    //   let { configId, stime } = row;
    //   let obj = {
    //     pg: configId,
    //     startTime: getMin(-this.curveInter, stime),
    //     endTime: getMin(this.curveInter, stime),
    //   };
    //   this.configId = configId;
    //   this.stime = stime;
    //   this.getCurveData(obj);
    // },
    // 导出excel
    clickExcel() {
      let obj = {
        pn: this.page.currentPage,
        ps: this.page.pageSize,
        ...this.query,
      };
      excel("/datamonitor/hdalarminfo/exportHisByCdt", {
        ...obj,
      }).then((res) => {
        let data = res.data;
        let excelName = `报警历史查询表.xlsx`;
        this.excel(data, excelName);
      });
    },
    // 点击查询近一周
    clickWeek() {
      let now = moment().format("YYYY-MM-DD HH:mm:ss");
      let beforeWeek = moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      this.time = [beforeWeek, now];
      this.query.startTime = beforeWeek;
      this.query.endTime = now;
      this.page.currentPage = 1;
      this.getList(this.page, this.query);
    },
    // 点击查询近一月
    clickMonth() {
      let now = moment().format("YYYY-MM-DD HH:mm:ss");
      let beforeWeek = moment()
        .subtract(1, "month")
        .format("YYYY-MM-DD HH:mm:ss");
      this.time = [beforeWeek, now];
      this.query.startTime = beforeWeek;
      this.query.endTime = now;
      this.page.currentPage = 1;
      this.getList(this.page, this.query);
    },
    // 模糊查询
    fuzzyCheck() {
      this.checkList();
    },
    // 区域选择
    selectArear(data) {
      delete this.query.plant;
      delete this.query.unit;
      delete this.query.device;
      if (data == "all") {
        this.query = _.omit(this.query, "area");
      } else {
        this.query.area = data.deptCode;
      }
    },
    // 电厂选择
    selectPlant(data) {
      delete this.query.unit;
      delete this.query.device;
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        this.query.plant = data.deptCode;
      }
    },
    // 机组选择
    selectUnit(data) {
      delete this.query.device;
      if (data == "all") {
        this.query = _.omit(this.query, "unit");
      } else {
        this.query.unit = data.deviceCode;
      }
    },
    // 装置选择
    selectDevice(data) {
      delete this.query.sys;
      switch (data) {
        case "all":
          this.query = _.omit(this.query, "device");
          break;
        case "tlsys_code":
          this.query.device = "S";
          break;
        case "txsys_code":
          this.query.device = "N";
          break;
        default:
          this.query.device = "D";
          break;
      }
    },
    // 系统选择
    // selectSystem(data) {
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "sys");
    //   } else {
    //     this.query.sys = data.type;
    //   }
    // },
    // 选择传感器类型
    changeSensor(value) {
      if (value == "all") {
        this.query = _.omit(this.query, "valType");
      } else {
        this.query.valType = value;
      }
    },
    // 选择报警级别
    changeAlarm(value) {
      if (value == "all") {
        this.query = _.omit(this.query, "alarmLevel");
      } else {
        this.query.alarmLevel = value;
      }
    },
    // 查询电厂列表
    getList(page, params = this.query) {
      this.tableLoading = true;
      getList(
        Object.assign(
          {
            pn: page.currentPage,
            ps: page.pageSize,
          },
          params
        )
      ).then((response) => {
        let {
          data,
          data: { code, data: res },
        } = response;
        res == undefined ? (res = []) : null;
        this.listData = res.records || [];
        this.page.total = res.total || 0;
        this.page.currentPage = res.pn || 1;
        this.tableLoading = false;
        if (this.listData.length) {
          let [{ configId,etime }] = this.listData; 
          let stime =  etime || new Date();
          let obj = {
            id: configId,
            startTime: getMin(-5, stime),
            endTime: getMin(0, stime),
          };
          this.configId = configId;
          this.stime = stime;
          this.getCurveData(obj);
        }
      }).catch(err=>{
        this.tableLoading = false;
      })
    },
    // 查询曲线
    getCurveData(obj) {
      getCurveData(obj)
        .then((res) => {
          return res.data.data;
        })
        .then((res) => {
          let obj = {
            xData: [],
            seriesData: [],
          };

          res.map((item) => {
            obj.xData.push(item.time);
            obj.seriesData.push(item.val);
          });
          this.curveOption = lineConfig({ ...obj });
        });
    },
    // 点击单选
    onRadio(row) { 
      this.stime = row.etime || new Date();
      let { configId } = row;
      this.configId = configId;
      let obj = {
        id: configId,
        startTime: getMin(-this.curveInter, this.stime),
        endTime: getMin(0, this.stime),
      };
      this.getCurveData(obj);
    },
  },
};
</script>

<style scoped lang="scss">
.alarmhistory {
  padding: 0 10px;
  // overflow-y: scroll;
  // height: 100%;
  .grid-content {
    // height: 100%;
    height: 72px;
    line-height: 72px;
    display: table;
    width: 100%;

    & > div:nth-child(1) {
      display: table-cell;
      width: 0.1%;
      width: 90px;
      // height: 72px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 12px;
      text-aliconfigid: right;
    }
    & > div:nth-child(2) {
      display: table-cell;
    }
  }
  .ipt__wrap {
    height: 49px;
    line-height: 40px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    input {
      width: calc(100% - 70px);
      height: 15px;
      border: none;
      padding: 4px;
      font-size: 14px;
      vertical-aliconfigid: bottom;
    }
    i {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(63, 158, 255, 1);
      position: relative;
      top: 12px;
      cursor: pointer;
    }
  }
  .list__wrap {
    position: relative;
    cursor: pointer;
    .excel {
      position: absolute;
      // top: 34px;
      // left: 10px;
      z-index: 20;
    }
  }
}
</style>
<style lang="scss">
.alarmhistory {
  .el-col {
    margin-bottom: 0px;
  }
}
</style>

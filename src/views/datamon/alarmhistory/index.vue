<template>
  <div class="alarmhistory" ref="alarmhistory">
    <Card cardStyles="min-height:500px;margin-bottom:16px;padding:12px 32px;">
      <el-row :gutter="10">
        <el-col :span="20">
          <SelOrg
            @selectArear="selectArear"
            @selectPlant="selectPlant"
            @selectUnit="selectUnit"
            @selectDevice="selectDevice"
            @selectSystem="selectSystem"
            ref="myorg"
          />
        </el-col>
        <el-col :span="4">
          <BtnList btnStyle="textAlign:center" @check="checkList" @reset="setReset" />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="20">
          <el-row :gutter="10">
            <el-col :span="5">
              <div class="grid-content">
                <div>传感器类型：</div>
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
            </el-col>
            <el-col :span="5">
              <div class="grid-content">
                <div>报警级别：</div>
                <div>
                  <el-select
                    @change="changeAlarm"
                    size="small"
                    v-model="alarmLevel"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in alarmOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <div>查询时间：</div>
                <div>
                  <el-date-picker
                    size="small"
                    v-model="time"
                    type="datetimerange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="line-height:72px;text-align:center">
                <el-button plain size="small" @click="clickWeek">查询近一周</el-button>
                <el-button plain size="small" @click="clickMonth">查询近一月</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <div class="ipt__wrap">
            <input placeholder="请输入查询内容" type="text" v-model="fuzzyIpt" />
            <i class="el-icon-search" @click="fuzzyCheck">模糊查询</i>
          </div>
        </el-col>
      </el-row>

      <!-- table 列表 -->
      <div class="list__wrap">
        <div @click="clickExcel" class="excel">
          <el-button size="mini" type="primary">
            导出Excel
            <i class="el-icon-download"></i>
          </el-button>
        </div>
        <avue-crud
          ref="crud"
          :page="page"
          :data="listData"
          :table-loading="tableLoading"
          :option="tableOption"
          @on-load="getList"
        >
          <template slot-scope="scope" slot="GN">
            <el-radio
              v-model="radio"
              :label="scope.row.$index"
              @change="onRadio(scope.row.$index,scope.row)"
            >{{label}}</el-radio>
          </template>
        </avue-crud>
      </div>
    </Card>

    <!-- 曲线 -->
    <Mycard cardStyles="height:500px">
      <div class slot="header">
        <span>报警时刻曲线</span>
        <el-radio-group
          v-model="curveTieme"
          size="mini"
          @change="changeCurveTime"
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
    </Mycard>
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
import {
  fetchAlarmLevle,
  getList,
  getCurveData,
  ept_excel
} from "@/api/datamon/alarmhistory";
import _ from "lodash";
let count = 0;
export default {
  props: {},
  data() {
    return {
      radio: 0,
      label: "",
      curveTieme: "5min",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      curveOption: lineConfig({
        xData: [
          "2019/09/20 17:58:51",
          "2019/09/20 17:58:51",
          "2019/09/20 17:58:51"
        ],
        seriesData: RandomArray(500, 20)
      }),
      reset: false,
      sensor: "",
      alarmLevel: "",
      alarmOption: [],
      sensorOption: [
        {
          label: "全部",
          value: "all"
        },
        {
          label: "模拟量",
          value: "0"
        },
        {
          label: "数字量",
          value: "1"
        },
        {
          label: "短整型",
          value: "2"
        },
        {
          label: "长整型",
          value: "3"
        },
        {
          label: "浮点数",
          value: "4"
        }
      ],
      time: [
        moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss")
      ],
      listData: [],
      fuzzyIpt: "",
      tableLoading: false,
      tableOption: tableOption,
      page: {
        total: 1000, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      query: {
        startTime: moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      curveInter: 5,
      GN: "",
      stime: ""
    };
  },
  components: {
    Card,
    Foot,
    Mycard,
    SelOrg,
    BtnList
  },
  computed: {},
  created() {},
  mounted() {
    fetchAlarmLevle().then(response => {
      let {
        data,
        data: { data: res, code }
      } = response;
      if (!code) {
        let arr = res.map(obj => {
          return {
            label: obj.configName,
            value: obj.alarmLevel
          };
        });
        arr.unshift({
          label: "全部",
          value: "all"
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
        ? (this.query = _.omit(this.query, "ptName"))
        : (this.query.ptName = value);
    },
    curveTieme(value) {
      let obj = {
        pg: this.GN
      };
      switch (value) {
        case "5min":
          this.curveInter = 5;
          obj.startTime = getMin(-5, this.stime);
          obj.endTime = getMin(5, this.stime);
          this.getCurveData(obj);
          break;
        case "10min":
          this.curveInter = 10;
          obj.startTime = getMin(-10, this.stime);
          obj.endTime = getMin(10, this.stime);
          this.getCurveData(obj);
          break;
        case "1h":
          this.curveInter = 60;
          obj.startTime = getMin(-60, this.stime);
          obj.endTime = getMin(60, this.stime);
          this.getCurveData(obj);
          break;
        default:
          this.curveInter = 60 * 24;
          obj.startTime = getMin(-60 * 24, this.stime);
          obj.endTime = getMin(60 * 24, this.stime);
          this.getCurveData(obj);
          break;
      }
    }
  },
  methods: {
    changeCurveTime(value) {},
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
      if (!this.time.length) {
        return this.$message.error("请选择查询时间");
      }
      this.getList(this.page, this.query);
    },
    clickRow(row, event, column) {
      let { GN, stime } = row;
      let obj = {
        pg: GN,
        startTime: getMin(-this.curveInter, stime),
        endTime: getMin(this.curveInter, stime)
      };
      this.GN = GN;
      this.stime = stime;
      this.getCurveData(obj);
    },
    // 导出excel
    clickExcel() {
      ept_excel(this.query);
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
      delete this.query.dvc;
      delete this.query.sys;
      if (data == "all") {
        this.query = _.omit(this.query, "area");
      } else {
        this.query.area = data.area;
      }
    },
    // 电厂选择
    selectPlant(data) {
      delete this.query.unit;
      delete this.query.dvc;
      delete this.query.sys;
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        this.query.plant = data.deptCode;
      }
    },
    // 机组选择
    selectUnit(data) {
      delete this.query.dvc;
      delete this.query.sys;
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
          this.query = _.omit(this.query, "dvc");
          break;
        case "tlsys_code":
          this.query.dvc = "S";
          break;
        case "txsys_code":
          this.query.dvc = "N";
          break;
        default:
          this.query.dvc = "D";
          break;
      }
    },
    // 系统选择
    selectSystem(data) {
      if (data == "all") {
        this.query = _.omit(this.query, "sys");
      } else {
        this.query.sys = data.type;
      }
    },
    // 选择传感器类型
    changeSensor(value) {
      if (value == "all") {
        this.query = _.omit(this.query, "dtype");
      } else {
        this.query.dtype = value;
      }
    },
    // 选择报警级别
    changeAlarm(value) {
      if (value == "all") {
        this.query = _.omit(this.query, "lv");
      } else {
        this.query.lv = value;
      }
    },
    // 查询电厂列表
    getList(page, params = this.query) {
      this.tableLoading = true;
      getList(
        Object.assign(
          {
            pn: page.currentPage,
            ps: page.pageSize
          },
          params
        )
      ).then(response => {
        let {
          data,
          data: { code, data: res }
        } = response;
        res == undefined ? (res = []) : null;
        this.listData = res.items || [];
        this.page.total = res.totalNum || 0;
        this.page.currentPage = res.pn;
        this.tableLoading = false;
        if (this.listData.length && !count) {
          let [{ GN, stime }] = this.listData;
          let obj = {
            pg: GN,
            startTime: getMin(-5, stime),
            endTime: getMin(5, stime)
          };
          this.GN = GN;
          this.stime = stime;
          this.getCurveData(obj);
        }
      });
    },
    // 查询曲线
    getCurveData(obj) {
      getCurveData(obj)
        .then(res => {
          return res.data.data;
        })
        .then(res => {
          let obj = {
            xData: [],
            seriesData: []
          };
          let [{ data, gn }] = res;
          data.map(item => {
            obj.xData.push(item.TM);
            obj.seriesData.push(item.AV.toFixed(2));
          });
          this.curveOption = lineConfig({ ...obj, text: gn });
        });
    },
    // 点击单选
    onRadio(index, row) {
      let { GN, stime } = row;
      let obj = {
        pg: GN,
        startTime: getMin(-this.curveInter, stime),
        endTime: getMin(this.curveInter, stime)
      };
      this.GN = GN;
      this.stime = stime;
      this.getCurveData(obj);
    }
  }
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
      text-align: right;
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
      vertical-align: bottom;
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
      top: 34px;
      left: 10px;
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

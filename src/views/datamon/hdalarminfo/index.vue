<template>
  <div class="execution">
    <ul class="clearfix card">
      <!-- 实时报警 -->
      <li class="fl">
        <Mycard mycardStyle="background:#1184F9" :showSegmentation="false">
          <div slot="header" class="card__header">
            <my-icon :icon="require('../../../../public/images/ssbj.png')" class="icon"></my-icon>
            <span>实时报警</span>
          </div>
          <div slot="content" class="height100 card__content">
            <el-table
              :data="tableData"
              style="width: 100%;border-radius:6px;"
              :cell-style="ssbjCellStyle"
              :header-cell-style="ssbjHeader"
            >
              <el-table-column prop="alarmLelve" label="区域" min-width="65" align="center"></el-table-column>
              <el-table-column prop="东北区域" label="东北" align="center"></el-table-column>
              <el-table-column prop="河南区域" label="河南" align="center"></el-table-column>
              <el-table-column prop="内蒙公司" label="内蒙" align="center"></el-table-column>
              <el-table-column prop="西南区域" label="西南" align="center"></el-table-column>
              <el-table-column prop="西北区域" label="西北" align="center"></el-table-column>
              <el-table-column prop="江西区域" label="江西" align="center"></el-table-column>
            </el-table>
          </div>
        </Mycard>
      </li>

      <!-- 报警提示 -->
      <li class="fl">
        <Mycard mycardStyle="background:#FF6565" :showSegmentation="false">
          <div slot="header" class="card__header">
            <my-icon :icon="require('../../../../public/images/lsbj.png')" class="icon"></my-icon>
            <span>报警提示</span>
          </div>
          <div slot="content" class="height100 card__content">
            <div class="autoScoll">
              <AutoScoll :data="alarmTipInfo" />
            </div>
            <div class="tip__content">
              <el-table
                :data="tableTipsData"
                style="width: 100%;border-radius:6px;"
                :cell-style="tipsCellStyle"
                :header-cell-style="tipsHeader"
                size="mini"
                border
              >
                <el-table-column prop="sys" label="紧急"  align="left"></el-table-column>
                <el-table-column prop="pname" label="报警电厂" align="left"></el-table-column>
              </el-table>
            </div>
          </div>
        </Mycard>
      </li>
    </ul>

    <!-- 实时报警列表 -->
    <div class="list">
      <Card cardStyles="height:100%">
        <div class="list__wrap">
          <el-row :gutter="10">
            <el-col :span="16">
              <SelOrg
                @selectArear="selectArear"
                @selectPlant="selectPlant"
                @selectUnit="selectUnit"
                :showSystem="false"
                @selectDevice="selectDevice"
                ref="myorg"
              />
            </el-col>
            <el-col :span="4" >
              <BtnList btnStyle="textAlign:center" @check="checkList" @reset="setReset" />
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="20">
              <div class="selectOrg clearfix">
                <div class="item">
                  <div class="grid-content bg-purple">
                    <div>报警点类型：</div>
                    <div>
                      <el-select
                        size="small"
                        @change="changeSensor"
                        v-model="sensor"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item,idx) in sensorOption"
                          :key="idx"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="grid-content bg-purple">
                    <div>报警级别：</div>
                    <div>
                      <el-select
                        @change="changeAlarm"
                        size="small"
                        v-model="alarmLevel"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item,idx) in alarmLevelOption"
                          :key="idx"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>
            </el-col> 
          </el-row>
          <div class="list__content">
            <avue-crud
              ref="crud"
              :data="listData"
              :table-loading="tableLoading"
              :option="tableOption"
              @refresh-change="refreshChange"
            ></avue-crud>
          </div>
        </div>
      </Card>
    </div>
    <Foot />
  </div>
</template>

<script>
import {
  fetchAlarmCount,
  fetchalarmTipInfo,
  fetchAlarmLevle,
  fetchAlarmTableData,
} from "@/api/datamon/hdalarminfo";
import { tableOption } from "@/const/crud/datamon/hdalarminfo";
import { mapGetters } from "vuex";
import Foot from "@/components/footer/index";
import Mycard from "@/components/mycard/mycard";
import AutoScoll from "./autoScoll";
import Card from "@/components/card/index";
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import { isAirObj } from "@/util/util";
import {
  ssbjCellStyle,
  ssbjHeader,
  tipsHeader,
  tipsCellStyle,
} from "./config.js";
import _ from "lodash";
export default {
  name: "hdalarminfo",
  data() {
    return {
      tableData: [],
      alarmTipInfo: [],
      tableTipsData: [],
      sensor: "",
      alarmLevel: "",
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
      alarmOption: [],
      alarmLevelOption: [],
      listData: [],
      tableLoading: false,
      tableOption: tableOption,
      reset: false,
      // fetchAlarmTableDataQuery:{
      //   area:"",
      //   dtype:"",
      //   dvc:"",
      //   lv:"",
      //   plant:"",
      //   sys:"",
      //   unit:"",
      // },
      fetchAlarmTableDataQuery: {},
    };
  },
  components: {
    Foot,
    Mycard,
    AutoScoll,
    Card,
    SelOrg,
    BtnList,
  },
  computed: {},
  watch: {},
  methods: {
    ssbjCellStyle({ row, column, rowIndex, columnIndex }) {
      return ssbjCellStyle({ row, column, rowIndex, columnIndex });
    },
    ssbjHeader({ row, column, rowIndex, columnIndex }) {
      return ssbjHeader({ row, column, rowIndex, columnIndex });
    },
    tipsHeader({ row, column, rowIndex, columnIndex }) {
      return tipsHeader({ row, column, rowIndex, columnIndex });
    },
    tipsCellStyle({ row, column, rowIndex, columnIndex }) {
      return tipsCellStyle({ row, column, rowIndex, columnIndex });
    },
    // 实时报警 list data数据接口
    fetchAlarmCount(params) {
      fetchAlarmCount(params)
        .then((response) => {
          let {
            data,
            data: { code, data: res },
          } = response;
          return res;
        })
        .then((res) => {
          let [arr, i] = [[], 0];
          for (i; i < 2; i++) {
            let obj = {};
            _.forOwn(res, (value, key) => {
              i == 0 ? (obj.alarmLelve = "紧急") : (obj.alarmLelve = "重要");
              obj[key] = value[i + 1];
            });
            arr.push(obj);
          }
          this.tableData = arr;
        });
    },
    // 报警提示
    fetchalarmTipInfo() {
      fetchalarmTipInfo().then((response) => {
        let {
          data,
          data: { code, data: res },
        } = response;
        let { plantLvCnt, plantSys } = res;
        let arr = [];
        // 处理报警滚动
        if (isAirObj(plantLvCnt) == true) {
          arr = [
            {
              name: "报警提示",
              content: "当前没有报警提示信息",
            },  
          ];
        } else {
          _.forOwn(plantLvCnt, (item, key) => {
            let obj = {};
            obj.name = key;
            let content = "";
            _.forOwn(item, (value, idx) => {
              content += idx == 1 ? "紧急：" : "重要：";
              content += value + "个，";
            });
            obj.content = content.replace(/，$/gi, "");
            arr.push(obj);
          });
        }
        this.alarmTipInfo = arr;
        _.forOwn(plantSys, (item, key) => { 
          item.sys = this.switchData(item.sys);
        }); 
        // 处理报警列表
        this.tableTipsData = plantSys.slice(0, 5);
      });
    },
    switchData(data) {
      let item = "";
      switch (data) {
        case "S":
          item = "脱硫";
          break;
        case "N":
          item = "脱硝";
          break;
        default:
          item = "";
      }
      return item;
    },
    // 获取传感器类型
    fetchAlarmLevle() {
      fetchAlarmLevle().then((response) => {
        let {
          data,
          data: { code, data: res },
        } = response;
        res = res.map((item) => {
          return {
            label: item.configName,
            value: item.alarmLevel,
          };
        });
        res.unshift({
          label: "全部",
          value: "all",
        });
        this.alarmLevelOption = res;
      });
    },
    // 查询实时报警table 数据
    fetchAlarmTableData(query) {
      this.tableLoading = true;
      fetchAlarmTableData(query).then((response) => {
        let {
          data,
          data: { code, data: res },
        } = response;
        this.listData = res; 
        this.tableLoading = false;
      }).catch(err=>{
        this.tableLoading = false;
      })
    },
    // 重置
    setReset() {
      this.$refs.myorg.reset1();
      this.sensor = "";
      this.alarmLevel = "";
      this.fetchAlarmTableDataQuery = {};
    },
    // 点击查询
    checkList() {
      this.fetchAlarmTableData(this.fetchAlarmTableDataQuery);
    },
    selectArear(data) {
      delete this.fetchAlarmTableDataQuery.plant;
      delete this.fetchAlarmTableDataQuery.unit;
      delete this.fetchAlarmTableDataQuery.dvc;
      delete this.fetchAlarmTableDataQuery.sys;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "area"
        );
      } else {
        this.fetchAlarmTableDataQuery.area = data.deptCode;
      }
      clearInterval(this.timer);
    },
    selectPlant(data) {
      delete this.fetchAlarmTableDataQuery.unit;
      delete this.fetchAlarmTableDataQuery.dvc;
      delete this.fetchAlarmTableDataQuery.sys;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "plant"
        );
      } else {
        this.fetchAlarmTableDataQuery.plant = data.deptCode;
      }
      clearInterval(this.timer);
    },
    selectUnit(data) {
      delete this.fetchAlarmTableDataQuery.dvc;
      delete this.fetchAlarmTableDataQuery.sys;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "unit"
        );
      } else {
        this.fetchAlarmTableDataQuery.unit = data.deviceCode;
      }
      clearInterval(this.timer);
    },
    selectDevice(data) {
      delete this.fetchAlarmTableDataQuery.sys;
      switch (data) {
        case "all":
          this.fetchAlarmTableDataQuery = _.omit(
            this.fetchAlarmTableDataQuery,
            "dvc"
          );
          break;
        case "tlsys_code":
          this.fetchAlarmTableDataQuery.dvc = "S";
          break;
        case "txsys_code":
          this.fetchAlarmTableDataQuery.dvc = "N";
          break;
        default:
          this.fetchAlarmTableDataQuery.dvc = "D";
          break;
      }
      clearInterval(this.timer);
    },
    selectSystem(data) {
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "sys"
        );
      } else {
        this.fetchAlarmTableDataQuery.sys = data.type;
      }
      clearInterval(this.timer);
    },
    changeAlarm(value) {
      if (value == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "lv"
        );
      } else {
        this.fetchAlarmTableDataQuery.lv = value;
      }
      clearInterval(this.timer);
    },
    changeSensor(value) {
      if (value == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "dtype"
        );
      } else {
        this.fetchAlarmTableDataQuery.dtype = value;
      }
      clearInterval(this.timer);
    },
    // 刷新
    refreshChange() {
      this.tableLoading = true;
      this.fetchAlarmTableData({
        ...this.fetchAlarmTableDataQuery,
        timestr: new Date(),
      });
    },
  },
  mounted() {
    this.fetchAlarmCount();
    this.fetchalarmTipInfo();
    this.fetchAlarmLevle();
    this.fetchAlarmTableData();
    this.timer = setInterval(() => {
      this.fetchAlarmCount();
      this.fetchalarmTipInfo();
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped>
.execution {
  padding: 0 10px;
}
.card {
  height: 244px;
  margin-bottom: 16px;
  & > li {
    height: 100%;
    width: calc(calc(100% - 16px) / 2);
    .card__header {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      .icon {
        margin-right: 3px;
        position: relative;
        top: 2px;
      }
    }
  }
  & > li:nth-child(1) {
    margin-right: 16px;
  }
  & > li:nth-child(2) {
    .tip__content {
      height: calc(100% - 30px);
    }
  }
  .autoScoll {
    margin-top: -13px;
    margin-bottom: 13px;
  }
}
.list {
  .list__wrap {
    padding: 16px 32px;
    .selectOrg {
      height: 42px;
      margin-left: -10px;

      .item {
        width: 20%;
        float: left;
        padding-left: 0;
        height: 100%;
        & > .btn__div {
          text-align: right;
        }
        & > div {
          height: 42px;
          line-height: 42px;
          display: table;
          width: 100%;

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
    }
    .list__content {
      margin-top: 16px;
    }
  }
}
</style>
<style lang="scss">
.card {
  .el-table th,
  .el-table tr {
    background-color: #1184f9;
  }
  .tip__content {
    .el-table--mini td,
    .el-table--mini th {
      padding: 0;
    }
    .el-table--border,
    .el-table--group {
      border: 1px solid #f8d2d2;
    }
  }
  .el-col {
    margin-bottom: 0px;
  }
  .el-table__empty-block {
    min-height: 126px;
  }
  .el-table .cell {
    line-height: 25px;
  }
}
</style>

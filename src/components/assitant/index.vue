<template>
  <AssitantLayout class="dust">
    <!-- 选择栏 -->
    <AssitantOrg @onOk="onOk"></AssitantOrg>

    <!-- 参数数据 -->
    <AssitantParame :sonModelId="sonModelId" :data="data" style="margin-bottom:16px"></AssitantParame>

    <!-- 建议 -->
    <AssitantAdvice :data="spl" style="margin-bottom:16px">
      <span slot="header" class="header">建议</span>
    </AssitantAdvice>

    <!-- 烟气流量时刻曲线 -->
    <AssitantQurve :options="options">
      <div slot="header">
        <span class="header">{{qx_title}}</span>
        <el-button @click="open_vis" class="his-curve fr" type="primary" size="mini" plain>查看历史曲线</el-button>
        <el-dialog width="50%" :title="qx_title+'-历史曲线'" :visible.sync="his_curve_vis">
          <div style="display:flex;">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
              :clearable="false"
              :pickerOptions="pickerOptions"
              style="flex:2"
            ></el-date-picker>
            <div style="flex:1;padding-left:20px;margin-top:-5px;">
              <el-button @click="selectTime" type="primary" size="small">确定</el-button>
            </div>
          </div>
          <div class="his_curve_vis-wrap" style="width:100%; height:400px;">
            <v-chart autoresize :options="his_options" />
          </div>
        </el-dialog>
      </div>
    </AssitantQurve>
  </AssitantLayout>
</template>

<script>
/**
 * 烟气流量分析
 *
 *
 */
import AssitantParame from "@/components/assitantParame";
import AssitantAdvice from "@/components/assitantAdvice";
import AssitantQurve from "@/components/assitantQurve";
import AssitantOrg from "@/components/assitantOrg";
import { getInstanceId, getDustData } from "@/api/assitant/common";
import { getCurveData, getHistoryCurveData } from "@/api/assitant/common";
import { formatterCurveData, getOption } from "./util";
import { ass_soc_url } from "@/config/env";

import moment from "moment";
export default {
  props: {
    modelId: {
      type: Number,
      default: () => {
        return 1;
      }
    },
    qx_title: {
      type: String,
      default: () => {
        return "烟气流量时刻曲线";
      }
    }
  },
  data() {
    let _minTime = null;
    let _maxTime = null;
    return {
      sonModelId: "",
      his_curve_vis: false,
      data: [],
      spl: {},
      chartData: {},
      options: {},
      instanceId: "",
      his_options: {},
      time: [
        moment()
          .subtract(3, "hours")
          .format("YYYY-MM-DD  HH:mm:ss"),
        moment().format("YYYY-MM-DD  HH:mm:ss")
      ],
      pickerOptions: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            let timeRange = 2 * 24 * 60 * 60 * 1000; // 6天
            _minTime = time.minDate.getTime() - timeRange; // 最小时间
            _maxTime = time.minDate.getTime() + timeRange; // 最大时间
            if (_maxTime > Date.now()) {
              _maxTime = Date.now();
            }
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null;
          }
        },
        disabledDate(time) {
          // return time.getTime() > Date.now();
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      websock: null,
      path: "",
      initialLineData: "",
      his_instanceId: null
    };
  },
  components: { AssitantParame, AssitantAdvice, AssitantQurve, AssitantOrg },
  computed: {},
  created() {
    this.sonModelId = this.modelId;
  },
  mounted() {},
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  watch: {},
  methods: {
    // 选择时间区间
    selectTime() {
      let beginTime = moment(this.time[0]).format("YYYY-MM-DD  HH:mm:ss");
      let endTime = moment(this.time[1]).format("YYYY-MM-DD  HH:mm:ss");
      getHistoryCurveData(this.instanceId, beginTime, endTime).then(res => {
        let obj = formatterCurveData(res);
        this.his_options = getOption(obj);
      });
    },
    // 查看历史曲线
    open_vis() {
      if (!this.his_instanceId) {
        return this.$message.error("请先查询");
      }
      this.his_curve_vis = true;
      let beginTime = moment(Date.now())
        .subtract(2, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      let endTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      getHistoryCurveData(this.his_instanceId, beginTime, endTime).then(res => {
        let obj = formatterCurveData(res);
        this.his_options = getOption(obj);
      });
    },
    //点击查询按钮
    onOk(query, cnname) {
      getInstanceId({ ...query, modelId: this.modelId }).then(res => {
        this.instanceId = res.data.data;
        if (res.data.data) {
          this.his_instanceId = res.data.data;
        }
        getDustData({ instanceId: this.instanceId }).then(res => {
          let result = res.data.data;
          let idx = null;
          result.forEach((item, index) => {
            if (item.fieldCode == "sg") {
              idx = index;
            }
          });
          let spl = result.splice(idx, 1);
          this.data = result;
          this.spl = spl[0];
          let area_plant = cnname.area + " / " + cnname.plant;
          let unit = cnname.unit;
          this.$store.commit("SET_AREA_PLANT", area_plant);
          this.$store.commit("SET_UNIT", unit);
        });
        getCurveData(this.instanceId).then(res => {
          // 将返回结果保存，以便websocket进行修改
          this.initialLineData = res;
          let obj = formatterCurveData(this.initialLineData);
          this.options = getOption(obj);
        });
        let now = Date.now();
        this.path = `/websocket/1/${this.modelId}/${this.instanceId}/${now}`;
        //若当前有websocket，则先关闭websocket再重新初始化
        if (this.websock) {
          this.websock.close();
        }
        this.initWebSocket(this.path);
      });
    },
    //初始化weosocket
    initWebSocket(path) {
      const wsuri = ass_soc_url + path;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    //连接建立之后执行send方法发送数据
    websocketonopen() {
      // let actions = { test: "12345" };
      // this.websocketsend();
    },
    //连接建立失败重连
    websocketonerror() {
      this.initWebSocket(this.path);
    },
    //数据接收
    websocketonmessage(e) {
      let redata = JSON.parse(e.data);
      // 处理曲线数据
      let curveData = redata.curveData;
      let length = curveData.length;
      this.initialLineData = this.initialLineData.map(item => {
        for (var i = 0; i < length; i++) {
          if (curveData[i].cnName == item.cnName) {
            item.dataList.shift();
            item.dataList.push(curveData[i].dataList[0]);
          } else {
            continue;
          }
        }
        return item;
      });
      let obj = formatterCurveData(this.initialLineData);
      this.options = getOption(obj);
      //处理参数数据
      let info = redata.currentInfo;
      let idx = null;
      info.forEach((item, index) => {
        if (item.fieldCode == "sg") {
          idx = index;
        }
      });
      let spl = info.splice(idx, 1);
      this.data = info;
      this.spl = spl[0];
    },
    //数据发送
    websocketsend(Data) {
      // this.websock.send(Data);
    },
    //关闭连接
    websocketclose(e) {
      // console.log("断开连接", e);
    }
  }
};
</script>

<style scoped lang="scss">
.dust {
  .his-curve {
    position: relative;
    top: 10px;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

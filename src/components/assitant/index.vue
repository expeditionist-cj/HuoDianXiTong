<template>
  <AssitantLayout class="dust">
    <!-- 选择栏 -->
    <AssitantOrg @onOk="onOk"></AssitantOrg>
    <!-- 参数数据 -->
    <AssitantParame :data="data" style="margin-bottom:16px">
      <span slot="header" class="header">参数数据</span>
    </AssitantParame>

    <!-- 建议 -->
    <AssitantAdvice :data="spl" style="margin-bottom:16px">
      <span slot="header" class="header">建议</span>
    </AssitantAdvice>

    <!-- 烟气流量时刻曲线 -->
    <AssitantQurve :options="options">
      <div slot="header">
        <span class="header">烟气流量时刻曲线</span>
        <el-button @click="open_vis" class="his-curve fr" type="primary" size="mini" plain>查看历史曲线</el-button>
        <el-dialog width="50%" title="供浆智能优化-历史曲线" :visible.sync="his_curve_vis">
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
import moment from "moment";
export default {
  props: {
    modelId: {
      type: Number,
      default: () => {
        return 1;
      }
    }
  },
  data() {
    return {
      his_curve_vis: false,
      data: [],
      spl: {},
      chartData: {},
      options: {},
      instanceId: "",
      his_options: {},
      time: [
        moment()
          .subtract(2, "hours")
          .format("YYYY-MM-DD  HH:mm:ss"),
        moment().format("YYYY-MM-DD  HH:mm:ss")
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  components: { AssitantParame, AssitantAdvice, AssitantQurve, AssitantOrg },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    selectTime() {
      let beginTime = moment(this.time[0]).format("YYYY-MM-DD  HH:mm:ss");
      let endTime = moment(this.time[1]).format("YYYY-MM-DD  HH:mm:ss");
      getHistoryCurveData(this.instanceId, beginTime, endTime).then(res => {
        let obj = formatterCurveData(res);
        this.his_options = getOption(obj);
      });
    },
    open_vis() {
      this.his_curve_vis = true;
      let beginTime = moment(Date.now())
        .subtract(2, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      let endTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      getHistoryCurveData(this.instanceId, beginTime, endTime).then(res => {
        let obj = formatterCurveData(res);
        this.his_options = getOption(obj);
      });
    },
    onOk(query, cnname) {
      getInstanceId({ ...query, modelId: this.modelId }).then(res => {
        this.instanceId = res.data.data;
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
        });
        getCurveData(this.instanceId).then(res => {
          let obj = formatterCurveData(res);
          this.options = getOption(obj);
        });
      });
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

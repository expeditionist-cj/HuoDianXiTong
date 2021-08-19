<template>
  <div>
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div-box-flex">
        <!-- 装置数量 -->
        <deviceNumber :deviceNumbers="deviceNumbers" :title="'装置数量'" />
        <!-- 装置容量 -->
        <deviceNumber :deviceNumbers="deviceCapacity" :title="'装置容量'" />
      </div>
      <div class="div-box-flex">
        <!-- 超排累计 -->
        <overLimit :title="'超排累计'" :list="listCp" />
        <!-- 超限累计 -->
        <overLimit :title="'超限累计'" :list="listCx" />
      </div>
      <!-- 柱状图 -->
      <div class="div_content">
        <div class="div__tool-wrap">
          <div style="margin-left: 20px; display: flex; align-items: center">
            <div style="min-width: 90px">选择项目：</div>
            <el-select
              v-model="selectValue"
              size="small"
              multiple
              collapse-tags
              placeholder="请选择"
              @visible-change="getPowerAnalysis"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="select__wrap">
            <div>选择时间：</div>
            <div>
              <el-date-picker
                v-model="month"
                align="right"
                type="month"
                placeholder="选择日期"
                size="small"
                :clearable="false"
                :editable="false"
                :picker-options="pickerOptions"
                @change="changeMonth"
              ></el-date-picker>
            </div>
          </div>
          <el-radio-group v-model="radio">
            <el-radio label="power">发电量</el-radio>
            <el-radio label="qualify">合格投运率</el-radio>
            <el-radio label="pollutant">污染物排放</el-radio>
            <el-radio label="consumption">能耗物耗</el-radio>
          </el-radio-group>
        </div>
        <div>
          <component :tableData="tableData" :is="radio"></component>
        </div>
      </div>
    </Card>
  </div>
</template> 
<script>
import power from "./power/index.vue";
import pollutant from "./pollutant/index.vue";
import qualify from "./qualify/index.vue";
import consumption from "./consumption/index.vue";
import cascade from "@/components/selectOrg/index11.vue";
import deviceNumber from "./deviceNumber/index";
import overLimit from "./overLimit/index";
import {
  getDeviceBaseData,
  getAllPlant,
  getCapacityBaseData,
} from "@/api/analysis/deviceData.js";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  components: {
    deviceNumber,
    overLimit,
    power,
    pollutant,
    qualify,
    consumption,
    cascade,
  },
  data() {
    return {
      radio: "power",
      selectValue: "",
      month: moment().format("YYYY-MM"),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      options: [],
      deviceNumbers: [],
      deviceCapacity: [],
      listCp: {},
      listCx: {},
      tableData: [],
    };
  },
  created() {
    this.getDeviceData();
    this.getPlantOptions();
  },
  watch: {},
  methods: {
    // 切换项目
    getPowerAnalysis(value) {
      if (!value) {
        let selectValue = this.selectValue;
        selectValue = selectValue.map((item) => {
          return "'" + item + "'";
        });
        let orgcodes = selectValue.join(","); 
        this.$store.commit("SET_ANALYSISPROJECT", orgcodes);
      }
    },
    // 改变时间
    changeMonth() {
      this.$store.commit("SET_ANALYSISIDATE", this.month);
    },
    // 装置数量和容量
    getDeviceData() {
      getDeviceBaseData().then((res) => {
        let data = res.data.data;
        let arry1 = [];
        let arry2 = [];
        let dict = {
          ts: "脱硫",
          tx: "脱硝",
          dust: "除尘",
        };
        data.forEach((ele) => {
          arry1.push({
            times: ele.count,
            deviceName: dict[ele.type] + "装置数量",
            unitName: "个",
          });
          arry2.push({
            times: ele.sumCa,
            deviceName: dict[ele.type] + "装置",
            unitName: "万kwh",
          });
        });
        this.deviceNumbers = arry1;
        this.deviceCapacity = arry2;
      });
      // 超限、超排累计
      getCapacityBaseData().then((res) => {
        let data = res.data.data;
        let dict = {
          cp_n_num: "脱硝",
          cp_s_num: "脱硫",
          cx_n_num: "脱硝",
          cx_s_num: "脱硫",
        };
        let obj1 = {};
        let obj2 = {};
        Object.keys(data).map((key) => {
          let ele = data[key];
          obj1[key] = [];
          obj2[key] = [];
          Object.keys(ele).map((k) => {
            if (k.indexOf("cp") == 0) {
              obj1[key].push({
                times: ele[k],
                deviceName: dict[k],
                unitName: "次",
              });
            } else {
              obj2[key].push({
                times: ele[k],
                deviceName: dict[k],
                unitName: "次",
              });
            }
          });
        });
        this.listCp = obj1;
        this.listCx = obj2;
      });
    },
    // 查询所有项目
    getPlantOptions() {
      getAllPlant().then((res) => {
        let data = res.data.data;
        let arry = [];
        let defaultChecked = [];
        data.forEach((ele) => {
          arry.push({
            value: ele.dept_code,
            label: ele.name,
          });
          defaultChecked.push(ele.dept_code);
        });
        this.selectValue = defaultChecked;
        this.getPowerAnalysis(false);
        this.options = arry;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.div-box-flex {
  display: flex;
}
.div_content {
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  margin: 20px 20px;
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
      margin: 0 20px;
      // width: 100%;
      & > div:nth-child(1) {
        display: table-cell;
        width: 0.1%;
        min-width: 90px;
        // height: 72px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.84);
        line-height: 12px;
      }
      & > div:nth-child(2) {
        display: table-cell;
      }
    }
  }
}
</style>
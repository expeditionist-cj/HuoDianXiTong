<template>
  <div class="power">
    <div class="power-btns">
      <el-button type="primary" size="mini" @click="onTb">同比</el-button>
      <el-button type="primary" size="mini" @click="onHb">环比</el-button>
      <el-button type="primary" size="mini" @click="onWcl">完成率</el-button>
    </div>
    <div class="power-diagram">
      <diagramComponent :diagramOption="powerOption" />
    </div>
    <el-table class="qualify-table" :data="tableData">
      <el-table-column
        prop="ts.name"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column label="脱硫" align="center">
        <el-table-column
          prop="ts.baseMonthData"
          label="本月(万kWh)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="ts.lastYearData"
            label="同期(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ts.lastYearFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="ts.lastMonthData"
            label="上月(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ts.lastMonthFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <el-table-column
            prop="ts.planPower"
            label="计划(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ts.planPowerFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="脱硝" align="center">
        <el-table-column
          prop="tx.baseMonthData"
          label="本月(万kWh)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="tx.lastYearData"
            label="同期(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="tx.lastYearFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="tx.lastMonthData"
            label="上月(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="tx.lastMonthFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <el-table-column
            prop="tx.planPower"
            label="计划(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="tx.planPowerFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import diagramComponent from "../diagramComponent/diagramComponent.vue";
import {
  getPowerOption,
  transferPowerData,
} from "@/const/crud/analysis/power.js";
import { getPowerData } from "@/api/analysis/deviceData.js";
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      powerOption: {},
      tableData: [],
      compareMethod: "lastYearData",
      compareName: "同期",
      titleName: "同比",
    };
  },
  computed: {
    ...mapState({
      analysisDate: (state) => state.analysis.analysisDate,
      analysisProject: (state) => state.analysis.analysisProject,
    }),
  },
  mounted() {
    if (!this.analysisProject) {
      return;
    } else {
      this.init();
    }
  },
  watch: {
    analysisDate(value) {
      this.init();
    },
    analysisProject(value) {
      this.init();
    },
  },
  methods: {
    // 发电量
    init() {
      if (this.analysisProject.length == 0) {
        return this.$message.error("请至少选择一个项目！");
      } else {
        getPowerData({
          orgcodes: this.analysisProject,
          year: moment(this.analysisDate).format("YYYY"),
          month: moment(this.analysisDate).format("MM"),
        }).then((res) => {
          let data = res.data.data;
          let arr = JSON.parse(JSON.stringify(data));
          arr.forEach((ele) => {
            Object.keys(ele).map((keys) => {
              Object.keys(ele[keys]).map((k) => {
                if (
                  k == "lastMonthFloat" ||
                  k == "planPowerFloat" ||
                  k == "lastYearFloat"
                ) {
                  if (ele[keys][k] != null && ele[keys][k] != 0) {
                    ele[keys][k] =
                      ele[keys][k] > 0
                        ? "↑ " + (ele[keys][k] * 100).toFixed(2)
                        : "↓ " +
                          (ele[keys][k].toString().slice(1) * 100).toFixed(2);
                  }
                }
              });
            });
          });
          this.tableData = arr;
          let obj = transferPowerData(
            data,
            this.compareMethod,
            this.compareName
          );
          this.powerOption = getPowerOption(obj, this.titleName);
        });
      }
    },
    onTb() {
      this.compareMethod = "lastYearData";
      this.titleName = "同比";
      this.compareName = "同期";
      this.init();
    },
    onHb() {
      this.compareMethod = "lastMonthData";
      this.titleName = "环比";
      this.compareName = "上月";
      this.init();
    },
    onWcl() {
      this.compareMethod = "planPower";
      this.titleName = "完成率";
      this.compareName = "计划";
      this.init();
    },
  },
  components: {
    diagramComponent,
  },
};
</script>
<style lang="scss" scoped>
.power {
  width: 100%;
  .power-btns {
    margin: 0 20px;
    text-align: right;
  }
  .power-diagram {
    width: 100%;
  }
  .power-table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
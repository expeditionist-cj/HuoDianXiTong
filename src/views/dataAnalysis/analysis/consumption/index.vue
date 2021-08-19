<template>
  <div class="consumption">
    <div class="consumption-btns">
      <el-button type="primary" size="mini" @click="onTb">同比</el-button>
      <el-button type="primary" size="mini" @click="onHb">环比</el-button>
      <el-button type="primary" size="mini" @click="onWcl"
        >计划完成率</el-button
      >
      <el-button type="primary" size="mini" @click="onHyl">耗用率</el-button>
    </div>
    <div class="consumption-diagram">
      <diagramComponent :diagramOption="xsjConsumOption" />
      <diagramComponent :diagramOption="hyjConsumOption" />
      <diagramComponent :diagramOption="dhConsumOption" />
    </div>
    <el-table class="qualify-table" :data="tableData">
      <el-table-column
        prop="deptName"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column label="吸收剂" align="center">
        <el-table-column
          prop="baseXsData"
          label="本月(t)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="lastYearXsData"
            label="同期(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastYearXsFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="lastMonthXsData"
            label="上月(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastMonthXsFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <el-table-column
            prop="xsjPlan"
            label="计划(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="xsjPlanFloat"
            label="完成率(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="耗用率" align="center">
          <el-table-column
            prop="genPowerXsBore"
            label="发电量口径(%)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="outSo2MntXsBore"
            label="减排量口径(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="还原剂" align="center">
        <el-table-column
          prop="baseHyjData"
          label="本月(t)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="lastYearHyjData"
            label="同期(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastYearHyjFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="lastMonthData"
            label="上月(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastMonthHyjFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <el-table-column
            prop="hyjPlan"
            label="计划(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="hyjPlanFloat"
            label="完成率(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="耗用率" align="center">
          <el-table-column
            prop="genPowerHyjBore"
            label="发电量口径(%)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="outNoxMntHyjBore"
            label="减排量口径(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="能耗" align="center">
        <el-table-column
          prop="baseDh"
          label="本月(万kWh)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="lastYearDh"
            label="同期(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastYearDhFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="lastMonthDh"
            label="上月(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastMonthDhFloat"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <el-table-column
            prop="planDh"
            label="计划(万kWh)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="planDhFloat"
            label="完成率(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="耗用率" align="center">
          <el-table-column
            prop="genPowerDhBore"
            label="发电量口径(万kWh)"
            min-width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="outMntDhBore"
            label="减排量口径(万kWh)"
            min-width="100"
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
  transferConsumData,
  getConsumOption,
} from "@/const/crud/analysis/consumption.js";
import { getConsumData } from "@/api/analysis/deviceData.js";
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      xsjConsumOption: {},
      hyjConsumOption: {},
      dhConsumOption: {},
      tableData: [],
      compareMethod: "tb",
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
  components: {
    diagramComponent,
  },
  methods: {
    init() {
      if (this.analysisProject.length == 0) {
        return this.$message.error("请至少选择一个项目！");
      } else {
        getConsumData({
          orgcodes: this.analysisProject,
          year: moment(this.analysisDate).format("YYYY"),
          month: moment(this.analysisDate).format("MM"),
        }).then((res) => {
          let data = res.data.data;
          let arr = JSON.parse(JSON.stringify(data));
          arr.forEach((ele) => {
            Object.keys(ele).map((k) => {
              if (k.indexOf("Float") > -1 && ele[k] != null && ele[k] != 0) {
                ele[k] =
                  ele[k] > 0
                    ? "↑ " + (ele[k] * 100).toFixed(2)
                    : "↓ " + (ele[k].toString().slice(1) * 100).toFixed(2);
              }
            });
          });
          this.tableData = arr;
          let obj = transferConsumData(data, this.compareMethod);
          this.xsjConsumOption = getConsumOption(
            obj,
            "xsjSeries",
            "吸收剂",
            this.titleName
          );
          this.hyjConsumOption = getConsumOption(
            obj,
            "hyjSeries",
            "还原剂",
            this.titleName
          );
          this.dhConsumOption = getConsumOption(
            obj,
            "dhSeries",
            "耗电量",
            this.titleName
          );
        });
      }
    },
    onTb() {
      this.compareMethod = "tb";
      this.titleName = "同比";
      this.init();
    },
    onHb() {
      this.compareMethod = "hb";
      this.titleName = "环比";
      this.init();
    },
    onWcl() {
      this.compareMethod = "wcl";
      this.titleName = "计划完成率";
      this.init();
    },
    onHyl() {
      this.compareMethod = "hyl";
      this.titleName = "耗用率";
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.consumption {
  width: 100%;
  .consumption-btns {
    margin: 0 20px;
    text-align: right;
  }
  .consumption-diagram {
    width: 100%;
  }
  .consumption-table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
<template>
  <div class="pollutant">
    <div class="pollutant-btns">
      <el-button type="primary" size="mini" @click="onTb">同比</el-button>
      <el-button type="primary" size="mini" @click="onHb">环比</el-button>
      <!-- <el-button type="primary" size="mini" @click="onWcl">完成率</el-button> -->
    </div>
    <div class="pollutant-diagram">
      <diagramComponent :diagramOption="pollutantOption" />
    </div>
    <el-table class="qualify-table" :data="tableData">
      <el-table-column
        prop="dept_name"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column label="脱硫" align="center">
        <el-table-column
          prop="outSo2Mnt"
          label="本月(t)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="yoy_outSo2Mnt"
            label="同期(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="yoy_so2_change"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="mom_outSo2Mnt"
            label="上月(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mom_so2_change"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="脱硝" align="center">
        <el-table-column
          prop="outNoxMnt"
          label="本月(t)"
          align="center"
        ></el-table-column>
        <el-table-column label="同比" align="center">
          <el-table-column
            prop="yoy_outNoxMnt"
            label="同期(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="yoy_nox_change"
            label="浮动(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="环比" align="center">
          <el-table-column
            prop="mom_outNoxMnt"
            label="上月(t)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mom_nox_change"
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
  transferPollutantData,
  getPollutantOption,
} from "@/const/crud/analysis/pollutant.js";
import { getPollutantData } from "@/api/analysis/deviceData.js";
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      pollutantOption: {},
      tableData: [],
      compareMethod: "yoy",
      compareName: "同期",
      titleName: "同比",
    };
  },
  components: {
    diagramComponent,
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
      let project = this.analysisProject.replace(/\'/g, "");
      let plants = project.split(",");
      if (plants.length == 0) {
        return this.$message.error("请至少选择一个项目！");
      } else {
        getPollutantData({
          plants: plants,
          year: moment(this.analysisDate).format("YYYY"),
          month: moment(this.analysisDate).format("MM"),
        }).then((res) => {
          let data = res.data.data;
          let arr = JSON.parse(JSON.stringify(data));
          arr.forEach((ele) => {
            Object.keys(ele).map((k) => {
              if (k.indexOf("change") > -1 && ele[k] != null && ele[k] != 0) {
                ele[k] =
                  ele[k] > 0
                    ? "↑ " + ele[k]
                    : "↓ " + ele[k].toString().slice(1);
              }
            });
          });
          this.tableData = arr;
          let obj = transferPollutantData(data, this.compareMethod);
          this.pollutantOption = getPollutantOption(obj, this.titleName);
        });
      }
    },
    onTb() {
      this.compareMethod = "yoy";
      this.titleName = "同比";
      this.init();
    },
    onHb() {
      this.compareMethod = "mom";
      this.titleName = "环比";
      this.init();
    },
    onWcl() {
      // this.compareMethod = "planPower";
      // this.compareName = "计划";
      // this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.pollutant {
  width: 100%;
  .pollutant-btns {
    text-align: right;
    margin: 0 20px;
  }
  .pollutant-diagram {
    width: 100%;
  }
  .pollutant-table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
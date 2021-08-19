<template>
  <div class="qualify">
    <div class="qualify-btns">
      <el-button type="primary" size="mini" @click="onTl">脱硫</el-button>
      <el-button type="primary" size="mini" @click="onTx">脱硝</el-button>
    </div>
    <div class="qualify-diagram">
      <diagramComponent :diagramOption="qualifyOption" />
    </div>
    <el-table class="qualify-table" :data="tableData">
      <el-table-column
        prop="project_name"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column label="脱硫" align="center">
        <el-table-column
          prop="run_time"
          label="机组运行时长(h)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="s_run_time"
          label="脱硫合格投运时长(h)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="s_run_time_rate"
          label="合格投运率(%)"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="脱硝" align="center">
        <el-table-column
          prop="run_time"
          label="机组运行时长(h)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="n_run_time"
          label="脱硝合格投运时长(h)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="n_run_time_rate"
          label="合格投运率(%)"
          align="center"
        ></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import diagramComponent from "../diagramComponent/diagramComponent.vue";
import {
  transferQualifyData,
  getQualifyOption,
} from "@/const/crud/analysis/qualify.js";
import { getQualifyData } from "@/api/analysis/deviceData.js";
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      qualifyOption: {},
      tableData: [],
      compareMethod: "s_run_time",
      titleName: "脱硫",
    };
  },
  computed: {
    ...mapState({
      analysisDate: (state) => state.analysis.analysisDate,
      analysisProject: (state) => state.analysis.analysisProject,
    }),
  },
  watch: {
    analysisDate(value) {
      this.init();
    },
    analysisProject(value) {
      this.init();
    },
  },
  mounted() {
    if (!this.analysisProject) {
      return;
    } else {
      this.init();
    }
  },
  components: {
    diagramComponent,
  },
  methods: {
    // 合格投运率
    init() {
      let project = this.analysisProject.replace(/\'/g, "");
      let plants = project.split(",");
      if (plants.length == 0) {
        return this.$message.error("请至少选择一个项目！");
      } else {
        getQualifyData({
          plants: plants,
          year: moment(this.analysisDate).format("YYYY"),
          month: moment(this.analysisDate).format("MM"),
        }).then((res) => {
          let data = res.data.data;
          this.tableData = data;
          let obj = transferQualifyData(data, this.compareMethod);
          this.qualifyOption = getQualifyOption(obj, this.titleName);
        });
      }
    },
    onTl() {
      this.compareMethod = "s_run_time";
      this.titleName = "脱硫";
      this.init();
    },
    onTx() {
      this.compareMethod = "n_run_time";
      this.titleName = "脱硝";
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.qualify {
  width: 100%;
  .qualify-btns {
    margin: 0 20px;
    text-align: right;
  }
  .qualify-diagram {
    width: 100%;
  }
  .qualify-table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
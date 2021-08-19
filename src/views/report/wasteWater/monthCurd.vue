<template>
  <div>
    <!-- 月表 -->
    <el-table
      :data="monthTableData"
      style="width: 100%;min-height:550px;"
      size="small"
      :height="height"
    >
      <el-table-column label="项目" align="center" min-width="100" fixed>
        <template slot-scope="scope">
          <el-button
            @click="getDayDetial(scope.row)"
            type="text"
            size="small"
            :disabled="isBtnDisable(scope.row.projectName)"
          >{{scope.row.projectName}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="系统进水量" align="center" min-width="100">
        <el-table-column label="(t)" align="center" min-width="100" prop="inFlow"></el-table-column>
      </el-table-column>
      <el-table-column label="系统处理量" align="center" min-width="100">
        <el-table-column label="(t)" align="center" min-width="100" prop="handleFlow"></el-table-column>
      </el-table-column>
      <el-table-column label="投运时间" align="center" min-width="100">
        <el-table-column label="(h)" align="center" min-width="100" prop="runTime"></el-table-column>
      </el-table-column>
      <!-- <el-table-column label="停运时间" align="center" min-width="100">
        <el-table-column label="(h)" align="center" min-width="100" prop="stopTime"></el-table-column>
      </el-table-column> -->
      <el-table-column label="氢氧化钙" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="caoh"></el-table-column>
        <!-- <el-table-column label="单耗(kg/t)" align="center" min-width="100" prop="caRate"></el-table-column> -->
      </el-table-column>
      <el-table-column label="絮凝剂" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="xlj"></el-table-column>
      </el-table-column>
      <el-table-column label="助凝剂" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="znj"></el-table-column>
      </el-table-column>
      <el-table-column label="有机硫" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="yjl"></el-table-column>
      </el-table-column>
      <el-table-column label="次氯酸钠" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="clsn"></el-table-column>
      </el-table-column>
      <el-table-column label="高效絮凝" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100" prop="gxXlj"></el-table-column>
        <!-- <el-table-column label="单耗(kg/t)" align="center" min-width="100" prop="gxXljRate"></el-table-column> -->
      </el-table-column>
      <el-table-column label="废水排放检测数据" align="center" min-width="100">
        <el-table-column label="浊度(NTU)" align="center" min-width="100" prop="ntu"></el-table-column>
        <el-table-column label="COD(mg/L)" align="center" min-width="100" prop="fs_cod"></el-table-column>
        <el-table-column label="pH" align="center" min-width="100" prop="ph"></el-table-column>
        <el-table-column label="硫化物(mg/L)" align="center" min-width="100" prop="fs_xs"></el-table-column>
        <el-table-column label="氟化物(mg/L)" align="center" min-width="100" prop="fs_xf"></el-table-column>
        <el-table-column label="总砷(mg/L)" align="center" min-width="100" prop="fs_as"></el-table-column>
        <el-table-column label="总铅(mg/L)" align="center" min-width="100" prop="fs_pb"></el-table-column>
        <el-table-column label="总汞(mg/L)" align="center" min-width="100" prop="fs_hg"></el-table-column>
        <el-table-column label="总镉(mg/L)" align="center" min-width="100" prop="fs_cd"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 400
    },
    monthTableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    getDayDetial(row) {
      this.$emit("getDayDetial", row);
    },
    isBtnDisable(projectName) {
      if (projectName == "合计或平均") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

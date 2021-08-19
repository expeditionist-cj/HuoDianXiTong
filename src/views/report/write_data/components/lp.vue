<template>
  <div class="lp">
    <el-table :data="lpTableData" border style="width: 100%">
      <el-table-column prop="m" label="月份" align="center" width="180">
      </el-table-column>
      <el-table-column label="存在的主要问题" align="center">
        <template slot-scope="scope">
          <div class="toLeft">
            {{
              scope.row.questiones
                ? scope.row.questiones.length > 50
                  ? scope.row.questiones.substring(0, 50) + "······"
                  : scope.row.questiones
                : scope.row.questiones
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="制定的整改措施" align="center">
        <template slot-scope="scope">
          <div class="toLeft">
            {{
              scope.row.measures
                ? scope.row.measures.length > 50
                  ? scope.row.measures.substring(0, 50) + "······"
                  : scope.row.measures
                : scope.row.measures
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="具体措施落实情况" align="center">
        <template slot-scope="scope">
          <div class="toLeft">
            {{
              scope.row.dealStatus
                ? scope.row.dealStatus.length > 50
                  ? scope.row.dealStatus.substring(0, 50) + "······"
                  : scope.row.dealStatus
                : scope.row.dealStatus
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.m <= now"
            @click="onEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="60%">
      <h3>存在的主要问题</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="rowData.questiones"
      >
      </el-input>
      <h3>制定的整改措施</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="rowData.measures"
      >
      </el-input>
      <h3>具体措施落实情况</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="rowData.dealStatus"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    lpTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      now: moment().month() + 1,
      dialogVisible: false,
      rowData: {
        questiones: "",
        measures: "",
        dealStatus: "",
      },
    };
  },
  mounted() {},
  methods: {
    // 编辑
    onEdit(data) {
      this.dialogVisible = true;
      this.rowData = JSON.parse(JSON.stringify(data));
    },
    // 保存
    saveLp() {
      this.dialogVisible = false;
      this.$emit("saveLp", this.rowData);
    },
  },
};
</script>
<style lang="scss" scoped>
.lp {
  h3 {
    padding: 10px 0;
  }
  .toLeft {
    text-align: left;
  }
}
</style>
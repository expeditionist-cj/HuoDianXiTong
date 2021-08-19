<template>
  <div>
    <!-- 月详情表 -->
    <el-table
      :data="DayTableData"
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
    >
      <el-table-column label="项目" align="center" min-width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="系统进水量" align="center" min-width="100">
        <el-table-column label="(t)" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.inFlow"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.inFlow || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="系统处理量" align="center" min-width="100">
        <el-table-column
          label="(t)"
          align="center"
          min-width="100"
          prop="handleFlow"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.handleFlow"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.handleFlow || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="投运时间" align="center" min-width="100">
        <el-table-column label="(h)" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.runTime"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.runTime || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column label="停运时间" align="center" min-width="100">
        <el-table-column label="(h)" align="center" min-width="100" prop="stopTime"></el-table-column>
      </el-table-column> -->
      <el-table-column label="氢氧化钙" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.caoh"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.caoh || "--" }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="单耗(kg/t)" align="center" min-width="100" prop="caRate"></el-table-column> -->
      </el-table-column>
      <el-table-column label="絮凝剂" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.xlj"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.xlj || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="助凝剂" align="center" min-width="100">
        <el-table-column label="用量(kg)" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.znj"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.znj || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="有机硫" align="center" min-width="100">
        <el-table-column
          label="用量(kg)"
          align="center"
          min-width="100"
          prop="yjl"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.yjl"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.yjl || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="次氯酸钠" align="center" min-width="100">
        <el-table-column
          label="用量(kg)"
          align="center"
          min-width="100"
          prop="clsn"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.clsn"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.clsn || "--" }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="高效絮凝" align="center" min-width="100">
        <el-table-column
          label="用量(kg)"
          align="center"
          min-width="100"
          prop="gxXlj"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.projectName == '调整项'">
              <el-input
                onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                maxlength="13"
                v-model="scope.row.gxXlj"
                size="small"
                :disabled="
                  !(
                    roles[0] == 1 ||
                    roles[0] == 5 ||
                    roles[0] == 6 ||
                    roles[0] == 8
                  )
                "
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.gxXlj || "--" }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="单耗(kg/t)" align="center" min-width="100" prop="xljRate"></el-table-column> -->
      </el-table-column>
      <!-- <el-table-column label="废水排放检测数据" align="center" min-width="100">
        <el-table-column label="浊度(NTU)" align="center" min-width="100" prop="ntu"></el-table-column>
        <el-table-column label="pH" align="center" min-width="100" prop="ph"></el-table-column>
      </el-table-column> -->
      <!-- 操作栏 -->
      <el-table-column
        v-if="roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8"
        fixed="right"
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.projectName == '调整项'">
            <el-button @click="doSave(scope.row)" type="text" size="small"
              >保存</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 400,
    },
    DayTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  methods: {
    doSave(row) {
      let data = JSON.parse(JSON.stringify(row));
      Object.keys(data).map((k) => {
        if (data[k] === "") {
          data[k] = null;
        }
      });
      delete data.projectName;
      this.$emit("doSave", data);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

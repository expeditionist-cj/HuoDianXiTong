<template>
  <div class="zcrud">
    <el-table
      :summary-method="getSummaries"
      :data="tableData"
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
      show-summary
    >
      <el-table-column
        align="center"
        label="日期"
        prop="dy"
        width="140"
        fixed=""
      >
      </el-table-column>

      <!-- 原烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#' + item + 'FGD原烟气'"
        align="center"
      >
        <el-table-column align="center" label="SO₂">
          <el-table-column
            align="center"
            label="实测浓度(mg/Nm³)"
            :prop="item + '_' + DE_GAS_ORIGIN['mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_ORIGIN['mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row[item + "_" + DE_GAS_ORIGIN["mg/Nm³"]["prop"]] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="折算浓度(mg/Nm³)"
            :prop="item + '_' + DE_GAS_ORIGIN['折算mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['折算mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_ORIGIN['折算mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <div v-else>
                {{
                  scope.row[item + "_" + DE_GAS_ORIGIN["折算mg/Nm³"]["prop"]]
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="产生量(t/d)"
            :prop="item + '_' + DE_GAS_ORIGIN['t/d']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['t/d']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + DE_GAS_ORIGIN['t/d']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <!-- <div v-else-if="scope.row.dy == '调整'">
                {{
                  (scope.row[item + "_" + DE_GAS_ORIGIN["t/d"]["prop"]] =
                    ((parseFloat(
                      scope.row[
                        item + "_" + DE_GAS_ORIGIN["折算mg/Nm³"]["prop"]
                      ]
                    ) +
                      parseFloat(
                        scope.row[
                          item +
                            "_" +
                            DE_GAS_ORIGIN["折算mg/Nm³"]["prop"] +
                            "_bf"
                        ]
                      )) *
                      (parseFloat(
                        scope.row[item + "_" + DE_GAS_OVER["标态流量"]["prop"]]
                      ) +
                        parseFloat(
                          scope.row[
                            item + "_" + DE_GAS_OVER["标态流量"]["prop"] + "_bf"
                          ]
                        ))) /
                      100000 -
                    scope.row[
                      item + "_" + DE_GAS_ORIGIN["折算mg/Nm³"]["prop"] + "_bf"
                    ] *
                      scope.row[
                        item + "_" + DE_GAS_OVER["标态流量"]["prop"] + "_bf"
                      ] /100000).toFixed(2)
                }}
              </div> -->
              <div v-else>
                {{ scope.row[item + "_" + DE_GAS_ORIGIN["t/d"]["prop"]] }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + DE_GAS_ORIGIN['标态流量']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['标态流量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_ORIGIN['标态流量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_ORIGIN["标态流量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + DE_GAS_ORIGIN['氧量']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['氧量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_ORIGIN['氧量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_ORIGIN["氧量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + DE_GAS_ORIGIN['烟温']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_ORIGIN['烟温']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_ORIGIN['烟温']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_ORIGIN["烟温"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 净烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#' + item + 'FGD净烟气'"
        align="center"
      >
        <el-table-column align="center" label="SO₂">
          <el-table-column
            align="center"
            label="实测浓度(mg/Nm³)"
            :prop="item + '_' + DE_GAS_OVER['mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_OVER['mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["mg/Nm³"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="折算浓度(mg/Nm³)"
            :prop="item + '_' + DE_GAS_OVER['折算mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['折算mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_OVER['折算mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["折算mg/Nm³"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="排放量(t/d)"
            :prop="item + '_' + DE_GAS_OVER['t/d']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['t/d']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + DE_GAS_OVER['t/d']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <!-- <div v-else-if="scope.row.dy == '调整'">
                {{
                  (scope.row[item + "_" + DE_GAS_OVER["t/d"]["prop"]] =
                    ((parseFloat(
                      scope.row[item + "_" + DE_GAS_OVER["折算mg/Nm³"]["prop"]]
                    ) +
                      parseFloat(
                        scope.row[
                          item + "_" + DE_GAS_OVER["折算mg/Nm³"]["prop"] + "_bf"
                        ]
                      )) *
                      (parseFloat(
                        scope.row[item + "_" + DE_GAS_OVER["标态流量"]["prop"]]
                      ) +
                        parseFloat(
                          scope.row[
                            item + "_" + DE_GAS_OVER["标态流量"]["prop"] + "_bf"
                          ]
                        ))) /
                      100000 -
                    scope.row[
                      item + "_" + DE_GAS_OVER["折算mg/Nm³"]["prop"] + "_bf"
                    ] *
                      scope.row[
                        item + "_" + DE_GAS_OVER["标态流量"]["prop"] + "_bf"
                      ]/100000).toFixed(2)
                }}
              </div> -->
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["t/d"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + DE_GAS_OVER['标态流量']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['标态流量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_OVER['标态流量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["标态流量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + DE_GAS_OVER['氧量']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['氧量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + DE_GAS_OVER['氧量']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["氧量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + DE_GAS_OVER['烟温']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['烟温']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + DE_GAS_OVER['烟温']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["烟温"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="脱硫效率">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + DE_GAS_OVER['脱硫效率']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + DE_GAS_OVER['脱硫效率']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.dy == '调整'">
                --
                <!-- <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                   onblur="value = value.replace(/\.0*$|[^\d]*$/,'')" maxlength="13"
                  v-model="
                    scope.row[item + '_' + DE_GAS_OVER['脱硫效率']['prop']]
                  "
                  size="small"
                ></el-input> -->
              </div>
              <span v-else>
                {{ scope.row[item + "_" + DE_GAS_OVER["脱硫效率"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 操作栏 -->
      <el-table-column
        v-if="roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8"
        fixed="right"
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.dy == '调整'">
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
import { DE_GAS_ORIGIN, DE_GAS_OVER } from "../../../dict/index";
import { mapGetters } from "vuex";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => {
        return ["1", "2"];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sums: {
      type: Object,
      default: () => {
        return {};
      },
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      DE_GAS_ORIGIN,
      DE_GAS_OVER,
    };
  },
  components: {},
  computed: {
    ...mapGetters(["roles"]),
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    doSave(row) {
      let data = JSON.parse(JSON.stringify(row));
      delete data.dy;
      this.$emit("doSave", data);
    },
    getSummaries(param) {
      const sum = [];
      const { columns, data } = param;
      columns.forEach((item, index) => {
        if (index === 0) {
          sum[index] = "污染物产生/排放量(t)";
          return;
        }
        if (/in_so2_cv/.test(item.property)) {
          let char = item.property.charAt(0);
          sum[index] = `#${char}FGDSO2产生量(t)`;
        } else if (/out_so2_cv/.test(item.property)) {
          let char = item.property.charAt(0);
          sum[index] = `#${char}FGDSO2排放量(t)`;
        } else if (/in_so2_mnt/.test(item.property)) {
          let char = item.property.charAt(0);
          sum[index] = this.sums[`${char}_in_so2_mnt`];
        } else if (/out_so2_mnt/.test(item.property)) {
          let char = item.property.charAt(0);
          sum[index] = this.sums[`${char}_out_so2_mnt`];
        } else {
          sum[index] = "";
        }
      });
      return sum;
    },
  },
};
</script>

<style scoped lang="scss">
.zcrud {
  width: 100%;
}
</style>

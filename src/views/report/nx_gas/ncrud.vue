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
        prop="day"
        width="140"
        fixed
      ></el-table-column>

      <!-- 原烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#' + item.charAt(0) + 'SCR' + item.charAt(2) + '侧原烟气'"
        align="center"
      >
        <el-table-column align="center" label="NOx">
          <el-table-column
            align="center"
            label="实测浓度(mg/Nm³)"
            :prop="item + '_' + NX_GAS_ORIGIN['mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_ORIGIN['mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row[item + "_" + NX_GAS_ORIGIN["mg/Nm³"]["prop"]] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="折算浓度(mg/Nm³)"
            :prop="item + '_' + NX_GAS_ORIGIN['折算mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['折算mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_ORIGIN['折算mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{
                  scope.row[item + "_" + NX_GAS_ORIGIN["折算mg/Nm³"]["prop"]]
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="产生量(t/d)"
            :prop="item + '_' + NX_GAS_ORIGIN['t/d']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['t/d']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + NX_GAS_ORIGIN['t/d']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <!-- <div v-else-if="scope.row.day == '调整'">
                {{
                  (scope.row[item + "_" + NX_GAS_ORIGIN["t/d"]["prop"]] =
                    (parseFloat(
                      scope.row[
                        item + "_" + NX_GAS_ORIGIN["折算mg/Nm³"]["prop"]
                      ]
                    ) *
                      parseFloat(
                        scope.row[item + "_" + NX_GAS_OVER["标态流量"]["prop"]]
                      )) /
                    100000).toFixed(2)
                }}
              </div> -->
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_ORIGIN["t/d"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + NX_GAS_ORIGIN['标态流量']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['标态流量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_ORIGIN['标态流量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_ORIGIN["标态流量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_ORIGIN['氧量']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['氧量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_ORIGIN['氧量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_ORIGIN["氧量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + NX_GAS_ORIGIN['烟温']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_ORIGIN['烟温']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_ORIGIN['烟温']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_ORIGIN["烟温"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 净烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#' + item.charAt(0) + 'SCR' + item.charAt(2) + '侧净烟气'"
        align="center"
      >
        <el-table-column align="center" label="NOx">
          <el-table-column
            align="center"
            label="实测浓度(mg/Nm³)"
            :prop="item + '_' + NX_GAS_OVER['mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_OVER['mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["mg/Nm³"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="折算浓度(mg/Nm³)"
            :prop="item + '_' + NX_GAS_OVER['折算mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['mg/Nm³']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['折算mg/Nm³']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_OVER['折算mg/Nm³']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["折算mg/Nm³"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="排放量(t/d)"
            :prop="item + '_' + NX_GAS_OVER['t/d']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['t/d']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + NX_GAS_OVER['t/d']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <!-- <div v-else-if="scope.row.day == '调整'">
                {{
                  (scope.row[item + "_" + NX_GAS_OVER["t/d"]["prop"]] =
                    (parseFloat(
                      scope.row[item + "_" + NX_GAS_OVER["折算mg/Nm³"]["prop"]]
                    ) *
                      parseFloat(
                        scope.row[item + "_" + NX_GAS_OVER["标态流量"]["prop"]]
                      )) /
                    100000).toFixed(2)
                }}
              </div> -->
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["t/d"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + NX_GAS_OVER['标态流量']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['标态流量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_OVER['标态流量']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["标态流量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_OVER['氧量']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['氧量']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + NX_GAS_OVER['氧量']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["氧量"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + NX_GAS_OVER['烟温']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['烟温']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + NX_GAS_OVER['烟温']['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["烟温"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氨逃逸">
          <el-table-column
            align="center"
            label="PPm"
            :prop="item + '_' + NX_GAS_OVER['氨逃逸']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['氨逃逸']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_OVER['氨逃逸']['prop']]
                  "
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["氨逃逸"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="脱硝效率">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_OVER['脱硝效率']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row[item + '_' + NX_GAS_OVER['脱硝效率']['prop']] ==
                  undefined
                "
              >
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                --
                <!-- <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                   onblur="value = value.replace(/\.0*$|[^\d]*$/,'')" maxlength="13"
                  v-model="
                    scope.row[item + '_' + NX_GAS_OVER['脱硝效率']['prop']]
                  "
                  size="small"
                ></el-input> -->
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NX_GAS_OVER["脱硝效率"]["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 总排口NOx浓度 -->
      <el-table-column align="center" label="总排口NOx浓度">
        <el-table-column
          align="center"
          v-for="item in list"
          :key="item"
          :label="'#' + item"
        >
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item + '_' + NOX['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          >
            <template slot-scope="scope">
              <span v-if="scope.row[item + '_' + NOX['prop']] == undefined">
                --
              </span>
              <div v-else-if="scope.row.day == '调整'">
                <el-input
                  onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                  onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                  maxlength="13"
                  v-model="scope.row[item + '_' + NOX['prop']]"
                  size="small"
                  :disabled="!(roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8)"
                ></el-input>
              </div>
              <span v-else>
                {{ scope.row[item + "_" + NOX["prop"]] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column v-if="roles[0] == 1 || roles[0] == 5 || roles[0] == 6 || roles[0] == 8" fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.day == '调整'">
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
import { NX_GAS_ORIGIN, NX_GAS_OVER, NOX } from "../../../dict/index";
import { mapGetters } from "vuex";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => {
        return ["1_A", "1_B", "2_A", "2_B"];
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
    list: {
      type: Array,
      default: () => {
        return [1, 2];
      },
    },
  },
  data() {
    return {
      NX_GAS_ORIGIN,
      NX_GAS_OVER,
      NOX,
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
      delete data.day;
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
        if (/inNoxCv/.test(item.property)) {
          let char = item.property.charAt(0);
          let side = item.property.charAt(2);
          sum[index] = `#${char}SCR${side}侧产生量(t)`;
        } else if (/outNoxCv/.test(item.property)) {
          let char = item.property.charAt(0);
          let side = item.property.charAt(2);
          sum[index] = `#${char}SCR${side}侧排放量(t)`;
        } else if (/inNoxMnt/.test(item.property)) {
          let char = item.property.substring(0, 3);
          sum[index] = this.sums[`${char}_inNoxMnt`];
        } else if (/outNoxMnt/.test(item.property)) {
          let char = item.property.substring(0, 3);
          sum[index] = this.sums[`${char}_outNoxMnt`];
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

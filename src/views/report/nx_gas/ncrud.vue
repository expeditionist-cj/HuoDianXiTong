<template>
  <div class="zcrud">
    <el-table
      :summary-method="getSummaries"
      :data="tableData"
      style="width: 100%"
      size="small"
      :height="height"
      show-summary
    >
      <el-table-column align="center" label="日期" prop="day" width="140" fixed></el-table-column>

      <!-- 原烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#'+item.charAt(0) + 'SCR' + item.charAt(item.length - 1) + '侧'  + '原烟气'"
        align="center"
      >
        <el-table-column align="center" label="NOx">
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item + '_' + NX_GAS_ORIGIN['mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['mg/Nm³']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="折算mg/Nm³"
            :prop="item + '_' + NX_GAS_ORIGIN['折算mg/Nm³']['prop']"
            :minWidth="NX_GAS_ORIGIN['折算mg/Nm³']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="t/d"
            :prop="item + '_' + NX_GAS_ORIGIN['t/d']['prop']"
            :minWidth="NX_GAS_ORIGIN['t/d']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + NX_GAS_ORIGIN['标态流量']['prop']"
            :minWidth="NX_GAS_ORIGIN['标态流量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_ORIGIN['氧量']['prop']"
            :minWidth="NX_GAS_ORIGIN['氧量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + NX_GAS_ORIGIN['烟温']['prop']"
            :minWidth="NX_GAS_ORIGIN['烟温']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 净烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#'+item.charAt(0) + 'SCR' + item.charAt(item.length - 1) + '侧'  + '净烟气'"
        align="center"
      >
        <el-table-column align="center" label="NOx">
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item + '_' + NX_GAS_OVER['mg/Nm³']['prop']"
            :minWidth="NX_GAS_OVER['mg/Nm³']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="折算mg/Nm³"
            :prop="item + '_' + NX_GAS_OVER['折算mg/Nm³']['prop']"
            :minWidth="NX_GAS_OVER['折算mg/Nm³']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="t/d"
            :prop="item + '_' + NX_GAS_OVER['t/d']['prop']"
            :minWidth="NX_GAS_OVER['t/d']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + NX_GAS_OVER['标态流量']['prop']"
            :minWidth="NX_GAS_OVER['标态流量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_OVER['氧量']['prop']"
            :minWidth="NX_GAS_OVER['氧量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + NX_GAS_OVER['烟温']['prop']"
            :minWidth="NX_GAS_OVER['烟温']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氨逃逸">
          <el-table-column
            align="center"
            label="PPm"
            :prop="item + '_' + NX_GAS_OVER['氨逃逸']['prop']"
            :minWidth="NX_GAS_OVER['氨逃逸']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="脱硝效率">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + NX_GAS_OVER['脱硝效率']['prop']"
            :minWidth="NX_GAS_OVER['脱硝效率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 总排口NOx浓度 -->
      <el-table-column align="center" label="总排口NOx浓度">
        <el-table-column align="center" v-for="item in list" :key="item" :label="'#'+item">
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item+'_'+NOX['prop']"
            :minWidth="NOX['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { NX_GAS_ORIGIN, NX_GAS_OVER, NOX } from "../../../dict/index";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => {
        return ["1_A", "1_B", "2_A", "2_B"];
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    sums: {
      type: Object,
      default: () => {
        return {};
      }
    },
    height: {
      type: Number,
      default: 400
    },
    list: {
      type: Array,
      default: () => {
        return [1, 2];
      }
    }
  },
  data() {
    return {
      NX_GAS_ORIGIN,
      NX_GAS_OVER,
      NOX
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
  },
  watch: {},
  methods: {
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
    }
  }
};
</script>

<style scoped lang="scss">
.zcrud {
  width: 100%;
}
</style>

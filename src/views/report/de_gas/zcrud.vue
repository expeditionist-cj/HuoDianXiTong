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
        :label="'#'+item + 'FGD原烟气'"
        align="center"
      >
        <el-table-column align="center" label="SO₂">
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item + '_' + DE_GAS_ORIGIN['mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['mg/Nm³']['width']"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="折算mg/Nm³"
            :prop="item + '_' + DE_GAS_ORIGIN['折算mg/Nm³']['prop']"
            :minWidth="DE_GAS_ORIGIN['折算mg/Nm³']['width']"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="t/d"
            :prop="item + '_' + DE_GAS_ORIGIN['t/d']['prop']"
            :minWidth="DE_GAS_ORIGIN['t/d']['width']"
          >
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + DE_GAS_ORIGIN['标态流量']['prop']"
            :minWidth="DE_GAS_ORIGIN['标态流量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + DE_GAS_ORIGIN['氧量']['prop']"
            :minWidth="DE_GAS_ORIGIN['氧量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + DE_GAS_ORIGIN['烟温']['prop']"
            :minWidth="DE_GAS_ORIGIN['烟温']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 净烟气 -->
      <el-table-column
        v-for="(item, index) in unitList"
        :key="index"
        :label="'#'+item + 'FGD净烟气'"
        align="center"
      >
        <el-table-column align="center" label="SO₂">
          <el-table-column
            align="center"
            label="mg/Nm³"
            :prop="item + '_' + DE_GAS_OVER['mg/Nm³']['prop']"
            :minWidth="DE_GAS_OVER['mg/Nm³']['width']"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="折算mg/Nm³"
            :prop="item + '_' + DE_GAS_OVER['折算mg/Nm³']['prop']"
            :minWidth="DE_GAS_OVER['折算mg/Nm³']['width']"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="t/d"
            :prop="item + '_' + DE_GAS_OVER['t/d']['prop']"
            :minWidth="DE_GAS_OVER['t/d']['width']"
          >
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="标态流量">
          <el-table-column
            align="center"
            label="10⁴m³/d"
            :prop="item + '_' + DE_GAS_OVER['标态流量']['prop']"
            :minWidth="DE_GAS_OVER['标态流量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="氧量">
          <el-table-column
            align="center"
            label="%"
            :prop="item + '_' + DE_GAS_OVER['氧量']['prop']"
            :minWidth="DE_GAS_OVER['氧量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="烟温">
          <el-table-column
            align="center"
            label="℃"
            :prop="item + '_' + DE_GAS_OVER['烟温']['prop']"
            :minWidth="DE_GAS_OVER['烟温']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="脱硫效率"
        >
        <el-table-column
            align="center"
            label="%"
          :prop="item + '_' + DE_GAS_OVER['脱硫效率']['prop']"
          :minWidth="DE_GAS_OVER['脱硫效率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DE_GAS_ORIGIN, DE_GAS_OVER } from "../../../dict/index";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => {
        return ["1", "2"];
      }
    },
    tableData:{
      type:Array,
      default:()=>{
        return []
      }
    },
    sums:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    height:{
      type:Number,
      default:400
    }
  },
  data() {
    return {
      DE_GAS_ORIGIN,
      DE_GAS_OVER,
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
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
          if (/in_so2_cv/.test(item.property)) {
            let char = item.property.charAt(0);
            sum[index] = `#${char}FGDSO2产生量(t)`;
          } else if(/out_so2_cv/.test(item.property)){
            let char = item.property.charAt(0);
            sum[index] = `#${char}FGDSO2排放量(t)`;
          }else if(/in_so2_mnt/.test(item.property)){
            let char = item.property.charAt(0);
            sum[index] = this.sums[`${char}_in_so2_mnt`] ;
          }else if(/out_so2_mnt/.test(item.property)){
            let char = item.property.charAt(0);
            sum[index] = this.sums[`${char}_out_so2_mnt`] ;
          }else{
            sum[index] = ""
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

<template>
  <div class="zcurd">
    <el-table
      :data="nx_xq_tableData"
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
    >
      <el-table-column
        label="时间"
        align="center"
        min-width="100"
        prop="month"
        fixed
      >
        <template slot-scope="scope">
          <div>{{ scope.row.month ? (scope.row.month) + "月份" : "合计或平均" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="装机" align="center" min-width="100" >
        <el-table-column
          label="MW"
          align="center"
          min-width="100"
          prop="capacity"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="主机发电量(万KWh)" align="center" min-width="100" >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].genPower'"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合计" align="center" min-width="90" >
        <el-table-column
          label="万KWh"
          align="center"
          min-width="90"
          prop="genPwrAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="供热量" align="center" min-width="100">
        <el-table-column
          label="万吉焦"
          align="center"
          min-width="100"
          prop="heat"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="折算发电量" align="center" min-width="100">
        <el-table-column
          label="万KWh"
          align="center"
          min-width="100"
          prop="heatCptPwr"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="加供热发电量" align="center" min-width="100" >
        <el-table-column
          label="万KWh"
          align="center"
          min-width="100"
          prop="totalPwr"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="负荷率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].ulRate'"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="ulOverRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="利用小时" align="center" min-width="100" >
        <el-table-column
          label="h"
          align="center"
          min-width="100"
          prop="useHour"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="主机上网电量(万KWh)"
        align="center"
        min-width="100" 
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].netPower'"
        ></el-table-column>
      </el-table-column>
      
      <el-table-column label="合计" align="center" width="90" >
        <el-table-column
          label="万KWh"
          align="center"
          width="90"
          prop="netPwrAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="机组运行时间（h）" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].runTime'"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="overRunTime"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="脱硝超排（超限）时间（h）"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].overEmsHour'"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合格投运率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].stdRunRate'"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="stdRunOverRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column
        label="入口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitListAB"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="
            'units[' +
            Math.floor(index / 2) +
            '].' +
            item.slice(1).toLowerCase() +
            'sInNox'
          "
        ></el-table-column>
      </el-table-column>

      <el-table-column
        label="出口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitListAB"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="
            'units[' +
            Math.floor(index / 2) +
            '].' +
            item.slice(1).toLowerCase() +
            'sOutNox'
          "
        ></el-table-column>
      </el-table-column>

      <el-table-column label="脱硝效率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitListAB"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="
            'units[' +
            Math.floor(index / 2) +
            '].' +
            item.slice(1).toLowerCase() +
            'rdcNoxRate'
          "
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="脱硫出口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].overNoxCv'"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="脱硫出口NOx效率(%)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].overNoxRate'"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="标态流量(×104m³/月)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].flowAmout'"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="在线产生NOx量(t)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].olInNoxAmout'"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="在线排放NOx量(t)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="'#' + item"
          align="center"
          min-width="100"
          :prop="'units[' + index + '].olOutNoxAmout'"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排总量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="noxRdcAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="计算减排量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="noxRdcCptAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="液氨进料量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="yaBuyAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="液氨库存量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="yaStoreAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="液氨使用量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="yaUseAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="液氨耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万KWH"
          align="center"
          min-width="100"
          prop="yaUseRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排液氨耗率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="yaRdcUseRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="尿素进料量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="nsBuyAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="尿素库存量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="nsStoreAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="尿素使用量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="nsUseAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="尿素耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="nsUseRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排尿素耗率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="nsRdcUseRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="还原剂合计使用量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="redUseAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="还原剂耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万kwh"
          align="center"
          min-width="100"
          prop="redUseRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排还原剂耗率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="redRdcUseRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="装置耗电量(万kWh)" align="center" min-width="100">
        <el-table-column
          label="装置"
          align="center"
          min-width="100"
          prop="deviceUsePwr"
        ></el-table-column>
        <el-table-column
          label="公用系统"
          align="center"
          min-width="100"
          prop="commonUsePwr"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="装置厂用电率" align="center" min-width="100">
        <el-table-column
          label="%"
          align="center"
          min-width="100"
          prop="devPlantUseRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="耗电率减排量单耗" align="center" min-width="100">
        <el-table-column
          label="万KWh/t"
          align="center"
          min-width="100"
          prop="rdcEmxPwrUse"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="分摊电量" align="center" min-width="100">
        <el-table-column
          label="万kwh"
          align="center"
          min-width="100"
          prop="shareUsePwr"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="总耗电量" align="center" min-width="100">
        <el-table-column
          label="万kwh"
          align="center"
          min-width="100"
          prop="usePwrAmt"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="总耗电率" align="center" min-width="100">
        <el-table-column
          label="%"
          align="center"
          min-width="100"
          prop="usePwrRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排总电耗" align="center" min-width="100">
        <el-table-column
          label="万KWh/t"
          align="center"
          min-width="100"
          prop="rdcUsePwrAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="耗水量（t)" align="center" min-width="100">
        <el-table-column
          label="工业水"
          align="center"
          min-width="100"
          prop="idsWater"
        ></el-table-column>
        <el-table-column
          label="除盐水"
          align="center"
          min-width="100"
          prop="desaltWater"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="工业水耗水率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="idsWaterRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排工业耗水率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="rdcIdsWaterRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="除盐水耗水率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="desaltWaterRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排除盐水耗水率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="rdcDesaltWaterRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="耗汽量（t)" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="steam"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="蒸汽耗率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="steamRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排蒸汽耗率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="rdcSteamRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="耗气量（t)" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="gas"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="蒸气耗率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="gasRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排蒸气耗率" align="center" min-width="100">
        <el-table-column label="t/t" align="center" min-width="100" prop="rdcGasRate"></el-table-column>
      </el-table-column>

      <!-- 操作栏 -->
      <!-- <el-table-column
        v-if="hdmonthreportmanualdata_update"
        fixed="right"
        align="center"
        min-width="100"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="!scope.row.month"></div>
          <div v-else>
            <el-button
              @click="onTXEdit(scope.row)"
              v-if="hdmonthreportmanualdata_update"
              type="text"
              size="small"
              >修改</el-button
            >
          </div>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { NX_SUMMARY } from "@/dict/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      NX_SUMMARY,
    };
  },
  props: {
    height: {
      type: Number,
      default: 400,
    },
    nx_xq_tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    unitList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    unitListAB: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.hdmonthreportmanualdata_update = this.permissions[
      "hdmonthreportmanualdata_update"
    ]; // 修改
  },

  mounted() {},
  methods: {
    onTXEdit(row) {
      this.$emit("onTXEdit", row);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
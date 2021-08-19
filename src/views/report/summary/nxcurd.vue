<template>
  <div class="zcurd">
    <el-table
      :data="nx_tableData"
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
    >
      <el-table-column label="项目" align="center" min-width="100" fixed>
        <template slot-scope="scope">
          <el-button
            v-if="isClickable"
            @click="getTXDetail(scope.row)"
            type="text"
            size="small"
            :disabled="isBtnDisable(scope.row.plantName, scope.row.areaName)"
            >{{ scope.row.plantName || scope.row.areaName }}</el-button
          >
          <span v-else>{{ scope.row.plantName || scope.row.areaName }}</span>
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
      <el-table-column
        label="主机发电量(万KWh)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].genPower"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].genPower"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合计" align="center" min-width="100" >
        <el-table-column
          label="万KWh"
          align="center"
          min-width="100"
          prop="genPwrAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="供热量" align="center" min-width="100">
        <el-table-column label="万吉焦" align="center" min-width="100" prop="heat"></el-table-column>
      </el-table-column>
      <el-table-column label="折算发电量" align="center" min-width="100">
        <el-table-column label="万KWh" align="center" min-width="100" prop="heatCptPwr"></el-table-column>
      </el-table-column>
      <el-table-column
        label="加供热发电量"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="万KWh"
          align="center"
          min-width="100"
          prop="totalPwr"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="" align="center" >
        <el-table-column
          label=""
          align="center"
          width="0"
          prop=""
        ></el-table-column>
      </el-table-column>
      <el-table-column label="负荷率(%)" align="center" min-width="100">
        <el-table-column label="#1" align="center" min-width="100" prop="units[0].ulRate"></el-table-column>
        <el-table-column label="#2" align="center" min-width="100" prop="units[1].ulRate"></el-table-column>
        <el-table-column label="合计" align="center" min-width="100" prop="ulOverRate"></el-table-column>
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
        min-width="95"
      >
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].netPower"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].netPower"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="合计" align="center" min-width="100" >
        <el-table-column
          label="万KWh"
          align="center"
          min-width="100"
          prop="netPwrAmt"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="机组运行时间（h）" align="center" min-width="100">
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].runTime"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].runTime"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="overRunTime"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="脱硝超排（超限）时间（h）" align="center" min-width="100">
        <el-table-column label="#1" align="center" min-width="100" prop="units[0].overEmsHour"></el-table-column>
        <el-table-column label="#2" align="center" min-width="100" prop="units[1].overEmsHour"></el-table-column>
      </el-table-column>
      <el-table-column label="合格投运率(%)" align="center" min-width="100">
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].stdRunRate"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].stdRunRate"
        ></el-table-column>
        <el-table-column label="合计" align="center" min-width="100" prop="stdRunOverRate"></el-table-column>
      </el-table-column>

      <el-table-column
        label="入口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1A"
          align="center"
          min-width="100"
          prop="units[0].asInNox"
        ></el-table-column>
        <el-table-column
          label="#1B"
          align="center"
          min-width="100"
          prop="units[0].bsInNox"
        ></el-table-column>
        <el-table-column
          label="#2A"
          align="center"
          min-width="100"
          prop="units[1].asInNox"
        ></el-table-column>
        <el-table-column
          label="#2B"
          align="center"
          min-width="100"
          prop="units[1].bsInNox"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="出口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1A"
          align="center"
          min-width="100"
          prop="units[0].asOutNox"
        ></el-table-column>
        <el-table-column
          label="#1B"
          align="center"
          min-width="100"
          prop="units[0].bsOutNox"
        ></el-table-column>
        <el-table-column
          label="#2A"
          align="center"
          min-width="100"
          prop="units[1].asOutNox"
        ></el-table-column>
        <el-table-column
          label="#2B"
          align="center"
          min-width="100"
          prop="units[1].bsOutNox"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="脱硝效率(%)" align="center" min-width="100">
        <el-table-column label="#1A" align="center" min-width="100" prop="units[0].ardcNoxRate"></el-table-column>
        <el-table-column label="#1B" align="center" min-width="100" prop="units[0].brdcNoxRate"></el-table-column>
        <el-table-column label="#2A" align="center" min-width="100" prop="units[1].ardcNoxRate"></el-table-column>
        <el-table-column label="#2B" align="center" min-width="100" prop="units[1].brdcNoxRate"></el-table-column>
      </el-table-column>
      <el-table-column
        label="脱硫出口NOx浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].overNoxCv"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].overNoxCv"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="脱硫出口NOx效率(%)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].overNoxRate"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].overNoxRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="标态流量(×104m³/月)"
        align="center"
        min-width="100"
      >
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].flowAmout"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].flowAmout"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="在线产生NOx量(t)" align="center" min-width="100">
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].olInNoxAmout"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].olInNoxAmout"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="在线排放NOx量(t)" align="center" min-width="100">
        <el-table-column
          label="#1"
          align="center"
          min-width="100"
          prop="units[0].olOutNoxAmout"
        ></el-table-column>
        <el-table-column
          label="#2"
          align="center"
          min-width="100"
          prop="units[1].olOutNoxAmout"
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
        <el-table-column label="t/t" align="center" min-width="100" prop="yaRdcUseRate"></el-table-column>
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
        <el-table-column label="t/t" align="center" min-width="100" prop="nsRdcUseRate"></el-table-column>
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
        <el-table-column label="t/t" align="center" min-width="100" prop="redRdcUseRate"></el-table-column>
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
      <el-table-column label="耗电率减排量单耗" align="center" min-width="120">
        <el-table-column label="万KWh/t" align="center"  min-width="120" prop="rdcEmxPwrUse"></el-table-column>
      </el-table-column>
      <el-table-column label="分摊电量" align="center" min-width="120">
        <el-table-column
          label="万kwh"
          align="center"
          min-width="120"
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
        <el-table-column label="万KWh/t" align="center" min-width="100" prop="rdcUsePwrAmt"></el-table-column>
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
        <el-table-column label="t/t" align="center" min-width="100" prop="rdcIdsWaterRate"></el-table-column>
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
        <el-table-column label="t/t" align="center" min-width="100" prop="rdcDesaltWaterRate"></el-table-column>
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
        <el-table-column label="t/t" align="center" min-width="100" prop="rdcSteamRate"></el-table-column>
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
      default: 400,
    },
    nx_tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isClickable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getTXDetail(row) {
      this.$emit("getTXDetail", row);
    },
    isBtnDisable(val1, val2) {
      if (
        val1 == "合计或平均" ||
        val2 == "东北区域" ||
        val2 == "河南区域" ||
        val2 == "江西区域" ||
        val2 == "西北区域" ||
        val2 == "内蒙公司" ||
        val2 == "西南区域"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
<template>
  <div class="zcurd">
    <el-table
      ref="decurd"
      :data="tl_tableData"
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
    >
      <el-table-column label="项目" align="center" width="100" fixed>
        <template slot-scope="scope">
          <el-button
            v-if="isClickable"
            @click="getTLDetail(scope.row)"
            type="text"
            size="small"
            :disabled="isBtnDisable(scope.row.val)"
            >{{ scope.row.val ? scope.row.val : "合计或平均" }}</el-button
          >
          <span v-else>{{ scope.row.val ? scope.row.val : "合计或平均" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="装机" align="center" width="100" >
        <el-table-column
          label="MW"
          align="center"
          width="100"
          prop="ca"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="主机发电量(万KWh)"
        align="center"
        width="100"
      >
        <el-table-column
          label="#1"
          align="center"
          width="100"
          prop="genPower#1"
        >
        </el-table-column>
        <el-table-column
          label="#2"
          align="center"
          width="100"
          prop="genPower#2"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="" align="center" >
        <el-table-column
          label=""
          align="center"
          width="0"
          prop=""
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合计" align="center" width="120" >
        <el-table-column
          label="万KWh"
          align="center"
          width="120"
          prop="sumGenPower"
        ></el-table-column>
      </el-table-column>

      
      <el-table-column label="加供热发电量" align="center" width="120" >
        <el-table-column
          label="万KWh"
          align="center"
          width="120"
          prop="grGenPower"
        ></el-table-column>
      </el-table-column>
      <!-- <el-table-column label="" align="center" >
        <el-table-column
          label=""
          align="center"
          width="0"
          prop=""
        ></el-table-column>
      </el-table-column> -->
      <el-table-column label="负荷率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item,index) of unitList"
          :key="index"
          :label="item"
          align="center" min-width="100"
          :prop="'fhl'+item"
        ></el-table-column>
        <el-table-column label="合计" align="center" min-width="100" prop="sumFhl"></el-table-column>
      </el-table-column>

      <el-table-column label="利用小时" align="center" width="100" >
        <el-table-column
          label="h"
          align="center"
          width="100"
          prop="useHour"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="主机上网电量(万KWh)"
        align="center"
        width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          width="100"
          :prop="'elePower' + item"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合计" align="center" width="120" >
        <el-table-column
          label="万KWh"
          align="center"
          width="120"
          prop="sumElePower"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="供热量" align="center" min-width="100">
        <el-table-column label="万吉焦" align="center" min-width="100" prop="heatCapacity"></el-table-column>
      </el-table-column>
      <el-table-column label="折算发电量" align="center" min-width="100">
        <el-table-column label="万KWh" align="center" min-width="100" prop="zsGenPower"></el-table-column>
      </el-table-column>
      <el-table-column label="机组运行时间（h）" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'runtime' + item"
        ></el-table-column>
        <el-table-column 
          label="合计"
          align="center"
          min-width="100"
          prop="runtimetotal"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="脱硫超排（超限）时间（h）" align="center" min-width="100">
        <el-table-column
          v-for="(item,index) of unitList"
          :key="index"
          :label="item"
          align="center" min-width="100"
          :prop="'overHour'+item"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合格投运率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'hgtyl' + item"
        ></el-table-column>
        <el-table-column label="合计" align="center" min-width="100" prop="sumHgtyl"></el-table-column>
      </el-table-column>

      <el-table-column
        label="入口SO2浓度(mg/Nm3)"
        align="center"
        min-width="120"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="120"
          :prop="'inSo2Cv' + item"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="出口SO2浓度(mg/Nm3)"
        align="center"
        min-width="100"
      >
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'outSo2Cv' + item"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="脱硫效率(%)" align="center" min-width="100">
        <el-table-column
          v-for="(item,index) of unitList"
          :key="index"
          :label="item"
          align="center" min-width="100"
          :prop="'so2xl'+item"
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
          :label="item"
          align="center"
          min-width="100"
          :prop="'outSmkMnt' + item"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="在线产生SO2量(t)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'inSo2Mnt' + item"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="在线排放SO2量(t)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'outSo2Mnt' + item"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排总量" align="center" min-width="120">
        <el-table-column
          label="t"
          align="center"
          min-width="120"
          prop="sumJp"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="计算减排量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="calJp"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="石灰石采购量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="carbideSlagProcure"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石库存量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="carbideSlagStock"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石使用量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumCarbideSlagConsum"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万KWH"
          align="center"
          min-width="100"
          prop="sumCarbideSlagConsumRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="石灰石粉采购量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="limestonePowderProcure"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石粉库存量" align="center" min-width="100">
        <el-table-column label="t" align="center" min-width="100" prop="limestonePowderStock"></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石粉使用量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumLimestonePowderConsum"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石灰石粉耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万KWH"
          align="center"
          min-width="100"
          prop="sumLimestonePowderConsumRate"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="吸收剂采购合计量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumProcure"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="吸收剂使用合计量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumConsum"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="合计耗用率" align="center" min-width="100">
        <el-table-column
          label="t/万KWH"
          align="center"
          min-width="100"
          prop="sumHyl"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排吸收剂耗率" align="center" min-width="100">
        <el-table-column label="t∕t" align="center" min-width="100" prop="hyJp"></el-table-column>
      </el-table-column>

      <el-table-column label="石膏销量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="gypsumSales"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="不合格石膏量" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="svGypsumSales"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="石膏销量与吸收剂用量折算比" align="center" min-width="100" prop="gypsumSaleZsb"> 
      </el-table-column>
      <el-table-column label="石膏产量与吸收剂用量折算比" align="center" min-width="100" prop="gypsumOutputZsb"> 
      </el-table-column>
      <el-table-column label="吸收剂纯度" align="center" min-width="100">
        <el-table-column
          label="%"
          align="center"
          min-width="100"
          prop="slagPurity"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="钙硫比" align="center" min-width="100" prop="calSulRatio"></el-table-column>

      <el-table-column label="装置耗电量(万kwh)" align="center" min-width="100">
        <el-table-column
          v-for="(item, index) of unitList"
          :key="index"
          :label="item"
          align="center"
          min-width="100"
          :prop="'power' + item"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="sumPower"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="装置厂用电率" align="center" min-width="100">
        <el-table-column
          label="%"
          align="center"
          min-width="100"
          prop="devicePowerRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排装置耗电率" align="center" min-width="100">
        <el-table-column
          label="万KWh/t"
          align="center"
          min-width="100"
          prop="hdJp"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="分摊电量" align="center" min-width="100">
        <el-table-column
          label="万kwh"
          align="center"
          min-width="100"
          prop="sharePower"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="总耗电量" align="center" min-width="100">
        <el-table-column
          label="万kwh"
          align="center"
          min-width="100"
          prop="sumHdl"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="总耗电率" align="center" min-width="100">
        <el-table-column
          label="%"
          align="center"
          min-width="100"
          prop="sumPowerRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排总耗电率" align="center" min-width="100">
        <el-table-column
          label="万KWh/t"
          align="center"
          min-width="100"
          prop="powerRateJp"
        ></el-table-column>
      </el-table-column>

      <el-table-column label="耗水量（t)" align="center" min-width="100">
        <el-table-column
          label="工业水"
          align="center"
          min-width="100"
          prop="sumIndustrialWater"
        ></el-table-column>
        <el-table-column
          label="工艺水"
          align="center"
          min-width="100"
          prop="sumProcessWater"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          min-width="100"
          prop="sumWater"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="耗水率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="waterRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排耗水率" align="center" min-width="100">
        <el-table-column
          label="t/t"
          align="center"
          min-width="100"
          prop="waterJp"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="耗汽量（t)" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumStreamConsumption"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="蒸汽耗率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="streamRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排蒸汽耗率" align="center" min-width="100">
        <el-table-column label="t/t" align="center" min-width="100" prop="streamJp"></el-table-column>
      </el-table-column>
      <el-table-column label="耗气量（t)" align="center" min-width="100">
        <el-table-column
          label="t"
          align="center"
          min-width="100"
          prop="sumAirConsumption"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="蒸气耗率" align="center" min-width="100">
        <el-table-column
          label="t/万KWh"
          align="center"
          min-width="100"
          prop="airRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="减排蒸气耗率" align="center" min-width="100">
        <el-table-column label="t/t" align="center" min-width="100" prop="airJp"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unitList: ["#1", "#2"],
      showTable: false,
    };
  },
  props: {
    height: {
      type: Number,
      default: 400,
    },
    tl_tableData: {
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
    getTLDetail(row) {
      this.$emit("getTLDetail", row);
    },
    isBtnDisable(val) {
      if (
        !val ||
        val == "合计或者平均" ||
        val == "合计或平均" ||
        val == "东北区域" ||
        val == "河南区域" ||
        val == "江西区域" ||
        val == "内蒙公司" ||
        val == "西北区域" ||
        val == "西南区域"
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
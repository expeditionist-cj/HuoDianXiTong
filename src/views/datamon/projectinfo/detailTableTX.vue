<template>
  <div class="detailTable">
    <table border="none" style="table-layout:fixed" class="detailTable__table">
      <colgroup>
            <col align="center" width="50%">
            <col align="center" width="50%">
      </colgroup>
      <tr>
        <th colspan="2">脱硝设计指标</th>
      </tr>
      <tr>
        <td>脱硝效率(%)</td>
        <td class="ellipsis" :title="data.xefficiency">{{data.xefficiency| formatValue}}</td>
      </tr>
      <tr>
        <td>入口NOx浓度(mg/Nm3)</td>
        <td class="ellipsis" :title="data.xinputNox">{{data.xinputNox| formatValue}}</td>
      </tr>
      <tr>
        <td>反应器设计入口烟气量（干基，6%烟气量）(Nm3/h)</td>
        <td class="ellipsis" :title="data.xinputGas">{{data.xinputGas| formatValue}}</td>
      </tr>
      <tr>
        <td>装置电耗(KWh)</td>
        <td class="ellipsis" :title="data.xelectricRate">{{data.xelectricRate| formatValue}}</td>
      </tr>
      <tr>
        <td>还原剂消耗量(t/h)</td>
        <td class="ellipsis" :title="data.xreductantPower">{{data.xreductantPower| formatValue}}</td>
      </tr>
      <tr>
        <td>蒸汽耗量(m3/h)</td>
        <td class="ellipsis" :title="data.xwaterPower">{{data.xwaterPower| formatValue}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          S_EFFICIENCY: "", // 脱硫效率
          S_INPUT_SO2: "", // 入口SO2浓度
          S_EFFICIENCY: "", //	脱硫效率
          S_INPUT_SO2: "", //	入口SO2浓度
          S_INPUT_GAS: "", //	脱硫入口烟气流量
          S_ELECTRIC_RATE: "", //	脱硫装置电耗
          S_ATTRACTANT_POWER: "", //	脱硫吸收剂消耗量
          S_WATER_POWER: "", //	脱硫水耗量
          xefficiency: "", //	脱硝效率
          xinputNox: "", //	入口NOX浓度
          xinputGas: "", //	脱硝入口烟气流量
          xelectricRate: "", //	脱硝装置电耗
          xreductantPower: "", //	脱硝还原剂消耗量
          xwaterPower: "" //	脱硝蒸汽耗量
        };
      }
    },
    titil: {
      type: String,
      default: "脱硫设计指标"
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.detailTable {
  width: 100%;
  height: 100%;
  .detailTable__table {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 6px 6px 0px 0px;
    th {
      background: rgba(241, 241, 241, 0.4);
      color: #252525;
      font-weight: bold;
    }
    td {
      color: rgba(120, 120, 120, 1);
    }
    th,
    td {
      text-align: center;
      height: 30px;
      border: none;
      font-size: 12px;
      line-height: 30px;
      font-weight: 500;
      padding: 6px;
      cursor: pointer;
    }
    tr > th {
      background: rgba(241, 241, 241, 0.4);
      color: #252525;
      font-weight: bold;
    }
    tr > td:nth-child(1),
    tr > th:nth-child(1) {
      width: 200px;
    }
  }
}
</style>

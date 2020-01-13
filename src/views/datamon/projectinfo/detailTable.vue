<template>
  <div class="detailTable">
    <table border="none" style="table-layout:fixed" class="detailTable__table">
      <colgroup>
        <col align="center" width="50%" />
        <col align="center" width="50%" />
      </colgroup>
      <tr>
        <th colspan="2">脱硫设计指标</th>
      </tr>
      <tr>
        <td>脱硫效率(%)</td>
        <td class="ellipsis" :title="data.sinputGas">{{data.sefficiency | formatValue}}</td>
      </tr>
      <tr>
        <td>入口SO2浓度(mg/Nm3)</td>
        <td class="ellipsis" :title="data.sinputSo2">{{data.sinputSo2 | formatValue}}</td>
      </tr>
      <tr>
        <td>&emsp;&emsp;设计入口烟气量（干基，6%烟气量）(Nm3/h)&emsp;&emsp;</td>
        <td class="ellipsis" :title="data.sinputGas">{{data.sinputGas | formatValue}}</td>
      </tr>
      <tr>
        <td>装置电耗(KWh)</td>
        <td class="ellipsis" :title="data.selectricRate">{{data.selectricRate | formatValue}}</td>
      </tr>
      <tr>
        <td>吸收剂消耗量(t/h)</td>
        <td class="ellipsis" :title="data.sattractantPower">{{data.sattractantPower | formatValue}}</td>
      </tr>
      <tr>
        <td>水耗量(t/h)</td>
        <td class="ellipsis" :title="data.swaterPower">{{data.swaterPower | formatValue}}</td>
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
          sinputGas: "", // 脱硫效率
          sinputSo2: "", // 入口SO2浓度
          sinputGas: "", //	脱硫效率
          sinputSo2: "", //	入口SO2浓度
          S_INPUT_GAS: "", //	脱硫入口烟气流量
          selectricRate: "", //	脱硫装置电耗
          sattractantPower: "", //	脱硫吸收剂消耗量
          sWaterPower: "", //	脱硫水耗量
          X_EFFICIENCY: "", //	脱硝效率
          X_INPUT_NOX: "", //	入口NOX浓度
          X_INPUT_GAS: "", //	脱硝入口烟气流量
          X_ELECTRIC_RATE: "", //	脱硝装置电耗
          X_REDUCTANT_POWER: "", //	脱硝还原剂消耗量
          X_WATER_POWER: "" //	脱硝蒸汽耗量
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
      width: 120px;
    }
  }
}
</style>

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
        <td>脱硝效率</td>
        <td class="ellipsis" :title="data.X_EFFICIENCY">{{data.X_EFFICIENCY| formatValue}}</td>
      </tr>
      <tr>
        <td>入口NOx浓度</td>
        <td class="ellipsis" :title="data.X_INPUT_NOX">{{data.X_INPUT_NOX| formatValue}}</td>
      </tr>
      <tr>
        <td>反应器设计入口烟气量（干基，6%烟气量）</td>
        <td class="ellipsis" :title="data.X_INPUT_GAS">{{data.X_INPUT_GAS| formatValue}}</td>
      </tr>
      <tr>
        <td>装置电耗</td>
        <td class="ellipsis" :title="data.X_ELECTRIC_RATE">{{data.X_ELECTRIC_RATE| formatValue}}</td>
      </tr>
      <tr>
        <td>还原剂消耗量</td>
        <td class="ellipsis" :title="data.X_REDUCTANT_POWER">{{data.X_REDUCTANT_POWER| formatValue}}</td>
      </tr>
      <tr>
        <td>蒸汽耗量</td>
        <td class="ellipsis" :title="data.X_WATER_POWER">{{data.X_WATER_POWER| formatValue}}</td>
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
      width: 200px;
    }
  }
}
</style>

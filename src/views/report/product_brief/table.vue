<template>
  <div class="product_breif_table">
    <table class="table-box" border="0" cellspacing="0" cellpadding="0">
      <colgroup>
        <col name="el-table_9_column_36" width="150" />
        <col name="el-table_9_column_37_column_38" width="120" />
        <col name="el-table_9_column_37_column_39_column_40" width="" />
        <col name="el-table_9_column_37_column_39_column_41" width="" />
        <col name="el-table_9_column_37_column_39_column_42" width="" />
      </colgroup>
      <thead>
        <tr>
          <th colspan="2">项目</th>
          <th>发电量 (亿KWh)</th>
          <th>原材料进量 (t)</th>
          <th>原材料使用量 (t)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3">脱硫</td>
          <td>本日</td>
          <td>{{ts.day_power}}</td>
          <td>{{ts.day_in}}</td>
          <td>{{ts.day_out}}</td>
        </tr>
        <tr>
          <td>本月</td>
           <td>{{ts.month_power}}</td>
          <td>{{ts.month_in}}</td>
          <td>{{ts.month_out}}</td>
        </tr>
        <tr>
          <td>完成计划(%)</td>
          <td>{{ts.rate}}</td>
          <td>--</td>
          <td>{{ts.rate_out}}</td>
        </tr>

        <!-- 脱硝 -->
        <tr>
          <td rowspan="3">脱硝</td>
          <td>本日</td>
          <td>{{tx.day_power}}</td>
          <td>{{tx.day_in}}</td>
          <td>{{tx.day_out}}</td>
        </tr>
        <tr>
          <td>本月</td>
           <td>{{tx.month_power}}</td>
          <td>{{tx.month_in}}</td>
          <td>{{tx.month_out}}</td>
        </tr>
        <tr>
          <td>完成计划(%)</td>
          <td>{{tx.rate}}</td>
          <td>--</td>
          <td>{{tx.rate_out}}</td>
        </tr>
        <!-- 除尘 -->
        <tr>
          <td rowspan="3">除尘</td>
          <td>本日</td>
          <td>{{cc.day_power}}</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>本月</td>
           <td>{{cc.month_power}}</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>完成计划(%)</td>
          <td>{{cc.rate}}</td>
          <td>--</td>
          <td>--</td>
        </tr>

        <!-- 合计 -->
       <tr>
          <td rowspan="3">合计</td>
          <td>本日</td>
          <td>{{sum.day_power}}</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>本月</td>
           <td>{{sum.month_power}}</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>完成计划(%)</td>
          <td>{{sum.rate}}</td>
          <td>--</td>
          <td>--</td>
        </tr>

        <!-- 环保装置运行情况 -->
        <tr>
          <td rowspan="3">环保装置运行情况</td>
          <td>脱硫停运机组</td>
          <td colspan="3">{{deviceStatus.s}}</td>
        </tr>
        <tr>
          <td>脱硝停运机组</td>
          <td colspan="3">{{deviceStatus.n}}</td>
        </tr>
        <tr>
          <td>除尘停运机组</td>
          <td colspan="3">{{deviceStatus.d}}</td>
        </tr>

        <tr>
          <td>其它情况说明</td>
          <td colspan="4">{{other}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cc:{
      type:Object,
      defualt:()=>{
        return {}
      }
    },
    ts:{
      type:Object,
      defualt:()=>{
        return {}
      }
    },
    tx:{
      type:Object,
      defualt:()=>{
        return {}
      }
    },
    deviceStatus:{
      type:Object,
      defualt:()=>{
        return {}
      }
    },
    sum:{
      type:Object,
      defualt:()=>{
        return {}
      }
    },
    other:""
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

<style scoped lang="less">
.product_breif_table {
  height: 100%;
  .table-box {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    td,th{
         border-bottom: 1px solid #DCDFE6;
            border-right: 1px solid #DCDFE6;
    }
    border-top:1px solid #DCDFE6;
    border-left: 1px solid #DCDFE6;
    thead {
      th {
        height: 36px;
        font-size: 14px;
        font-weight: 800;
        background: #edf1fb;
        text-align: center;
      }
    }
    tbody {
      td {
        height: 36px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
    }
  }
}
</style>

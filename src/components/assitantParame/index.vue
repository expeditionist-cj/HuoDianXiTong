<template>
  <div class="assitantParame">
    <Mycard style="margin-bottom:16px">
      <div slot="header" class="header">
        <slot name="header"></slot>
      </div>
      <div slot="content" class="assitantParame-content clearfix">
        <Nodata v-if="!data.length" class="nodata"></Nodata>
        <div class="parame" v-else v-for="(item,index) in data" :key="index">
          <span class="title">{{item.fieldName}}：</span>
          <span class="data">{{item.fieldValue}}</span>
          &nbsp;
          <span class="unit">{{item.unit}}</span>
        </div>
      </div>
    </Mycard>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:Array,
      default:()=>{
        return [{
            "fieldName":"当前建议",
            "fieldCode":"sg",
            "fieldValue":"供浆量应调整在18.48-28.48内"
        },
        {
            "fieldName":"入口so2折算值",
            "fieldCode":"Cin_so2",
            "fieldValue":"2736.67"
        },
        {
            "fieldName":"机组负荷",
            "fieldCode":"ul",
            "fieldValue":"545.81"
        },
        {
            "fieldName":"石灰石浆液密度",
            "fieldCode":"md",
            "fieldValue":"1.35"
        },
        {
            "fieldName":"ph值",
            "fieldCode":"ph",
            "fieldValue":"5.34"
        },
        {
            "fieldName":"出口so2小时均值",
            "fieldCode":"avg_so2",
            "fieldValue":"29.25"
        },
        {
            "fieldName":"出口so2折算值",
            "fieldCode":"Cout_so2",
            "fieldValue":"24.07"
        },
        {
            "fieldName":"石灰石浆液流量",
            "fieldCode":"Fsly",
            "fieldValue":"30.94"
        }]
      }
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
.assitantParame {
  .assitantParame-content {
    min-height: 138px;
    margin-left: -20px;
    & > .parame {
      width: 33.33333%;
      padding-left: 20px;
      float: left;
      height: 40px;
      line-height: 40px;
      .title {
        font-size: 16px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .data {
        font-size: 16px;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: rgba(63, 158, 255, 1);
      }
      .unit {
        font-size: 16px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>

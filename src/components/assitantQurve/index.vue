<template>
  <div class="assitantQurve">
    <Mycard style="margin-bottom:16px">
      <div slot="header" class="header">
        <slot name="header"></slot>
      </div>
      <div slot="content" class="assitantQurve-content">
        <Nodata v-if="!Object.keys(data).length" class="nodata" data="暂无曲线"></Nodata>
        <div class="parame">
          <div style="width:100%;height:400px;">
            <v-chart autoresize :options="options" />
          </div>
        </div>
      </div>
    </Mycard>
  </div>
</template>

<script>
// import getCurveData from '@/api/assitant/common'
export default {
  props: {
    options:{
      type:Object,
      default : ()=>{
        return {}
      }
    }
  },
  data() {
    return {
      data: {
        type: Object,
        default: () => {
          return {
            fieldValue: "暂无建议"
          };
        }
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // getCurveData()
  }
};
</script>

<style scoped lang="scss">
.assitantQurve {
  .assitantQurve-content {
    min-height: 360px;
  }
  .parame {
    display: flex;
    justify-content: center;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

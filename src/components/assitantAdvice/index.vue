<template>
  <div class="assitanAdvice">
    <Mycard style="margin-bottom:16px">
      <div slot="header" class="header">
        <slot name="header"></slot>
      </div>
      <div slot="content" class="assitanAdvice-content clearfix">
        <Nodata
          v-if="!data.fieldValue"
          class="nodata"
          data="暂无建议"
        ></Nodata>
        <div class="parame">
          <span>{{ data.fieldValue }}</span>
        </div>
      </div>
    </Mycard>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: ()=>{
          return {
              fieldValue:'暂无建议'
          }
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
.assitanAdvice {
  .assitanAdvice-content {
    min-height: 40px;
    line-height: 40px;
    & > .parame {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(234, 50, 143, 1);
    }
  }
}
</style>

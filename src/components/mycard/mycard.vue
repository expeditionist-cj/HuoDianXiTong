<template>
  <div class="mycard" :style="mycardStyle">
    <div class="mycard__title" v-if="isShowTitle">
      <slot name="title"></slot>
    </div>
    <!-- <div class="segmentation" v-if="isShowTitle"></div> -->
    <div class="mycard__header">
      <slot name="header"></slot>
    </div>
    <div class="segmentation" v-if="showSegmentation"></div>
    <div class="mycard__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mycardStyle: String,
    showSegmentation: {
      type: Boolean,
      default: true
    },
    isShowTitle: {
      type: Boolean,
      default: false
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
.mycard {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 4px 0px rgba(236, 236, 236, 1);
  border-radius: 10px;
  .segmentation {
    height: 1px;
    background: rgba(233, 233, 233, 1);
  }
  .mycard__title {
    height: 92px;
    line-height: 92px;
  }
  .mycard__header {
    height: 46px;
    line-height: 46px;
    padding: 0 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .mycard__content {
    height: calc(100% - 47px);
    padding: 8px 16px;
  }
}
</style>

<template>
  <div class="layout-table">
    <div class="content-title">
      <slot name="title"></slot>
    </div>
    <div class="content-table">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
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
.layout-table {
  height: 100%;
  // padding: 0 32px;
  .content-title {
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: rgba(237, 241, 251, 1);
    border: 1px solid rgba(220, 223, 230, 1);
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 0px;
  }
  .content-table {
    padding-bottom: 20px;
  }
}
</style>

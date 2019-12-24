<template>
  <div class="nodata-wrap">
    <span >{{ data }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: "暂无数据查看"
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
.nodata-wrap {
  height: 100%;
  width: 100%;
  min-height: 60px;
  position: relative;
  &>span{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%)
  }

}
</style>

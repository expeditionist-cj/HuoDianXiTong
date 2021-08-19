<template>
  <div class="full-screen-container" :style="fullScreenStyle" ref="full_screen">
    <el-button
      v-if="showFullScr"
      @click="showFullScreen"
      style="position:absolute;left:30px;top:75px;"
      type="primary"
      size="mini"
    >显示全屏</el-button>
    <el-button
      v-else
      @click="exitFullScreen"
      style="position:absolute;left:30px;top:75px;"
      type="primary"
      size="mini"
    >退出全屏</el-button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      showFullScr: true,
      tableHeight: 400,
      fullScreenStyle: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.tableHeight = this.$refs.full_screen.offsetHeight - 280;
  },
  watch: {
    // tableHeight(value) {
    //   console.log(value);
    // }
  },
  methods: {
    showFullScreen(value) {
      this.showFullScr = false;
      let height = window.innerHeight;
      this.fullScreenStyle = `position:fixed;top:0;left:0;height:${height}px;z-index:2200;`;
      value = this.$refs.full_screen.offsetHeight - 100;
      this.$store.commit('SET_BASIC_CONTAINER','');
      this.$emit('showFullScreen',value);
    },
    exitFullScreen(value) {
      this.showFullScr = true;
      this.fullScreenStyle = "";
      value = this.$refs.full_screen.offsetHeight - 387;
      this.$store.commit('SET_BASIC_CONTAINER','padding:8px 10px');
      this.$emit('exitFullScreen',value);
    }
  }
};
</script>

<style scoped lang="scss">
.full-screen-container {
  height: 100%;
}
</style>
<template>
  <div class="multipleCraft clearfix">
    <div class="fl" v-for="item in srcList" :key="item">
      <iframe :src="item" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    srcList: Array
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
.multipleCraft {
  height: 100%;
  width: 100%;
//   margin-top: -10px;
  & > div {
    width: calc(calc(100% - 10px) / 2);
    height: calc(calc(100% - 10px) / 2);
    margin-right: 10px;
    margin-top: 10px;
    div {
      width: 100%;
      height: 100%;
      background: yellow;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  & > div:nth-child(1),
  & > div:nth-child(2) {
    margin-top: 0;
  }
  & > div:nth-child(2),
  & > div:nth-child(4) {
    margin-right: 0;
  }
}
</style>

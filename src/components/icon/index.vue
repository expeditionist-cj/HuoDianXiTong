<template>
  <img 
  :style="iconStyle"
  class="icon" 
  :src="icon" 
  alt="图片加载失败" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    iconStyle:String
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
.icon {
  width: 14px;
  height: 16px;
  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>

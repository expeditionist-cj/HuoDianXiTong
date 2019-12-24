<template>
  <ul class="tabs clearfix">
    <li class="fl" v-for="(item,idx) in tabsList" :key="item">
      <span
        :class="{'li-content':true,'mytabs-active':activeKey == idx}"
        @click="clickSpan(item,idx)"
      >{{item}}</span>
      <span class="li-segmentation" v-if="tabsList.length != idx+1"></span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tabsList: Array,
    clickItem: Function
  },
  data() {
    return {
      activeKey: 0
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    clickSpan(item, idx) {
      this.activeKey = idx;
      this.$emit('clickItem',item, idx)
    }
  }
};
</script>

<style scoped lang="scss">
.tabs {
  & > li {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 20px;
    .li-content {
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;
    }
    .li-segmentation {
      display: inline-block;
      width: 1px;
      height: 12px;
      background: rgba(242, 242, 242, 1);
      margin: 0 12px;
    }
  }
  .mytabs-active {
    color: rgba(63, 158, 255, 1);
  }
}
</style>

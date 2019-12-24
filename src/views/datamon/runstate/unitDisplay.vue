<template>
  <ul class="clearfix unitDisplay">
    <li
      class="fl"
      :style="liWidth"
      :class="{'active':item.unitStatus}"
      v-for="item in data"
      :key="item.unitName"
    >{{(item.unitName).replace(/机组/g,"")}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: ()=>{return []}  
    }
  },
  data() {
    return {
      liWidth: "width:20%",
      isActive:0
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
      this.mathLiWidth()
  },
  watch: {},
  methods: {
    mathLiWidth() {
      let len = this.data.length;
      this.liWidth = `width:calc(calc(100% - ${(len-1)*3}px)/${len})`;

    }
  }
};
</script>

<style scoped lang="scss">
.unitDisplay {
  height: 100%;
  & > li {
    height: 29px;
    background: rgba(255, 88, 88, 1);
    border-radius: 2px;
    margin: 3px 3px 0 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 29px;
    text-align: center;
  }
  &>li:last-child{
      margin-right: 0;
  }
  .active{
    background: rgba(126,208,107,1)
  }
}
</style>

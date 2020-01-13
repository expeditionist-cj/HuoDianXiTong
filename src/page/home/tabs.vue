<template>
  <!-- <ul class="tabs clearfix">
    <li class="fl" v-for="(item,idx) in tabsList" :key="item">
      <span
        :class="{'li-content':true,'mytabs-active':activeKey == idx}"
        @click="clickSpan(item,idx)"
      >{{item}}</span>
      <span class="li-segmentation" v-if="tabsList.length != idx+1"></span>
    </li>
  </ul> -->
  <div>
    <el-radio-group v-model="radio" @change="handleChange" size="small">
      <el-radio-button v-for="(item,idx) in tabsList" :key="idx" :label="item"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    tabsList: Array,
    clickItem: Function
  },
  data() {
    return {
      activeKey: 0,
      radio:''
    };
  },
  components: {},
  computed: {
  },
  created() {
    this.radio=this.tabsList[0];
  },
  mounted() {},
  watch: {},
  methods: {
    // clickSpan(item, idx) {
    //   this.activeKey = idx;
    //   this.$emit('clickItem',item, idx)
    // },
    handleChange(radio){
      this.$emit('clickItem',radio);
    }
  }
};
</script>

<style scoped lang="scss">
// .tabs {
//   & > li {
//     height: 20px;
//     font-size: 14px;
//     font-family: PingFangSC-Regular, PingFang SC;
//     font-weight: 400;
//     color: rgba(89, 89, 89, 1);
//     line-height: 20px;
//     .li-content {
//       display: inline-block;
//       font-size: 14px;
//       font-family: PingFangSC-Regular, PingFang SC;
//       font-weight: 400;
//       line-height: 20px;

//       cursor: pointer;
//     }
//     .li-segmentation {
//       display: inline-block;
//       width: 1px;
//       height: 12px;
//       background: rgba(242, 242, 242, 1);
//       margin: 0 12px;
//     }
//   }
//   .mytabs-active {
//     color: rgba(63, 158, 255, 1);
//   }
// }
</style>

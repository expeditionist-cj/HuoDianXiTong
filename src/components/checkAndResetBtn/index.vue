<template>
  <div class="checkAndResetBtn" :style="btnStyle">
    <el-button @click="clickCheck" :type="checkType" size="mini">{{checkContent}}</el-button>
    <el-button v-if="showRest" @click="clickReset" :type="resetType" size="mini">{{resetContent}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
      btnStyle:String,
      showRest:{
        type:Boolean,
        default:true
      },
      resetContent:{
        type:String,
        default:"重置"
      },
      checkContent:{
        type:String,
        default:"查询"
      },
      checkType:{
        type:String,
        default:"primary"
      },
      resetType:{
        type:String,
        default:"info"
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
  methods: {
     clickCheck(){
       this.$emit('check');
     },
     clickReset(){
       this.$emit('reset');
     }
  }
};
</script>

<style scoped lang="scss">
.checkAndResetBtn {
  height: 42px;
  line-height: 42px;
  width: 100%;
  line-height: 42px;
  text-align: right;
}
</style>

<template>
  <div class="checkAndResetBtn" :style="btnStyle">
    <el-button :disabled="showCheck" @click="clickCheck" :type="checkType" size="mini">{{checkContent}}</el-button>
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
      showCheck:{
        type:Boolean,
        default:false
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
        default:"primary"
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
  // width: 100%;
  text-align: right;
}
</style>

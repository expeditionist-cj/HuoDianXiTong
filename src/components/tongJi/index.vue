<template>
  <div class="tongji">
    <span>{{label}}({{unit}}):</span>
    <div class="tongji_val">{{value}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value:''
    }
  },
  props: {
    label: {
      type: String,
      default: () => {
        return '';
      }
    },
    unit: {
      type: String,
      default: ()=>{
        return '';
      }
    },
    val:0
  },
  created() {
    this.value = this.val;
  }
};
</script>

<style lang="scss" scoped>
.tongji {
  margin-left: 20px;
  display: flex;
  .tongji_val {
    color: rgba(63, 158, 255, 1);
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
  }
}
</style>
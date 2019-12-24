<template>
  <div class="basic-container" :class="{'basic-container--block':block}">
    <el-card>
      <slot></slot>
    </el-card>
    <Foot />
  </div>
</template>

<script>
import Foot from "@/components/footer/index"
export default {
  name: "basicContainer",
  props: {
    block: {
      type: Boolean,
      default: false
    }
  },
  components:{
    Foot
  }
};
</script>

<style lang="scss">
.basic-container {
  padding: 8px 10px;
  border-radius: 10px;

  // background:rgba(255,255,255,1);
  box-shadow: 4px 4px 4px 0px rgba(236, 236, 236, 1);
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
  .el-card{
    border-radius: 10px;
  }
}
</style>

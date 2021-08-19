<template>
  <div class="myAnalysisBox">
    <div class="box-top">
      <span class="box-num">{{deviceData.times}}</span>
      <span class="box-unit">&nbsp;&nbsp;{{deviceData.unitName}}</span>
    </div>
    <div class="box-bottom">{{deviceData.deviceName}}</div>
  </div>
</template>
<script>
export default {
  props: {
    deviceData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.myAnalysisBox {
  text-align: center;
  .box-top {
    .box-num {
      font-size: 32px;
    }
    .box-unit {
      font-size: 16px;
    }
  }
  .box-bottom {
    font-size: 16px;
  }
}
</style>
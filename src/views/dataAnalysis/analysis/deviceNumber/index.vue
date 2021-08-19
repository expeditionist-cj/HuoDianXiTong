<template>
  <div class="overLimit">
    <div class="title-text">{{title}}</div>
    <div class="content">
      <div class="div-analysis-box">
        <myAnalysisBox v-for="(item,index) in deviceNumbers" :key="index" :deviceData="item" />
      </div>
    </div>
  </div>
</template>
<script>
import myAnalysisBox from "@/components/myAnalysisBox/index.vue";
export default {
  components: {
    myAnalysisBox,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    deviceNumbers: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.overLimit {
  width: 100%;
  margin: 0 10px;
  padding: 10px;
  .title-text {
    margin-bottom: 5px;
  }
  .content {
    border: 1px solid rgba(220, 223, 230, 1);
    border-radius: 5px;
    padding: 5px;
    .title-time {
      display: flex;
      & :first-child {
        width: 50%;
      }
    }
    .div-analysis-box {
      display: flex;
      justify-content: space-around;
      .fgf {
        margin: 10px 0;
        border-right: 1px solid #000;
      }
    }
  }
}
</style>
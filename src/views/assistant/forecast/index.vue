<template>
  <div>
    <assitant :modelId="modelId" :qx_title="qx_title"></assitant>
  </div>
</template>

<script>
import assitant from "@/components/assitant";
export default {
  data() {
    return {
      modelId: 5,
      qx_title: "出口时刻曲线"
    };
  },
  created() {
    if (this.$store.state.assitantTitle.unit) {
      this.$store.commit("CLEAR_AREA_PLANT");
    }
  },
  destroyed() {
    if (this.$store.state.assitantTitle.unit) {
      this.$store.commit("CLEAR_AREA_PLANT");
    }
  },
  components: {
    assitant
  }
};
</script>

<style>
</style>
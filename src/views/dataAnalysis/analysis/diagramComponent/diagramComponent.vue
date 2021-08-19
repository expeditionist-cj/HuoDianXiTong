<template>
  <div class="diagramComponent">
    <v-chart autoresize :options="diagramOption" />
  </div>
</template>
<script>
export default {
  props: {
    diagramOption: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.diagramComponent {
  width: 100%;
  height: 400px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
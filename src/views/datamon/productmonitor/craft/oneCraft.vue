<template>
  <div class="oneCraft">
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    iframeSrc: String
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.oneCraft {
  height: 100%;
  width: 100%;
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>

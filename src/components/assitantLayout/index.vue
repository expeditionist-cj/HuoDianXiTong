<template>
  <div class="assitant-wrap">
      <slot></slot>
     <Foot/>
  </div>
</template>

<script>
import Foot from "../footer/index"
export default {
  props: {},
  data() {
    return {};
  },
  components: {Foot},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.assitant-wrap {
    padding: 0 16px;
}
</style>

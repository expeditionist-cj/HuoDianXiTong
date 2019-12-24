<template>
  <div class="my-card" :style="cardStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
      cardStyles:String
  },
  data() {
    return {
    };
  },
  components: {},
  computed: {
  },
  created() {},
  mounted() {

  },
  watch: {

  },
  methods: {}
};
</script>

<style scoped lang="scss">
.my-card {
//   height: calc(100% - 48px);
//   min-height: 629px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 4px 0px rgba(236, 236, 236, 1);
  border-radius: 10px;
//   margin: 16px 16px 0 16px;
//   overflow-y: auto;
}
</style>

<template>
  <ul class="my__list">
    <li v-for="(item,idx) in data" :key="idx">
      <div class="list__title">{{item.name}}</div>
      <div class="list__content">{{ item.value }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
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
  methods: {}
};
</script>

<style scoped lang="scss">
.my__list {
  height: 100%;
  .list__title {
    // width: 82px;
    height: 16px;
    font-size: 14px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: rgba(137, 139, 150, 1);
    line-height: 16px;
    margin-top: 22px;
  }
  .list__content {
    // width: 148px;
    height: 38px;
    font-size: 24px;
    font-family: HelveticaNeue-Medium, HelveticaNeue;
    font-weight: 500;
    color: rgba(63, 158, 255, 1);
    line-height: 38px;
  }
}
</style>

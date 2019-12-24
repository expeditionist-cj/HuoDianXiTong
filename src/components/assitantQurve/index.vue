<template>
  <div class="assitantQurve">
    <Mycard style="margin-bottom:16px">
      <div slot="header" class="header">
        <slot name="header"></slot>
      </div>
      <div slot="content" class="assitantQurve-content">
        <Nodata
          v-if="!Object.keys(data).length"
          class="nodata"
          data="暂无曲线"
        ></Nodata>
        <div class="parame">
          <span>{{ data.fieldValue }}</span>
        </div>
      </div>
    </Mycard>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      data: {
        type: Object,
        default: () => {
          return {
            fieldValue: "暂无建议"
          };
        }
      }
    };
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
.assitantQurve {
  .assitantQurve-content {
    min-height: 360px;
  }
}
</style>

<template>
  <div class="plantDisplay">
    <div :style="data.projectStatus?'background: rgba(126,208,107,1)':''">{{data.projectName}}</div>
    <UnitDisplayLi
      :data="data.unitsInfo"
    />
  </div>
</template>

<script>
import UnitDisplayLi from "./unitDisplay";
export default {
  props: {
    data: {
      type: Object,
      default: ()=>{
      return { projectName: "", unitsInfo: [] }
      }
    }
  },
  data() {
    return {};
  },
  components: {
    UnitDisplayLi
  },
  computed: {},
  created() {},
  mounted() {
  },
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.plantDisplay {
  width: 12.5%;
  padding-left: 10px;
  float:left;
  & > div {
    width: 100%;
    height: 29px;
    background: rgba(255, 88, 88, 1);
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 29px;
    text-align: center;
  }
}
</style>

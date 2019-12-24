<template>
  <div class="scroll-wrap" ref="slide" @mouseover="hoverOn" @mouseout="hoverLeave">
    <div v-for="(item,idx) in data" :key="idx" ref="slide1">
      <span>
        {{item.name}}：{{item.content}}
        <span v-if="data.length != idx">；</span>
        <span v-else>。</span>
      </span>
    </div>
    <div v-for="(item,idx) in data" :key="idx">
      <span>
        {{item.name}}：{{item.content}}
        <span v-if="data.length != idx">；</span>
        <span v-else>。</span>
      </span>
    </div>
   
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  watch: {
    isCollapse() {
      this.setTime();
    }
  },
  created() {},
  mounted() {
    this.setTime();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    Marquee() {
      let slide = this.$refs.slide;
      let slideWidth = slide.clientWidth || slide.offsetWidth;
      if (slideWidth + slide.scrollLeft < slide.scrollWidth) {
        slide.scrollLeft++;
      } else {
        slide.scrollLeft = 0;
      }
    },
    // 定时任务
    setTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.Marquee();
      }, 40);
    },
    hoverOn(){
      clearInterval(this.timer)
    },
    hoverLeave(){
      this.setTime()
    }
  }
};
</script>
<style lang="scss">
.scroll-wrap {
  height: 30px;
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  line-height: 28px;
  cursor: pointer;
  & > div {
    display: inline-block;
    height: 100%;
    margin-right: 6px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 246, 127, 1);
  }
}
</style>
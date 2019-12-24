<template>
  <div class="time" :style="timeStyle">{{time}}</div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  props: {
      timeStyle:String
  },
  data() {
    return {
      time: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.getTime();
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  watch: {},
  methods: {
    getTime() {
      let day = moment().format("YYYY/MM/DD");
      let week = moment().format("dddd");
      let time = moment().format("HH:mm:ss");
      this.time = day + "  " + week + "   " + time;
    }
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped lang="scss">
.time {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
</style>

<template>
  <div ref="write_data">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="日报" name="day"></el-tab-pane>
        <el-tab-pane label="周报" name="week"></el-tab-pane>
        <el-tab-pane label="月报" name="month"></el-tab-pane>
        <keep-alive>
            <component v-bind:is="showComponent" :height="height"></component>
        </keep-alive>
        
      </el-tabs>
    </Card>
  </div>
</template>
<script>
import writeDay from "./writeDay.vue";
import writeWeek from "./writeWeek.vue";
import writeMonth from "./writeMonth.vue";
import { defHotSettingsWeek } from "./writeWeek.js";
import { defHotSettingsMonth } from "./writeMonth.js";
import { getAuthority } from "@/api/admin/user.js";

export default {
  props: {},
  data() {
    return {
      activeName: "day",
      height: 600,
      hotSettingsWeek: {},
      hotSettingsMonth: {},
      showComponent: "writeDay"
    };
  },
  created(){
    this.uid = JSON.parse(sessionStorage.getItem("user")).user.user_id;
    this.getAuthority({ userId: this.uid });
    
  },
  components: { writeDay, writeWeek, writeMonth },
  mounted() {
    this.height = this.$refs.write_data.offsetHeight - 180;
  },
  watch: {
    activeName(value) {
      if (value == "week") {
        this.hotSettingsWeek = defHotSettingsWeek;
      } else if (value == "month") {
        this.hotSettingsMonth = defHotSettingsMonth;
      }
    }
  },
  methods: {
    getAuthority(query) {
      getAuthority(query).then(res => {
        let identity = res.data.data[0];
        this.$store.commit('SET_IDENTITY',identity);
      });
    },
    handleClick(data) {
      let label = data.label;
      switch (label) {
        case "日报":
          this.showComponent = 'writeDay'
          break;
        case "周报":
          this.showComponent = 'writeWeek'
          break;
        default:
          this.showComponent = 'writeMonth'
          break;
      }
    }
  }
};
</script>
<style scoped lang="less">

</style>
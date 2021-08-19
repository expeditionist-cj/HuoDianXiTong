<template>
  <div>
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="日报" name="day"></el-tab-pane>
        <keep-alive>
          <component v-bind:is="showComponent" :height="height"></component>
        </keep-alive>
      </el-tabs>
    </Card>
  </div>
</template>
<script>
import writeDay from "./writeDay.vue";

export default {
  data() {
    return {
      activeName: "day",
      height: 600,
      showComponent: "writeDay",
    };
  },
  mounted() {},
  components: { writeDay },
  methods: {},
};
</script>
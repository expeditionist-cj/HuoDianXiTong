<template>
  <div class="assitantOrg">
    <Card style="margin-bottom:16px;min-height:84px;padding:20px 10px">
      <!-- <SelOrg
            :showSystem="false"
            :showDevice="false"
            :showAll="false"
            @selectArear="selectArear"
            @selectPlant="selectPlant"
            @selectUnit="selectUnit"
      />-->
      <div style="margin-left:20px;display:flex;align-items:center;">
        <div style="margin-left:20px;display:flex;align-items:center;">
        <span>区域/项目：</span>
        <cascade @onMyCascader="onMyCascader" :showAll="false" :showSys="false"></cascade>
      </div>
      <div style="margin-left:20px;">
        <el-button type="primary" @click="onOk" size="small">查询</el-button>
      </div>
      </div>
      
    </Card>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import Card from "@/components/card/index";

export default {
  props: {
    sonModelId: ""
  },
  data() {
    return {
      query: {},
      cnName: {},
      title: {}
    };
  },
  components: { Card,cascade },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // selectArear(data) {
    //   delete this.query.plantCode;
    //   delete this.cnName.plant;
    //   this.query.regionCode = data.deptCode;
    //   this.cnName.area = data.name;
    // },
    // selectPlant(data) {
    //   delete this.query.unitCode;
    //   delete this.cnName.unit;
    //   this.query.plantCode = data.deptCode;
    //   this.cnName.plant = data.name;
    // },
    // selectUnit(data) {
    //   this.query.unitCode = data.deviceCode;
    //   this.cnName.unit = data.deviceName;
    // },
    onMyCascader(data) {
      if (!data.area || !data.plant || !data.unit) {
        return this.$message("请选择区域、电厂和机组");
      }
      this.query.regionCode = data.area;
      this.query.plantCode = data.plant;
      this.query.unitCode = data.unit;
      this.cnName.area = data.name.split('/')[0]
      this.cnName.plant = data.name.split('/')[1]
      this.cnName.unit = data.name.split('/')[2]
      this.onOk()
    },
    onOk() {
      if (!this.query.unitCode) {
        return this.$message.error("请选择机组");
      }
      this.$emit("onOk", this.query, this.cnName);
    }
  }
};
</script>

<style scoped lang="scss">
.assitantOrg {
  .btn-wrap {
    margin-top: 8px;
  }
}
</style>

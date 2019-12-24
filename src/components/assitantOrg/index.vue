<template>
  <div class="assitantOrg">
    <Card style="margin-bottom:16px;min-height:84px;padding:20px 10px">
      <el-row>
        <el-col :span="16">
          <SelOrg
            :showSystem="false"
            :showDevice="false"
            :showAll="false"
            @selectArear="selectArear"
            @selectPlant="selectPlant"
            @selectUnit="selectUnit"
          />
        </el-col>
        <el-col :span="2" :offset="6">
          <div class="btn-wrap">
            <el-button type="primary" @click="onOk" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card/index";
export default {
  props: {},
  data() {
    return {
      query: {},
      cnName: {}
    };
  },
  components: { Card },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    selectArear(data) {
      delete this.query.plantCode;
      delete this.cnName.plant;
      this.query.regionCode = data.deptCode;
      this.cnName.area = data.name;
    },
    selectPlant(data) {
      delete this.query.unitCode;
      delete this.cnName.unit;
      this.query.plantCode = data.deptCode;
      this.cnName.plant = data.name;
    },
    selectUnit(data) {
      this.query.unitCode = data.deviceCode;
      this.cnName.unit = data.deviceName;
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

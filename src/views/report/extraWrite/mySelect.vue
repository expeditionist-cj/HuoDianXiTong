<template>
  <div class="flex">
    <div class="flex margin">
      <div class="flex">
        <div>项目：</div>
        <div>
          <el-select
            size="small"
            v-model="plantValue"
            @change="changePlant"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, idx) in plants"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="flex margin">
      <div class="flex">
        <div>机组：</div>
        <div>
          <el-select size="small" v-model="unit" placeholder="请选择">
            <el-option
              v-for="(item, idx) in units"
              :key="idx"
              :label="item.deviceName"
              :value="item.deviceCode"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div style="margin-left: 20px">
      <el-button type="primary" size="mini" @click="onCheck">查询</el-button>
    </div>
  </div>
</template>
<script>
import { getPlants } from "@/api/report/extraWrite.js";
import { getUnit } from "@/api/common.js";
import { toObj, toJSON } from "@/util/util";
export default {
  props: {
    selectArear: Function, // 区域
    selectPlant: Function, // 电厂
    year: {
      type: String,
      default: "",
    },
    month: "",
  },
  data() {
    return {
      plants: [], // 项目
      units: [],
      unit: "",
      plantCode: "",
      plantValue: "",
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    month(value) {
      this.init();
    },
  },
  methods: {
    init() {
      this.plantValue = "";
      this.unit = "";
      getPlants({
        year: this.year,
        month: this.month,
      }).then((response) => {
        let {
          data,
          data: { code, data: res },
        } = response;
        let arry = res.map((item, idx) => {
          return {
            value: toJSON(item),
            label: item.plantName,
          };
        });
        this.plants = arry;
      });
    },
    changePlant(value) {
      value = toObj(value);
      this.unit = "";
      let query = value.deptId;
      this.plantCode = value.plantCode;
      getUnit(query).then((res) => {
        this.units = res.data.data;
      });
    },
    onCheck() {
      this.$emit("onCheck", {
        plant: this.plantCode,
        unit: this.unit,
        area: this.areaCode,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.margin {
  margin-left: 20px;
}
</style>
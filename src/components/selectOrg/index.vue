<template>
  <div class="selectOrg clearfix">
    <div class="item" :style="itemWidth" v-if="showArea">
      <div class="grid-content bg-purple">
        <div>区域/公司：</div>
        <div>
          <el-select
            size="small"
            v-model="areaValue"
            placeholder="请选择"
            @change="changeArea"
            :disabled="disableArea"
          >
            <el-option
              v-for="(item, idx) in area"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="item" :style="itemWidth" v-if="showPlant">
      <div class="grid-content bg-purple">
        <div>项目：</div>
        <div>
          <el-select
            @change="changePlant"
            size="small"
            v-model="plantValue"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, idx) in plant"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="item" :style="itemWidth" v-if="showUnit">
      <div class="grid-content bg-purple">
        <div>机组：</div>
        <div>
          <el-select
            @change="changeUnit"
            size="small"
            v-model="unitValue"
            placeholder="请选择"
          >
            <!-- <el-option v-if="showGy" :label="'公用'" :value="null"></el-option> -->
            <el-option
              v-for="(item, idx) in unit"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="item" :style="itemWidth" v-if="showDevice">
      <div class="grid-content bg-purple">
        <div>装置：</div>
        <div>
          <el-select
            @change="changeDevice"
            size="small"
            v-model="deviceValue"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, idx) in device"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="item" :style="itemWidth" v-if="showSystem">
      <div class="grid-content bg-purple">
        <div>系统：</div>
        <div>
          <el-select
            @change="changeSystem"
            size="small"
            v-model="systemValue"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, idx) in system"
              :key="idx"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaAndPlant, getUnit, checkDict } from "@/api/common";
import _ from "lodash";
import { toObj, toJSON } from "@/util/util";
export default {
  props: {
    selectArear: Function, // 区域
    selectPlant: Function, // 电厂
    selectUnit: Function, // 机组
    selectDevice: Function, // 装置
    selectSystem: Function, // 系统

    // reset: {
    //   type: Boolean,
    //   default: false
    // },
    disableArea: {
      type: Boolean,
      default: false,
    },
    showGy: {
      type: Boolean,
      default: false,
    },
    showArea: {
      type: Boolean,
      default: true,
    },
    showSystem: {
      type: Boolean,
      default: true,
    },
    showPlant: {
      type: Boolean,
      default: true,
    },
    showUnit: {
      type: Boolean,
      default: true,
    },
    showDevice: {
      type: Boolean,
      default: true,
    },
    showAll: {
      type: Boolean,
      default: true,
    },
    showDeviceAll: {
      type: Boolean,
      default: true,
    },
    hasAuthority: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      area: [],
      plant: [], // 项目
      unit: [], // 机组
      // 装置
      device: [
        // {
        //   value: -1,
        //   label: "全部"
        // },
        {
          value: "tlsys_code",
          label: "脱硫",
        },
        {
          value: "txsys_code",
          label: "脱硝",
        },
        {
          value: "ccsys_code",
          label: "除尘",
        },
      ],
      system: [], //系统
      areaValue: "",
      plantValue: "",
      unitValue: "",
      deviceValue: "",
      systemValue: "",
      itemWidth: "width:20%",
    };
  },
  components: {},
  computed: {
    // setReset() {
    //   return this.reset;
    // }
  },
  created() {},
  mounted() {
    this.mathWidth();
    // 显示设备全部
    if (!this.showDeviceAll && this.device[0].label == "全部") {
      this.device.shift();
    }
    // 0 无权限 1 有权限
    getAreaAndPlant(this.hasAuthority, 1).then((response) => {
      let {
        data,
        data: { code, data: res },
      } = response;
      let arry = res.map((item, idx) => {
        return {
          value: toJSON(item),
          label: item.name,
        };
      });
      if (!this.showAll) {
        arry.unshift({
          label: "全部区域",
          value: JSON.stringify({
            deptId: "1",
            deptCode: "all",
          }),
        });
      }
      this.area = arry;
    });
  },
  watch: {
    // setReset(value) {
    //   value && this.reset1();
    // }
  },
  updated() {
    this.reset = false;
  },
  methods: {
    // 计算宽度
    mathWidth() {
      let arry, len, width;
      let { showArea, showSystem, showPlant, showDevice, showUnit } = this;
      arry = [showArea, showSystem, showPlant, showDevice, showUnit];
      _.pull(arry, false);
      len = arry.length;
      width = (100 / len).toFixed(6);
      this.itemWidth = `width:${width}%`;
    },
    changeArea(value) { 
      value = toObj(value);
      let reset = (value) => {
        this.plantValue = "";
        this.unitValue = "";
        this.deviceValue = "";
        this.systemValue = "";
        this.$emit("selectArear", value);
      };
      if (value.deptCode == "all") {
        this.plant = [
          {
            value: JSON.stringify({
              deptId: "1",
              deptCode: "",
            }),
            label: "全部",
          },
        ];
        reset(value);
        return false;
      }
      if (!this.showPlant) {
        reset(value);
        return false;
      }
      getAreaAndPlant(this.hasAuthority, value.deptId)
        .then((response) => {
          let {
            data,
            data: { code, data: res },
          } = response;
          this.plant = res.map((item, idx) => {
            return {
              value: toJSON(item),
              label: item.name,
            };
          });
        })
        .then(() => {
          reset(value);
        });
    },
    changePlant(value) {
      value = toObj(value);
      let reset = (value) => {
        this.unitValue = "";
        this.deviceValue = "";
        this.systemValue = "";
        this.$emit("selectPlant", value);
      };
      if (value == "all") {
        this.unit = [
          {
            value: "all",
            label: "全部",
          },
        ];
        reset(value);
        return false;
      }
      if (!this.showUnit) {
        reset(value);
        return false;
      }
      getUnit(value.deptId)
        .then((response) => {
          let {
            data,
            data: { code, data: res },
          } = response;
          this.unit = res.map((item, idx) => {
            return {
              value: toJSON(item),
              label: item.deviceName,
            };
          });
          if (this.showGy) {
            this.unit.unshift({
              value: null,
              label: "公用",
            });
          }
        })
        .then(() => {
          reset(value);
        });
    },
    changeUnit(value) {
      if (!value) {
        value = {
          deviceCode: null,
          deviceName: "公用",
        };
      } else {
        value = toObj(value);
      }
      this.deviceValue = "";
      this.systemValue = "";
      this.$emit("selectUnit", value);
    },
    changeDevice(value) {
      let reset = (value) => {
        this.systemValue = "";
        this.$emit("selectDevice", value);
      };
      if (value == "all") {
        this.system = [
          {
            value: "all",
            label: "全部",
          },
        ];
        reset(value);
        return false;
      }
      if (!this.showSystem) {
        reset(value);
        return false;
      }
      checkDict(value)
        .then((response) => {
          let {
            data,
            data: { code, data: res },
          } = response;
          this.system = res.map((item) => {
            return {
              value: toJSON(item),
              label: item.label,
            };
          });
        })
        .then(() => {
          reset(value);
        });
    },
    changeSystem(value) {
      this.$emit("selectSystem", toObj(value));
    },
    reset1() {
      // this.area = [];
      this.plant = [];
      this.unit = [];
      this.system = [];
      this.areaValue = "";
      this.plantValue = "";
      this.unitValue = "";
      this.deviceValue = "";
      this.systemValue = "";
    },
  },
};
</script>

<style scoped lang="scss">
.selectOrg {
  height: 42px;
  margin-left: -10px;
  .item {
    width: 20%;
    float: left;
    padding-left: 0;
    height: 100%;
    & > .btn__div {
      text-align: right;
    }
    & > div {
      height: 42px;
      line-height: 42px;
      display: table;
      width: 100%;

      & > div:nth-child(1) {
        display: table-cell;
        width: 0.1%;
        min-width: 90px;
        // height: 72px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.84);
        line-height: 12px;
        text-align: right;
      }
      & > div:nth-child(2) {
        display: table-cell;
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    height: 100%;
    & > .btn__div {
      text-align: right;
    }
    & > div {
      height: 42px;
      line-height: 42px;
      display: table;
      width: 100%;

      & > div:nth-child(1) {
        display: table-cell;
        width: 0.1%;
        width: 90px;
        // height: 72px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.84);
        line-height: 12px;
        text-align: right;
      }
      & > div:nth-child(2) {
        display: table-cell;
      }
    }
  }
}
</style>

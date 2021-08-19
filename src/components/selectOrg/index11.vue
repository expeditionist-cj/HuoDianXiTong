<template>
  <div class="mycascader">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click"
      v-model="visible"
    >
      <div>
        {{ areaCurrentName }}{{ plantCurrentName && "/" + plantCurrentName
        }}{{ unitCurrentName && "/" + unitCurrentName
        }}{{ sysCurrentName && "/" + sysCurrentName }}
      </div>
      <el-tabs @tab-click="onTab" :value="tabValue">
        <el-tab-pane label="区域" v-if="showArea" lazy>
          <el-radio-group v-model="selArea">
            <el-radio
              style="margin-bottom: 10px"
              @change="onArea(item.name, item.deptCode)"
              :label="item.deptId"
              v-for="item in area"
              :key="item.deptId"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="项目" v-if="showPlant" lazy>
          <div v-if="!selArea">请先选择区域</div>
          <el-radio-group v-else v-model="selPlant">
            <el-radio
              style="margin-bottom: 10px"
              @change="onPlant(item.name, item.deptCode, item.type)"
              :label="item.deptId"
              v-for="item in plant"
              :key="item.deptId"
              :disabled="tlOrTx == 'A' ? false : item.type.indexOf(tlOrTx) < 0"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="机组" v-if="showUnit" lazy>
          <div v-if="!selPlant">请先选择项目</div>
          <el-radio-group v-else v-model="selUnit">
            <el-radio
              style="margin-bottom: 10px"
              @change="
                onUnit(
                  item.deviceName,
                  unitIsDeviceId ? item.deviceCode : item.deviceId
                )
              "
              :label="item.deviceId"
              v-for="item in unit"
              :key="item.deviceId"
              >{{ item.deviceName }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="装置" v-if="showSys">
          <div v-if="!selUnit">请先选择机组</div>
          <el-radio-group v-else v-model="selSys">
            <el-radio
              style="margin-bottom: 10px"
              @change="onSys(item.name, item.label)"
              :label="item.label"
              v-for="item in sys"
              :key="item.label"
              :disabled="item.isDisable"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>

      <div style="text-align: right; margin-top: 10px">
        <el-button size="mini" type="text" @click="visible = !visible"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="onOk">确定</el-button>
      </div>

      <el-button
        plain
        slot="reference"
        @click="visible = !visible"
        size="small"
      >
        {{
          $store.state.writeData.selectOptions.areaName
            ? $store.state.writeData.selectOptions.plantName
              ? $store.state.writeData.selectOptions.areaName +
                "/" +
                $store.state.writeData.selectOptions.plantName
              : $store.state.writeData.selectOptions.areaName
            : "" || "请选择"
        }}
        <i
          :class="
            visible
              ? 'el-icon-arrow-up el-icon--right'
              : 'el-icon-arrow-down el-icon--right'
          "
        ></i>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import { getAreaAndPlant, getUnit } from "@/api/common.js";
export default {
  props: {
    tlOrTx: {
      type: String,
      default: "A",
    },
    showArea: {
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
    showSys: {
      type: Boolean,
      default: true,
    },
    showAll: {
      type: Boolean,
      default: true,
    },
    hasAuthority: {
      type: Number,
      default: 1,
    },
    unitIsDeviceId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: true,
      visible: false,
      area: [],
      plant: [],
      unit: [],
      sys: [
        {
          name: "脱硫",
          label: "S",
          isDisable: false,
        },
        {
          name: "脱硝",
          label: "N",
          isDisable: false,
        },
        {
          name: "除尘",
          label: "D",
          isDisable: false,
        },
      ],
      selArea: "",
      selPlant: "",
      selUnit: "",
      selSys: "",
      tabValue: "0",
      areaCurrentName: "",
      plantCurrentName: "",
      unitCurrentName: "",
      sysCurrentName: "",
      selResult: {},
      selResultName: "",
      defAreaName: "",
      defPlantName: "",
    };
  },
  created() {
    this.defAreaName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.regionName;
    this.defPlantName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.projectName;
    let rcode = JSON.parse(sessionStorage.getItem("user")).user.regionCode;
    let pcode = JSON.parse(sessionStorage.getItem("user")).user.projectCode;

    this.$store.commit("SET_SELECTOPTIONS", {
      area: rcode,
      plant: pcode,
      areaName: this.defAreaName,
      plantName: this.defPlantName,
    });
    let params = this.$store.state.writeData.selectOptions;
    if (this.defPlantName) {
      this.selResultName = params.areaName + "/" + params.plantName;
    } else {
      this.selResultName = "";
    }
  },
  mounted() {
    this.findPlantOrArea(1).then((res) => {
      if (this.showAll) {
        res.unshift({
          name: "全部区域",
          deptId: "1",
          deptCode: "all",
        });
      }
      this.area = res;
      // this.selArea = res[0].deptId;
      // this.areaCurrentName = res[0].name;
      // return this.selArea;
    });
    // .then(res => {
    //   res != 1 &&
    //     this.findPlantOrArea(res)
    //       .then(result => {
    //         this.plant = result;
    //         this.selPlant = result[0].deptId;
    //         this.plantCurrentName = result[0].name;
    //         return this.plant
    //       })
    //       .then(() => {
    //         this.selResultName =
    //           this.areaCurrentName +
    //           (this.plantCurrentName && "/" + this.plantCurrentName) +
    //           (this.unitCurrentName && "/" + this.unitCurrentName) +
    //           (this.sysCurrentName && "/" + this.sysCurrentName);
    //       });
    // });
  },
  watch: {
    selArea(val) {
      this.plant = [];
      this.unit = [];
      this.plantCurrentName = "";
      this.unitCurrentName = "";
      this.sysCurrentName = "";
      if (val == "1") {
        this.tabValue = "0";
        return;
      }
      if (this.showPlant) {
        this.tabValue = "1";
        val &&
          this.findPlantOrArea(this.selArea).then((res) => {
            this.plant = res;
          });
      }
      //  else {
      //   this.tabValue = "0";
      // }
    },
    selPlant(val) {
      this.unit = [];
      this.unitCurrentName = "";
      this.sysCurrentName = "";
      if (this.showUnit) {
        this.tabValue = "2";
        val &&
          this.findUnitByPlant(this.selPlant).then((res) => {
            this.unit = res;
          });
      }
      this.$emit("plantCode", this.selPlant);
    },
    selUnit(val) {
      this.selSys = "";
      this.sysCurrentName = "";
      if (this.showSys) {
        this.tabValue = "3";
      }
      // this.$emit("selUnitCnName",)
      // else {
      //   this.tabValue = "2";
      // }
    },
  },
  methods: {
    onTab(tab) {
      let tabName = tab.label;
      if (tabName == "区域") {
        this.tabValue = "0";
        this.selPlant = "";
        this.selUnit = "";
        this.selSys = "";
      } else if (tabName == "项目") {
        this.tabValue = "1";
        this.selUnit = "";
        this.selSys = "";
      } else if (tabName == "机组") {
        this.tabValue = "2";
        this.selSys = "";
      } else if (tabName == "装置") {
        this.tabValue = "3";
      }
    },
    // 根据区域选择电厂
    findPlantOrArea(deptId) {
      return getAreaAndPlant(this.hasAuthority, deptId).then((res) => {
        let data = res.data.data;
        return data;
      });
    },
    // 根据电厂选择机组
    findUnitByPlant(deptId) {
      return getUnit(deptId).then((res) => {
        let data = res.data.data;
        return data;
      });
    },
    onOk() {
      this.selResultName =
        this.areaCurrentName +
        (this.plantCurrentName && "/" + this.plantCurrentName) +
        (this.unitCurrentName && "/" + this.unitCurrentName) +
        (this.sysCurrentName && "/" + this.sysCurrentName);
      this.selResult.name = this.selResultName;
      this.visible = !this.visible;
      this.tabValue = "0";
      let areaName = this.selResultName.split("/")[0];
      let plantName = this.selResultName.split("/")[1];
      this.$store.commit("SET_SELECTOPTIONS", {
        area: this.selResult.area,
        plant: this.selResult.plant,
        areaName,
        plantName,
        // type: this.selResult.type
      });
      this.$emit("onMyCascader", this.selResult);
      this.$emit("selUnitCnName", this.unitCurrentName);
      this.$emit("selPlantCnName", this.plantCurrentName);
    },
    onArea(name, code) {
      this.areaCurrentName = name;
      this.selResult.area = code;
      delete this.selResult.plant;
      delete this.selResult.unit;
      delete this.selResult.sys;
    },
    onPlant(name, code, type) {
      this.plantCurrentName = name;
      this.selResult.plant = code;
      // this.selResult.type = type;
      delete this.selResult.unit;
      delete this.selResult.sys;
      this.sys.forEach((ele) => {
        if (type.indexOf(ele.label) > -1) {
          ele.isDisable = false;
        } else {
          ele.isDisable = true;
        }
      });
    },
    onUnit(name, code) {
      this.unitCurrentName = name;
      this.selResult.unit = code;
      delete this.selResult.sys;
    },
    onSys(name, code) {
      this.sysCurrentName = name;
      this.selResult.sys = code;
    },
  },
  destroyed() {},
};
</script>

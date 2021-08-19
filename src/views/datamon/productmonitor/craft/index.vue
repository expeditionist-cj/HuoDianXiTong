<template>
  <div class="craft">
    <CardLayout :cardStyles="style">
      <div class="craft__wrap">
        <div class="craft__tool">
          <!-- 组织机构选择 -->
          <div class="craft__radio">
            <div class="craft__title">区域：</div>
            <el-radio-group
              class="craft__radio"
              @change="selectArear"
              v-model="area"
              size="small"
            >
              <el-radio-button
                v-for="(item, index) in areaOptions"
                :key="index"
                :label="item.code"
                >{{ item.cn.slice(0, 2) }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="craft__radio">
            <div class="craft__title">电厂：</div>
            <el-radio-group
              class="craft__radio"
              @change="selectPlant"
              v-model="plant"
              size="small"
            >
              <el-radio-button
                v-for="(item, index) in plantOptions"
                :key="index"
                :label="item.code"
                >{{ item.cn }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <!-- 机组 -->
          <div class="craft__radio">
            <div class="craft__title">机组：</div>
            <el-radio-group
              class="craft__radio"
              @change="selectUnit"
              v-model="unit"
              size="small"
            >
              <el-radio-button
                v-for="(item, index) in unitOptions"
                :key="index"
                :label="item.code"
                >{{ item.cn }}</el-radio-button
              >
              <el-radio-button size="small" :label="codes">公用</el-radio-button>
            </el-radio-group>
            
          </div>
          <div class="craft__radio">
            <div class="craft__title">系统：</div>
            <el-radio-group
              class="craft__radio"
              @change="selectSystem"
              v-model="system"
              size="small"
            >
              <el-radio-button
                v-for="(item, index) in systemOptions"
                :key="index"
                :label="item.code"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>

        <!-- 工艺流程图 -->
        <div class="craft__content">
          <div class="nodata" style="height: 100%" v-if="showCraft">
            <div style="text-align: center">
              <img
                src="../../../../../public/images/nocanvas.png"
                width="60%"
                alt=""
              />
              <div>暂无工艺流程图</div>
            </div>
          </div>
          <div style="height: 100%" v-else>
            <OneCraft :iframeSrc="oneCraftSrc" v-if="displayCraft == 1" />
            <MultipleCraft :srcList="srcList" v-else />
          </div>
        </div>

        <div class="craft__foot" v-if="!showCraft">
          <el-radio-group
            class="craft__radio"
            @change="selectDevice"
            v-model="device"
            size="small"
          >
            <el-radio-button
              v-for="(item, index) in deviceOptions"
              :key="index"
              :label="item.fn"
              >{{ item.name }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </CardLayout>
  </div>
</template>

<script>
import CardLayout from "@/components/cardLayout/index";
import MultipleCraft from "./multipleCraft";
import OneCraft from "./oneCraft";
import { getCraft, getProcessFlowChart } from "@/api/datamon/productmonitor";
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import { craftUrl } from "@/config/env.js";
export default {
  name: "productmonitor",
  props: {},
  data() {
    return {
      codes: "00",
      area: "",
      areaOptions: [],
      plant: "",
      plantOptions: [],
      unit: "",
      unitOptions: [],
      system: "S",
      systemOptions: [
        {
          name: "脱硫",
          code: "S",
        },
        {
          name: "脱硝",
          code: "N",
        },
        {
          name: "除尘",
          code: "D",
        },
      ],
      device: "",
      deviceOptions: [],
      showCraft: false,
      reset: false,
      data: "this is craft",
      // style: "height: calc(100% - 48px);",
      style: "height: 100%;min-height: 1000px;",
      displayCraft: 1,
      srcList: [],
      fetchAlarmTableDataQuery: {},
      craft__foot: {
        size: 1,
        current: 1,
      },
      total: 0,
      currentcraft__foot: 1,
      oneCraftSrc: "",
      multipleCraftSrc: "",
      query: {
        deptId: 1,
      },
    };
  },
  components: {
    CardLayout,
    MultipleCraft,
    OneCraft,
    SelOrg,
    BtnList,
  },
  computed: {},
  created() {
    this.query.deptId = JSON.parse(sessionStorage.getItem("user")).user.dept_id;
  },
  mounted() {
    this.getCraftRequirement(this.query);
  },
  watch: {},
  methods: {
    getCraftRequirement(query) {
      getCraft(query).then((res) => {
        let data = res.data.data;
        data.forEach((ele) => {});
        this.areaOptions = data;
        this.area = data[0].code;
        this.plantOptions = data[0].children;
        this.plant = data[0].children[0].code;
        this.unitOptions = data[0].children[0].children;
        this.unit = data[0].children[0].children[0].code;
        this.fetchAlarmTableDataQuery = {
          plant: this.plant,
          unit: data[0].children[0].children[0].code.slice(0,1),
          sys: this.system,
        };
        this.getChart(this.fetchAlarmTableDataQuery);
      });
    },
    getChart(query) {
      getProcessFlowChart(query).then((res) => { 
        let data = res.data;
        if (data.length > 0) {
          this.showCraft = false;
          this.deviceOptions = data;
          this.device = data[0].fn;
          this.oneCraftSrc = craftUrl(this.device);
        } else {
          this.showCraft = true;
        }
      });
    },
    selectArear(data) {
      let options = this.areaOptions;
      options.forEach((item, index) => {
        if (data == item.code) {
          this.plantOptions = item.children;
          this.plant = item.children[0].code;
          this.fetchAlarmTableDataQuery.plant = this.plant;
          this.getChart(this.fetchAlarmTableDataQuery);
        }
      });
    },
    selectPlant(data) {
      let options = this.plantOptions;
      options.forEach((item, index) => {
        if (data == item.code) {
          this.unitOptions = item.children;
          this.unit = item.children[0].code;
          this.fetchAlarmTableDataQuery.plant = data;
          this.fetchAlarmTableDataQuery.unit = item.children[0].code.slice(0,1);
          this.getChart(this.fetchAlarmTableDataQuery);
        }
      });
    },
    selectUnit(data) {
      this.fetchAlarmTableDataQuery.unit = data.slice(0,1);
      this.getChart(this.fetchAlarmTableDataQuery);
    },
    selectSystem(data) {
      this.fetchAlarmTableDataQuery.sys = data;
      this.getChart(this.fetchAlarmTableDataQuery);
    },
    selectDevice(data) {
      this.oneCraftSrc = craftUrl(data);
    },
  },
};
</script>
<style lang="scss">
.craft__tool {
  display: flex;
  flex-wrap: wrap;

  .craft__title {
    width: 42px;
  }
  .craft__radio {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 0 20px 5px 0;
  }

  .el-select-dropdown {
    top: 166px !important;
  }
}
</style>
<style scoped lang="scss">
.craft {
  height: 100%;
  padding: 0 10px;
  .craft__wrap {
    height: 100%;
    padding: 0 32px;
  }
  .craft__tool {
    // min-height: 72px;
    padding-top: 20px;
    // margin-bottom: 16px;
  }
  .craft__content {
    height: 80%;
    .nodata {
      display: flex;

      & > div {
        margin: auto;
        font-size: 16px;
        color: gray;
      }
    }
  }
  .craft__foot {
    // height: 72px;

    text-align: left;
    padding: 16px 0;
    // margin-bottom: 5px;
    // margin-right: -10px;
  }
}
</style>


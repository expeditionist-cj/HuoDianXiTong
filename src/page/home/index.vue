<template>
  <div class="wel">
    <CardLayout
      cardStyles="height: calc(100% - 48px);min-height: 760px;background:none;box-shadow:none;"
    >
      <ul class="wel__up clearfix">
        <li class="fl">
          <Mycard>
            <div slot="header" class>综合数据</div>
            <ul slot="content" class="height100 clearfix wel__up-content">
              <li class="fl height100">
                <v-chart autoresize :options="mapConfig" />
              </li>
              <li class="fl">
                <MyList :data="listData" />
              </li>
            </ul>
          </Mycard>
        </li>
        <li class="fl">
          <div class="wel__up__right__up">
            <Mycard>
              <div slot="header" class>当月发电量统计</div>
              <div slot="content" class="height100">
                <v-chart autoresize :options="powerPie" />
              </div>
            </Mycard>
          </div>
          <div class="wel__up__right__down">
            <Mycard>
              <div slot="header" class>当月上网电量统计</div>
              <div slot="content" class="height100">
                <v-chart autoresize :options="netPie" />
              </div>
            </Mycard>
          </div>
        </li>
      </ul>
      <ul class="wel__down clearfix">
        <li class="fl wel__down__lelf">
          <Mycard>
            <div slot="header" class>
              <span>减排统计</span>
              <MyTab
                style="float:right;margin:0px 0;"
                :tabsList="['SO2','NOx','除尘']"
                @clickItem="SwitchEmission"
              />
            </div>
            <div slot="content" class="height100">
              <ul class="clearfix height100">
                <li class="fl height100" style="width:60%">
                  <v-chart autoresize :options="emissionBar" />
                </li>
                <li class="fl height100" style="width:40%">
                  <v-chart autoresize :options="emissionRadar" />
                </li>
              </ul>
            </div>
          </Mycard>
        </li>
        <li class="fl wel__down__right">
          <Mycard>
            <div slot="header" class>
              <span>能耗与物耗统计</span>
              <div style="float:right">
                <MyTab
                  style="margin:0px 40px 16px 0;display:inline-block;"
                  :tabsList="['电能','吸收剂','还原剂']"
                  @clickItem="SwitchConsumptionType"
                />
                <MyTab
                  style="margin:0px 0;float:right"
                  :tabsList="['发电量','减排量']"
                  @clickItem="SwitchConsumptionCaliber"
                />
              </div>
            </div>
            <div slot="content" class="height100">
              <ul class="clearfix height100">
                <li class="fl height100" style="width:60%">
                  <v-chart autoresize :options="consumptionBar" />
                </li>
                <li class="fl height100" style="width:40%">
                  <v-chart autoresize :options="consumptionRadar" />
                </li>
              </ul>
            </div>
          </Mycard>
        </li>
      </ul>
    </CardLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import request from "@/router/axios";
import CardLayout from "@/components/cardLayout/index";
import Mycard from "@/components/mycard/mycard";
import MyTab from "./tabs";
import {
  radarData,
  barData,
  pieTip,
  pieData,
  pieConfig,
  barConfig,
  radarConfig,
  mapConfig
} from "./chartConfig";
import { RandomArray, createArray } from "@/util/util";
import MyList from "./list";
import { get_gen_cap, getEmis, getBaseData, getCons } from "../../api/home";
import {
  get_XY_data,
  formatterRadarData,
  formatterMap_key,
  formatterBase,
  formatterRadarDataCons
} from "./util";
import _ from "lodash";
import { map_map } from "../../dict/index";
const tipFun = res => {
  let name = res.name;
  if (map_map[name]) {
    let {
      name,
      data: {
        value: { area, capacity, start, end, load, gen }
      }
    } = res;
    return `
      <div>${area}</div>
      <div>总负荷(WM)：${load || "暂无数据"}</div>
      <div>当日发电量(万KWh)：${gen || "暂无数据"}</div>
      <div>运行机组(台)：${start || "暂无数据"}</div>
      <div>停运机组(台)：${end || "暂无数据"}</div>
      <div>装机容量(MW)：${capacity || "暂无数据"}</div>
    `;
  } else {
    return null;
  }
};
export default {
  name: "wel",
  data() {
    return {
      // 地图
      mapConfig: mapConfig(),
      // 当月发电量统计图表配置
      powerPie: pieConfig({
        name: "当月发电量统计",
        tipFun: res => {},
        data: [
          {
            value: 0,
            name: "脱硫装置",
            itemStyle: {
              color: "#54CBCC"
            }
          },
          {
            value: 0,
            name: "脱硝装置",
            itemStyle: {
              color: "#3AA0FF"
            }
          },
          {
            value: 0,
            name: "除尘装置",
            itemStyle: {
              color: "#61CB6E"
            }
          }
        ]
      }),
      // 当月上网电量图表配置
      netPie: pieConfig({
        name: "当月上网电量",
        tipFun: res => {},
        data: [
          {
            value: 0,
            name: "脱硫装置",
            itemStyle: {
              color: "#54CBCC"
            }
          },
          {
            value: 0,
            name: "脱硝装置",
            itemStyle: {
              color: "#3AA0FF"
            }
          },
          {
            value: 0,
            name: "除尘装置",
            itemStyle: {
              color: "#61CB6E"
            }
          }
        ]
      }),
      // 减排统计柱状图配置
      emissionBar: barConfig({
        color: ["#E3E4EC", "#0082FF"],
        xData: [],
        text: "月度历史同期对比",
        seriesData: [
          {
            name: "历史同期",
            type: "bar",
            barGap: 0,
            data: []
          },
          {
            name: "当前",
            type: "bar",
            barGap: 0,
            data: []
          }
        ]
      }),
      //能耗与物耗统计柱状图配置
      consumptionBar: barConfig({
        color: ["#E3E4EC", "#0082FF"],
        xData: [],
        text: "月度历史同期对比",
        seriesData: [
          {
            name: "历史同期",
            type: "bar",
            barGap: 0,
            data: []
          },
          {
            name: "当前",
            type: "bar",
            barGap: 0,
            data: []
          }
        ]
      }),
      // 各区域当月减排量对比 雷达图配置
      emissionRadar: radarConfig({
        text: "各区域当月减排量对比",
        indicator: [
          { text: "东北" },
          { text: "内蒙" },
          { text: "河南" },
          { text: "江西" },
          { text: "西北" }
        ],
        data: []
      }),
      consumptionRadar: radarConfig({
        text: "各区域当月消耗对比",
        indicator: [
          { text: "东北" },
          { text: "内蒙" },
          { text: "河南" },
          { text: "江西" },
          { text: "西北" }
        ],
        data: []
      }),
      listData: [
        {
          name: "装机容 (MW)",
          value: "0"
        },
        {
          name: "当前负荷 (MW)",
          value: "0",
          type: "capacity"
        },
        {
          name: "当日发电量 (万KWh)",
          value: "0",
          type: "capacity"
        },
        {
          name: "运行机组 (台)",
          value: "0",
          type: "capacity"
        },
        {
          name: "停运机组 (台)",
          value: "0",
          type: "capacity"
        }
      ],
      emi_type: "S", // 减排统计
      query: {
        type: "power",
        caliber: "ele"
      } //能耗物耗统计
    };
  },
  components: {
    CardLayout,
    Mycard,
    MyTab,
    MyList
  },
  computed: {
    ...mapGetters(["website"])
  },
  mounted() {
    this.init(this.emi_type,this.query);
  },
  methods: {
    // 初始化加载
    init(type,query) {
      // 发电量和上网电量
      get_gen_cap().then(res => {
        let data = res.data.data;
        let { gen, ele } = data;
        // gen:上网电量,ele：发电量
        this.powerPie = pieConfig({
          name: "当月发电量统计",
          tipFun: res => {
            return pieTip(res.data.data);
          },
          data: pieData(ele)
        });
        this.netPie = pieConfig({
          name: "当月上网电量",
          tipFun: res => {
            return pieTip(res.data.data);
          },
          data: pieData(gen)
        });
      });
      // 减排统计
      this.getEmis(type);
      // 能耗物耗统计
      this.getCons(query);
      // // 基础数据
      getBaseData().then(res => {
        let data = res.data.data;
        let obj = {};
        let mapObj = {};
        _.forOwn(data, (value, key) => {
          if (typeof value != "object") {
            obj[key] = value;
          } else {
            mapObj[key] = value;
          }
        });
        this.listData = formatterBase(obj);
        let a = formatterMap_key(mapObj.capacityMaps, "capacity");
        let b = formatterMap_key(mapObj.currentGenerationMaps, "value", "gen");
        let c = formatterMap_key(mapObj.loadMaps, "val", "load");
        let d = formatterMap_key(mapObj.startNumMaps, "num", "start");
        let e = formatterMap_key(mapObj.stopNumMaps, "num", "end");
        let merge_obj = _.merge(a, b, c, d, e);
        this.mapConfig = mapConfig({
          data: merge_obj,
          tipFun
        });
      });
    },
    // 切换减排统计
    SwitchEmission(item) {
      switch (item) {
        case "SO2":
          this.emi_type = "S";
          break;
        case "NOx":
          this.emi_type = "N";
          break;
        default:
          this.emi_type = "D";
          break;
      }
      this.getEmis(this.emi_type);
    },
    // 切换能耗于物耗统计
    SwitchConsumptionType(item) {
      switch (item) {
        case "电能":
          this.query.type = "power";
          break;
        case "吸收剂":
          this.query.type = "dope";
          break;
        default:
          this.query.type = "deo";
          break;
      }
      this.getCons(this.query);
    },
    SwitchConsumptionCaliber(item) {
      switch (item) {
        case "发电量":
          this.query.caliber = "ele";
          break;
        default:
          this.query.caliber = "emi";
          break;
      }
      this.getCons(this.query);
    },
    // 渲染减排统计
    getEmis(type) {
      getEmis({ type }).then(res => {
        let data = res.data.data;
        let { nowma, beforema, orgcodeData } = data;
        let {
          x,
          y: { now, before }
        } = { x: [], y: { now: [], before: [] } };
        x = get_XY_data(nowma).x;
        now = get_XY_data(nowma).y;
        before = get_XY_data(beforema).y;
        this.emissionBar = barConfig(barData({ x, y: { now, before } }));
        this.emissionRadar = radarConfig({
          text: "各区域当月减排量对比",
          indicator: formatterRadarData(orgcodeData).indicator,
          data: formatterRadarData(orgcodeData).data
        });
      });
    },
    // 渲染能耗物耗统计
    getCons(query) {
      getCons(query).then(res => {
        let data = res.data.data;
        let nowma=data.now;
        let beforema=data.before;
        let orgcodeData=data.orgcodeData;
        let {
          x,
          y: { now, before }
        } = { x: [], y: { now: [], before: [] } };
        x = get_XY_data(nowma).x;
        now = get_XY_data(nowma).y;
        before = get_XY_data(beforema).y;
        this.consumptionBar = barConfig(barData({ x, y: { now, before } }));
        this.consumptionRadar = radarConfig({
          text: "各区域当月消耗对比",
          indicator: formatterRadarDataCons(orgcodeData).indicator,
          data: formatterRadarDataCons(orgcodeData).data
        });
      });
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.wel {
  height: 100%;
  padding: 0 10px;
  .height100 {
    height: 100%;
  }
  .wel__up {
    height: calc(calc(100% - 16px) * 0.68);
    margin-bottom: 16px;
    & > li:nth-child(1) {
      width: calc(calc(100% - 16px) * 0.69);
      height: 100%;
      margin-right: 16px;
    }
    & > li:nth-child(2) {
      width: calc(calc(100% - 16px) * 0.31);
      height: 100%;
      & > div {
        height: calc(calc(100% - 16px) / 2);
      }
      & > div:first-child {
        margin-bottom: 16px;
      }
    }
    .wel__up-content {
      padding-right: 0px;
      & > li:nth-child(1) {
        width: calc(100% - 262px);
        height: 100%;
      }
      & > li:nth-child(2) {
        width: 262px;
        height: 100%;
        padding: 30px 0 46px 47px;
      }
    }
  }
  .wel__down {
    height: calc(calc(100% - 16px) * 0.32);
    & > li {
      width: calc(calc(100% - 16px) / 2);
      height: 100%;
    }
    & > li:nth-child(1) {
      margin-right: 16px;
    }
  }
}
</style>
<style lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>

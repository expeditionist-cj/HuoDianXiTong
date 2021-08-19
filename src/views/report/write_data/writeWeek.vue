<template>
  <div class="container" ref="write_data">
    <div class="div__tool-wrap">
      <div class="select__wrap">
        <div>选择时间：</div>
        <div>
          <el-date-picker
            v-model="time"
            align="right"
            type="month"
            placeholder="选择日期"
            size="small"
            :clearable="false"
            :editable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div style="margin-left: 20px; display: flex; align-items: center">
        <span>区域/项目：</span>
        <cascade
          @onMyCascader="onMyCascader"
          :showAll="false"
          :showUnit="false"
          :showSys="false"
        ></cascade>
      </div>

      <!--  脱硫脱硝 -->
      <div style="margin-left: 20px">
        <!-- <div style="width:70px;margin-left:20px;">装置：</div> -->
        <el-radio-group v-model="device" @change="changeDevice">
          <el-radio label="tl">脱硫</el-radio>
          <el-radio label="tx">脱硝</el-radio>
        </el-radio-group>
      </div>
      <BtnList
        style="margin-right: 10px"
        :showRest="false"
        btnStyle="textAlign:left;margin-left:32px"
        @check="checkWeek"
      />
      <!-- <div style="color: red; font-size: 15px; text-align: left">
        {{ notice }}
      </div> -->
    </div>
    <HotTable
      v-show="showTl"
      v-loading="$store.state.writeData.loading"
      ref="hotTableTl"
      :height="height"
      :settings="hotSettingsTl"
    ></HotTable>
    <HotTable
      v-show="!showTl"
      v-loading="$store.state.writeData.loading"
      ref="hotTableTx"
      :height="height"
      :settings="hotSettingsTx"
    ></HotTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import cascade from "@/components/selectOrg/index11.vue";
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import moment from "moment";
import {
  getTlColumn,
  getTxColumn,
  getTlNestedHeaders,
  getTxNestedHeaders,
  getHotSettingsTl,
  getHotSettingsTx,
  defHotSettingsWeek,
} from "./writeWeek.js";
import { getData } from "../../../api/report/writeData";
import { get_de_ems } from "@/api/report/de_ems";
import { get_nx_ems } from "@/api/report/nx_ems";

const hotPlungin = {};
let vueInstance = null;
let today = new Date();
export default {
  name: "handsometable-basic2",
  props: {
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      notice: "",
      device: "tl",
      time: Date.now() - 24 * 60 * 60 * 1000,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      showTl: true,
      queryTl: {
        year: moment(Date.now() - 24 * 60 * 60 * 1000)
          .year()
          .toString(),
        month:
          moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1 > 9
            ? (moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1).toString()
            : "0" + (moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1),
        pointCode: "",
      },
      queryTx: {
        year: moment(Date.now() - 24 * 60 * 60 * 1000)
          .year()
          .toString(),
        month: moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1,
        projectCode: "",
      },
      hotSettingsTl: defHotSettingsWeek,
      hotSettingsTx: defHotSettingsWeek,
      pcode: "",
      rcode: "",
      identity: "",
      query: {
        year: moment(Date.now() - 24 * 60 * 60 * 1000)
          .year()
          .toString(),
        month: moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1,
      },
      check: false,
    };
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month = moment(value).month() + 1;
      this.queryTl.year = moment(value).year().toString();
      this.queryTl.month =
        moment(value).month() + 1 > 9
          ? (moment(value).month() + 1).toString()
          : "0" + (moment(value).month() + 1);
      this.queryTx.year = moment(value).year().toString();
      this.queryTx.month = moment(value).month() + 1;
    },
    isCollapse(value) {
      let dom =
        document.getElementsByClassName("div__tool-wrap")[0].offsetWidth;
      if (value) {
        this.hotSettingsTl.width = dom + 180;
        this.hotSettingsTx.width = dom + 180;
      } else {
        this.hotSettingsTl.width = dom - 180;
        this.hotSettingsTx.width = dom - 180;
      }
    },
  },
  components: { HotTable, cascade },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
  created() {},
  mounted() {
    this.identity = this.$store.state.writeData.identity;
    if (this.$store.state.writeData.selectOptions.plant) {
      this.rcode = this.$store.state.writeData.selectOptions.area;
      this.pcode = this.$store.state.writeData.selectOptions.plant;
      this.query.area = this.rcode;
      this.query.plant = this.pcode;
      this.queryTl.pointCode = this.rcode + "_" + this.pcode;
      this.queryTx.projectCode = this.pcode;
      if (this.showTl) {
        this.get_de_ems();
      } else {
        this.get_nx_ems();
      }
    } else {
      delete this.queryTl.pointCode;
    }
    vueInstance = this;
    window.vue = this;
  },
  activated() {
    if (this.$store.state.writeData.selectOptions.plant) {
      this.rcode = this.$store.state.writeData.selectOptions.area;
      this.pcode = this.$store.state.writeData.selectOptions.plant;
      this.query.area = this.rcode;
      this.query.plant = this.pcode;
      this.queryTl.pointCode = this.rcode + "_" + this.pcode;
      this.queryTx.projectCode = this.pcode;
      if (this.showTl) {
        this.get_de_ems();
      } else {
        this.get_nx_ems();
      }
    } else {
      delete this.queryTl.pointCode;
    }
  },
  methods: {
    async getDatas() {
      this.check = false;
      await getData(this.query)
        .then((res) => {
          let data = res.data.data.list;
          let now = Number(moment().format("DD"));
          data = data.slice(0, now - 1);
          let arry = [];
          data.forEach((ele) => {
            if (!ele.id) {
              arry.push(Number(ele.dt.slice(8, 10)));
            }
          });
          if (arry.length > 0) {
            this.check = false;
            this.notice = `警告：${arry.join(",")}号日报未填写，将不会被保存！`;
          } else {
            this.check = true;
            this.notice = "";
          }
        })
        .catch((err) => {});
    },
    // 查询脱硫耗用表
    async get_de_ems() {
      await this.getDatas();
      // if (this.check) {
      this.$store.commit("SET_LOADING", true);
      get_de_ems(this.queryTl)
        .then((res) => {
          this.$store.commit("SET_LOADING", false);
          let data = JSON.parse(JSON.stringify(res.data.data.data));
          data.pop();
          data.pop();
          data.forEach((ele) => {
            if (
              ele.limestone_powder_purity &&
              ele.limestone_powder_purity != 0
            ) {
              ele.purity = ele["limestone_powder_purity"];
            } else {
              ele.purity = ele["carbide_slag_purity"];
            }
          });
          let currentMonth =
            moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1;
          let selectMonth = moment(this.time).month() + 1;
          let yesterDay = Number(
            moment(Date.now() - 24 * 60 * 60 * 1000).format("DD")
          );
          if (selectMonth == currentMonth) {
            data = data.slice(0, yesterDay);
          }
          let list = res.data.data.unitList;
          let settings = getHotSettingsTl(data, list, this.queryTl);
          // 限制值班员只读、只能保存单行的权限
          // let col = settings.columns;
          // if (
          //   this.identity == "ROLE_SPECIALIST" ||
          //   this.identity == "ROLE_ADMIN" ||
          //   this.identity == "ROLE_Analysiser" ||
          //   this.identity == "ROLE_Supervisor"
          // ) {
          //   col.forEach(ele => {
          //     if (ele.data == "date") {
          //       ele.readOnly = true;
          //     } else {
          //       ele.readOnly = false;
          //     }
          //   });
          // } else if (this.identity == "ROLE_WATCHER") {
          //   settings.cells = (row, col) => {
          //     let cellProperties = {};
          //     if (vueInstance.hotSettingsTl.data[row].id) {
          //       // 存在id
          //       cellProperties.readOnly = true;
          //     }
          //     return cellProperties;
          //   };
          // } else {
          //   col.forEach(ele => {
          //     ele.readOnly = true;
          //   });
          // }
          // settings.columns = col;
          // if (
          //   this.identity == "ROLE_WATCHER" ||
          //   this.identity == "ROLE_SPECIALIST"
          // ) {
          //   delete settings.contextMenu.items.saveAll;
          // }
          this.hotSettingsTl = settings;
        })
        .catch((err) => {
          // console.log(err);
          this.$store.commit("SET_LOADING", false);
        });
      // }
    },
    // 查询脱硝耗用表
    async get_nx_ems() {
      await this.getDatas();
      // if (this.check) {
      this.$store.commit("SET_LOADING", true);
      get_nx_ems(this.queryTx)
        .then((res) => {
          this.$store.commit("SET_LOADING", false);
          let data = res.data.data.data;

          data.pop();
          data.pop();
          data.forEach((element) => {
            if (element.ya_cd) {
              element.cd = element["ya_cd"];
            } else if (element.ns_zd) {
              element.cd = element["ns_zd"];
            } else {
              element.cd = null;
            }
          });
          let currentMonth =
            moment(Date.now() - 24 * 60 * 60 * 1000).month() + 1;
          let selectMonth = moment(this.time).month() + 1;
          let yesterDay = Number(
            moment(Date.now() - 24 * 60 * 60 * 1000).format("DD")
          );
          if (selectMonth == currentMonth) {
            data = data.slice(0, yesterDay);
          }
          let list = res.data.data.units;
          let settings = getHotSettingsTx(data, list, this.queryTx);
          // 限制值班员只读、只能保存单行的权限
          // let col = settings.columns;
          // if (
          //   this.identity == "ROLE_SPECIALIST" ||
          //   this.identity == "ROLE_ADMIN" ||
          //   this.identity == "ROLE_Analysiser" ||
          //   this.identity == "ROLE_Supervisor"
          // ) {
          //   col.forEach(ele => {
          //     if (ele.data == "day") {
          //       ele.readOnly = true;
          //     } else {
          //       ele.readOnly = false;
          //     }
          //   });
          // } else if (this.identity == "ROLE_WATCHER") {
          //   settings.cells = (row, col) => {
          //     let cellProperties = {};
          //     if (vueInstance.hotSettingsTx.data[row].id) {
          //       // 存在id
          //       cellProperties.readOnly = true;
          //     }
          //     return cellProperties;
          //   };
          // } else {
          //   col.forEach(ele => {
          //     ele.readOnly = true;
          //   });
          // }
          // settings.columns = col;
          // if (
          //   this.identity == "ROLE_WATCHER" ||
          //   this.identity == "ROLE_SPECIALIST"
          // ) {
          //   delete settings.contextMenu.items.saveAll;
          // }
          this.hotSettingsTx = settings;
        })
        .catch((err) => {
          // console.log(err);
          this.$store.commit("SET_LOADING", false);
        });
      // }
    },

    changeDevice() {
      if (!this.$store.state.writeData.selectOptions.plant) {
        this.device = "tl";
        return this.$message("请选择区域和电厂");
      } else {
        this.queryTl.pointCode =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        this.queryTx.projectCode =
          this.$store.state.writeData.selectOptions.plant;
      }
      this.showTl = !this.showTl;
      if (this.showTl) {
        this.get_de_ems();
      } else {
        this.get_nx_ems();
      }
    },
    checkWeek() {
      if (!this.$store.state.writeData.selectOptions.plant) {
        return this.$message("请选择区域和电厂");
      } else {
        this.queryTl.pointCode =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        this.queryTx.projectCode =
          this.$store.state.writeData.selectOptions.plant;
      }
      if (this.showTl) {
        this.get_de_ems();
      } else {
        this.get_nx_ems();
      }
    },
    onMyCascader(data) {
      if (!data.area || !data.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.query.area = data.area;
      this.query.plant = data.plant;
      this.queryTl.pointCode = data.area + "_" + data.plant;
      this.queryTx.projectCode = data.plant;
      if (this.showTl) {
        this.get_de_ems();
      } else {
        this.get_nx_ems();
      }
    },

    // changeData() {
    //   this.hotSettings.data.splice(0, 1);
    // },
    // 重置
    // resetState() {
    //   console.log(data);
    //   this.$refs.hotTableTl.hotInstance.loadData(data);
    //   this.$refs.hotTableTx.hotInstance.loadData(data);
    // }
    // 导出不能导出多级表头
    // downloadExcel() {
    //   let exportPlugin = this.$refs.hotTable.hotInstance.getPlugin(
    //     "exportFile"
    //   );
    //   exportPlugin.downloadFile("csv", {
    //     bom: false,
    //     columnDelimiter: ",",
    //     columnHeaders: true,
    //     exportHiddenColumns: true,
    //     exportHiddenRows: true,
    //     fileExtension: "csv",
    //     filename: "Handsontable-CSV-file_[YYYY]-[MM]-[DD]",
    //     mimeType: "text/csv",
    //     rowDelimiter: "\r\n",
    //     rowHeaders: true,
    //     nestedHeaders: true
    //   });
    // }
  },
  destroyed() {
    window.vue = null;
  },
};
</script>
<style scoped lang="less">
.container {
  padding: 0 20px;
}
.div__tool-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  margin-bottom: 10px;
  .select__wrap {
    height: 42px;
    line-height: 42px;
    display: flex;
    // width: 100%;
  }
}
</style>
<template>
  <div class="container" ref="write_data">
    <div class="div__tool-wrap">
      <div class="select__wrap">
        <div>选择时间：</div>
        <div>
          <el-date-picker
            v-model="time"
            align="right"
            type="year"
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
        <el-radio-group v-model="device">
          <el-radio label="tl">脱硫</el-radio>
          <el-radio label="tx">脱硝</el-radio>
          <el-radio label="fs">废水</el-radio>
          <el-radio label="lp">两票</el-radio>
        </el-radio-group>
      </div>
      <BtnList
        style="width: 20%"
        :showRest="false"
        btnStyle="textAlign:left;margin-left:32px"
        @check="checkMonth"
      />
    </div>
    <HotTable
      v-show="showTl"
      v-loading="$store.state.writeData.loading"
      ref="hotTableTl"
      :height="height"
      :settings="hotSettingsTl"
    ></HotTable>
    <HotTable
      v-show="showTx"
      v-loading="$store.state.writeData.loading"
      ref="hotTableTx"
      :height="height"
      :settings="hotSettingsTx"
    ></HotTable>
    <HotTable
      v-show="showFs"
      v-loading="$store.state.writeData.loading"
      ref="hotTableFs"
      :height="height"
      :settings="hotSettingsFs"
    ></HotTable>
    <Lp v-show="showLp" :lpTableData="lpTableData" @saveLp="saveLp"></Lp>
  </div>
</template>
<script>
import cascade from "@/components/selectOrg/index11.vue";
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import moment from "moment";
import { get_de_sum } from "@/api/report/summary.js";
import { getFsData } from "@/api/report/writeData.js";
import Lp from "./components/lp.vue";
import {
  getHotSettingsTl,
  getHotSettingsTx,
  getHotSettingsFs,
  defHotSettingsMonth,
} from "./writeMonth.js";
import { getLp, saveLpData } from "@/api/report/lp.js";
import { mapState } from "vuex";

const hotPlungin = {};
let vueInstance = null;

export default {
  name: "handsometable-basic1",
  props: {
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      // loading: false,
      device: "tl",
      time: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      showTl: true, //脱硫
      showFs: false, //废水
      showTx: false, //脱硝
      showLp: false, //两票
      queryTLxq: {
        //脱硫月表参数
        year: moment(Date.now()).year(),
        pointCode: "",
      },
      hotSettingsTl: defHotSettingsMonth,
      hotSettingsTx: defHotSettingsMonth,
      hotSettingsFs: defHotSettingsMonth,
      lpTableData: [],
      pcode: "",
      rcode: "",
      identity: "",
      plantCode: "",
      areaCode: "",
    };
  },
  components: { HotTable, cascade, Lp },
  computed: {
    ...mapState(["loading"]),
  },
  created() {
    if (this.$store.state.writeData.selectOptions.plant) {
      let rcode = this.$store.state.writeData.selectOptions.area;
      let pcode = this.$store.state.writeData.selectOptions.plant;
      this.queryTLxq.pointCode = rcode + "_" + pcode;
      this.getTlMonthSummary(this.queryTLxq);
    } else {
      delete this.queryTLxq.pointCode;
    }
    this.identity = this.$store.state.writeData.identity;
  },
  mounted() {
    vueInstance = this;
    window.vue = this;
  },
  watch: {
    time(value) {
      this.queryTLxq.year = moment(value).year();
    },
    device(value) {
      if (!this.$store.state.writeData.selectOptions.plant) {
        this.device = "tl";
        return this.$message("请选择区域和电厂");
      } else {
        let rcode = this.$store.state.writeData.selectOptions.area;
        let pcode = this.$store.state.writeData.selectOptions.plant;
        this.queryTLxq.pointCode = rcode + "_" + pcode;
        if (value == "fs") {
          this.showFs = true;
          this.showTl = false;
          this.showTx = false;
          this.showLp = false;

          this.getFsMonthSummary();
        } else if (value == "tl") {
          this.showTl = true;
          this.showTx = false;
          this.showLp = false;
          this.showFs = false;
          this.getTlMonthSummary(this.queryTLxq);
        } else if (value == "tx") {
          this.showTx = true;
          this.showTl = false;
          this.showLp = false;
          this.showFs = false;
          this.getTlMonthSummary(this.queryTLxq);
        } else if (value == "lp") {
          this.showLp = true;
          this.showTl = false;
          this.showTx = false;
          this.showFs = false;
          this.getLpData();
        }
      }
    },
  },
  activated() {
     if (!this.$store.state.writeData.selectOptions.plant) {
        this.device = "tl";
        return this.$message("请选择区域和电厂");
      } else {
        let rcode = this.$store.state.writeData.selectOptions.area;
        let pcode = this.$store.state.writeData.selectOptions.plant;
        this.queryTLxq.pointCode = rcode + "_" + pcode;
        if (this.device == "fs") {
          this.showFs = true;
          this.showTl = false;
          this.showTx = false;
          this.showLp = false;

          this.getFsMonthSummary();
        } else if (this.device == "tl") {
          this.showTl = true;
          this.showTx = false;
          this.showLp = false;
          this.showFs = false;
          this.getTlMonthSummary(this.queryTLxq);
        } else if (this.device == "tx") {
          this.showTx = true;
          this.showTl = false;
          this.showLp = false;
          this.showFs = false;
          this.getTlMonthSummary(this.queryTLxq);
        } else if (this.device == "lp") {
          this.showLp = true;
          this.showTl = false;
          this.showTx = false;
          this.showFs = false;
          this.getLpData();
        }
      }
  },
  methods: {
    // 查询两票统计数据
    getLpData() {
      getLp({
        year: moment(this.time).year(),
        plantCode: this.plantCode,
      }).then((res) => {
        let data = res.data.data;
        this.lpTableData = data;
      });
    },
    // 保存两票统计填写的数据
    saveLp(data) {
      let { m, questiones, measures, dealStatus } = data;
      let obj = {
        y: moment(this.time).year(),
        m,
        areaCode: this.areaCode,
        plantCode: this.plantCode,
        questiones,
        measures,
        dealStatus,
      };
      saveLpData(obj).then((res) => {
        let code = res.data.code;
        if (code === 0) {
          this.$message.success("保存成功！");
          this.getLpData();
        } else {
          this.$message.error("保存失败！");
        }
      });
    },
    getTlMonthSummary(queryTLxq) {
      this.$store.commit("SET_LOADING", true);
      // 脱硫脱硝月表取的字段是从废水接口取的
      getFsData(queryTLxq).then((res) => {
        this.$store.commit("SET_LOADING", false);

        let datas = JSON.parse(JSON.stringify(res.data.data));

        datas.forEach((element) => {
          element.month = element.date.split("-")[1];
        });
        this.$nextTick(() => {
          // 获取脱硫的hotsettings
          let settingsTl = getHotSettingsTl(datas);
          let tlCol = settingsTl.columns;
          settingsTl.columns = this.hasAuthority(tlCol);
          if (this.identity == "ROLE_WATCHER") {
            delete settingsTl.contextMenu.items.save;
            delete settingsTl.contextMenu.items.saveAll;
          }
          this.hotSettingsTl = settingsTl;

          // 获取脱硝的hotsettings
          let settingsTx = getHotSettingsTx(datas);
          let txCol = settingsTx.columns;
          settingsTx.columns = this.hasAuthority(txCol);
          if (this.identity == "ROLE_WATCHER") {
            delete settingsTx.contextMenu.items.save;
            delete settingsTx.contextMenu.items.saveAll;
          }
          this.hotSettingsTx = settingsTx;
        });
      });
    },
    getFsMonthSummary() {
      this.$store.commit("SET_LOADING", true);
      getFsData(this.queryTLxq).then((res) => {
        this.$store.commit("SET_LOADING", false);
        let datas = JSON.parse(JSON.stringify(res.data.data));
        //按月份进行排序
        let arr = [];
        datas.forEach((element) => {
          element.month = element.date.split("-")[1];
          arr.push(element.month);
        });
        arr.sort();
        let result = [];
        for (var i = 0; i < arr.length; i++) {
          datas.forEach((ele) => {
            if (arr[i] == ele.month) {
              result.push(ele);
            }
          });
        }
        this.$nextTick(() => {
          // 获取废水的hotsettings
          let settingsFs = getHotSettingsFs(result);
          let col = settingsFs.columns;
          settingsFs.columns = this.hasAuthority(col);
          if (this.identity == "ROLE_WATCHER") {
            delete settingsFs.contextMenu.items.save;
            delete settingsFs.contextMenu.items.saveAll;
          }
          this.hotSettingsFs = settingsFs;
        });
      });
    },
    hasAuthority(col) {
      if (
        this.identity == "ROLE_SPECIALIST" ||
        this.identity == "ROLE_ADMIN" ||
        this.identity == "ROLE_Analysiser" ||
        this.identity == "ROLE_Supervisor"
      ) {
        col.forEach((ele) => {
          if (ele.data == "month") {
            ele.readOnly = true;
          } else {
            ele.readOnly = false;
          }
        });
      } else {
        col.forEach((ele) => {
          ele.readOnly = true;
        });
      }
      return col;
    },
    checkMonth() {
      if (!this.$store.state.writeData.selectOptions.plant) {
        return this.$message("请选择区域和电厂");
      }
      if (this.device == "fs") {
        this.getFsMonthSummary();
      } else if (this.device == "lp") {
        this.getLpData();
      } else {
        this.getTlMonthSummary(this.queryTLxq);
      }
    },
    onMyCascader(data) {
      if (!this.$store.state.writeData.selectOptions.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.queryTLxq.pointCode = data.area + "_" + data.plant;
      this.areaCode = data.area;
      this.plantCode = data.plant;
      this.getTlMonthSummary(this.queryTLxq);
    },

    // changeData() {
    //   this.hotSettings.data.splice(0, 1);
    // },
    // 重置
    // resetState() {
    //   console.log(data);
    //   this.$refs.hotTable.hotInstance.loadData(data);
    // },
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
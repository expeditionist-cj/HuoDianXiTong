<template>
  <div class="wasteWater" ref="wasteWater">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <div class="select__wrap" style="margin-right: 10px">
          <div>查询时间：</div>
          <el-date-picker
            style="margin-right: 10px"
            v-model="month"
            align="right"
            type="month"
            placeholder="选择年月"
            format="yyyy - MM"
            :disabled="isreadonly"
            size="small"
            :clearable="false"
            :editable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-select
            v-model="day"
            size="small"
            :disabled="isreadonly"
            placeholder="选择日"
          >
            <el-option
              v-for="(item, index) in dayOptions"
              :key="index"
              :label="item.label"
              :value="item.val"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
        <SelOrg
          class="selorg-wrap"
          style="max-width: 20%"
          @selectArear="selectArear"
          :disableArea="isreadonly"
          :showDevice="false"
          :showSystem="false"
          :showUnit="false"
          :showPlant="false"
          :showAll="showAll"
        />

        <div
          style="
            display: flex;
            padding-left: 20px;
            align-items: center;
            max-width: 20%;
          "
        >
          <BtnList
            resetContent="导出"
            btnStyle="textAlign:left;margin-left:0px"
            :showCheck="isreadonly"
            @check="checkList"
            :showRest="true"
            @reset="onExport"
          />

          <el-button
            @click="goback"
            v-if="isreadonly"
            style="margin-left: 10px"
            type="primary"
            size="mini"
            >返回</el-button
          >
        </div>
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <div slot="title" class="title">
            <span class="span">{{ yearTitle }} 年</span>
            <span class="span">&nbsp;{{ monthTitle }}月 </span>
            <span class="span" v-if="dayTitle">&nbsp;{{ dayTitle }}日 </span>
            <span class="span">
              {{ area_title }}{{ plant_title ? (area_title ? "/" : "") : ""
              }}{{ plant_title }}</span
            >
            废水运行情况统计表
          </div>
          <div
            class="content-table"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <month-curd
              v-show="showMonthCurd"
              @getDayDetial="getDayDetial"
              ref="curd"
              :monthTableData="monthTableData"
              :height="tableHeight"
            />
            <day-curd
              v-show="showDayCurd"
              ref="curd"
              :DayTableData="DayTableData"
              :height="tableHeight"
              @doSave="doSave"
            />
            <day-in-month-curd
              v-show="showDayInMonthCurd"
              ref="curd"
              :DayInMonthTableData="DayInMonthTableData"
              :height="tableHeight"
              @getDayDetial="getDayDetial"
            />
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>
<script>
import layoutTable from "../../../components/tableLayout/index";
import moment from "moment";
import "moment/locale/zh-cn";
import { excel } from "@/api/common";
import monthCurd from "./monthCurd.vue";
import dayCurd from "./dayCurd.vue";
import dayInMonthCurd from "./dayInMonthCurd.vue";
import { getDayOptions } from "./util.js";
import {
  getMonthData,
  getDayInMonthData,
  getDayData,
  saveAdjust,
} from "@/api/report/wasteWater.js";

export default {
  data() {
    return {
      dayOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      monthTableData: [],
      DayTableData: [],
      DayInMonthTableData: [],
      tableHeight: 400,
      isreadonly: false, //控制月详情表的选择框是否禁用
      showAll: false, //区域是否显示全公司 fasle代表显示
      tableShow: true,
      tableLoading: false,
      month: moment(Date.now()),
      day: "",
      yearTitle: "",
      monthTitle: "",
      dayTitle: "",
      area_title: "",
      plant_title: "",
      area: "",
      plant: "",
      showMonthCurd: true,
      showDayCurd: false,
      showDayInMonthCurd: false,
      query: {
        year: moment().year(),
        month:
          moment().month() + 1 > 9
            ? moment().month() + 1
            : "0" + (moment().month() + 1),
      },
      regionCode: "",
    };
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.wasteWater.offsetHeight - 230;

      this.tableShow = true;
      this.checkList();
    });
    this.dayOptions = getDayOptions(this.month);
  },
  watch: {
    month(value) {
      this.dayOptions = getDayOptions(value);
      this.query.year = moment(value).year();
      this.query.month =
        moment(value).month() + 1 > 9
          ? moment(value).month() + 1
          : "0" + (moment(value).month() + 1);
    },
  },
  components: {
    layoutTable,
    monthCurd,
    dayCurd,
    dayInMonthCurd,
  },
  methods: {
    // 点击具体电厂，查询电厂月详情数据
    getDayDetial(row) {
      // 切换到日表，设置查询条件只读
      this.showMonthCurd = false;
      this.showDayInMonthCurd = false;
      this.showDayCurd = true;
      this.isreadonly = true;
      this.yearTitle = moment(this.month).year();
      this.monthTitle = moment(this.month).month() + 1;
      this.plant_title = row.projectName;
      let projectCode = row.projectCode.split("_")[1]; // 获取点击的电厂Code
      this.query.projectCode = projectCode;
      delete this.query.regionCode;
      this.tableLoading = true;
      getDayData(this.query).then((res) => {
        this.tableLoading = false;
        let data = res.data.data;
        // let currentMonth = moment().format("MM");
        // let selectMonth = moment(this.month).format("MM");
        // let today = Number(moment().format("DD"));
        // if (selectMonth == currentMonth) {
        //   data = data.slice(0, today);
        // }
        this.DayTableData = data;
        this.dayTitle = "";
      });
    },
    // 选择区域公司
    selectArear(data) {
      this.area = data.name ? data.name : "";
      delete this.query.regionCode;
      if (data.deptCode != "all") {
        // 将区域Code保存起来
        this.regionCode = data.deptCode;
        this.query.regionCode = data.deptCode;
      } else {
        this.regionCode = "";
      }
    },
    // 点击查询按钮
    checkList() {
      // 如果选择了区域，则区域code不为空，查询条件要带上区域code
      if (this.regionCode) {
        this.query.regionCode = this.regionCode;
      }
      // 如果选择了天数，则查询日维度月表
      if (this.day) {
        this.showDayInMonthCurd = true;
        this.showMonthCurd = false;
        this.query.day = this.day;
        this.tableLoading = true;
        getDayInMonthData(this.query).then((res) => {
          this.tableLoading = false;
          let data = res.data.data;
          this.DayInMonthTableData = data;
        });
      } else {
        // 如果没选择天数，则查询月维度月表
        this.showMonthCurd = true;
        this.showDayInMonthCurd = false;
        delete this.query.day;
        this.tableLoading = true;
        getMonthData(this.query).then((res) => {
          this.tableLoading = false;
          let data = res.data.data;
          data.forEach((ele) => {
            Object.keys(ele).map((k) => {
              if (ele[k] == null) {
                ele[k] = "--";
              }
            });
          });
          this.monthTableData = data;
        });
      }
      this.area_title = this.area;
      this.yearTitle = moment(this.month).year();
      this.monthTitle = moment(this.month).month() + 1;
      this.dayTitle = this.day;
    },
    onExport() {
      if (this.showDayCurd) {
        //单项目月报导出
        excel("/datamonitor/sewage_report/month_plant_excel", {
          ...this.query,
        }).then((res) => {
          let data = res.data;
          let excelName = `${this.query.year}年${this.query.month}月 ${this.plant_title} 废水运行情况统计表.xlsx`;
          this.excel(data, excelName);
        });
      } else if (this.day) {
        this.query.day = this.day;
        //日报导出
        excel("/datamonitor/sewage_report/dayExcel", {
          ...this.query,
        }).then((res) => {
          let data = res.data;
          let excelName = `${this.query.year}年${this.query.month}月${
            this.query.day
          }日 ${this.area}${this.plant_title ? (this.area ? "/" : "") : ""}${
            this.plant_title
          } 废水运行情况统计表.xlsx`;
          this.excel(data, excelName);
        });
      } else {
        delete this.query.day;
        //月报导出
        excel("/datamonitor/sewage_report/monthExcel", {
          ...this.query,
        }).then((res) => {
          let data = res.data;
          let excelName = `${this.query.year}年${this.query.month}月  ${
            this.area
          }${this.plant_title ? (this.area ? "/" : "") : ""}${
            this.plant_title
          } 废水运行情况统计表.xlsx`;
          this.excel(data, excelName);
        });
      }
    },
    goback() {
      // 切回上一个表，查询条件变为可选
      if (this.day) {
        this.showDayInMonthCurd = true;
      } else {
        this.showMonthCurd = true;
      }
      this.showDayCurd = false;
      // 清空电厂标题
      this.plant_title = "";
      this.isreadonly = false;
      delete this.query.projectCode;
    },
    //保存调整项
    doSave(data) {
      saveAdjust({
        ...data,
        project_code: this.query.projectCode,
        y: moment(this.month).format("YYYY"),
        m: Number(moment(this.month).format("MM")),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.tableLoading = true;
          getDayData(this.query).then((res) => {
            this.tableLoading = false;
            let data = res.data.data;
            let currentMonth = moment().format("MM");
            let selectMonth = moment(this.month).format("MM");
            let today = Number(moment().format("DD"));
            if (selectMonth == currentMonth) {
              data = data.slice(0, today);
            }
            this.DayTableData = data;
            this.dayTitle = "";
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wasteWater {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    padding: 20px 8px;
    .select__wrap {
      height: 42px;
      line-height: 42px;
      max-width: 40%;
      display: flex;
      align-items: center;
      // width: 100%;
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
  .div__content-wrap {
    padding: 0 32px;

    .title {
      font-size: 18px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
    }
    .content-table {
      padding-bottom: 20px;
    }
  }
}
</style>

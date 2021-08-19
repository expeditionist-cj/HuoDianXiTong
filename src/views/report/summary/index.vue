<template>
  <div class="container" ref="de_ems">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <div class="select__wrap" style="margin-right: 10px">
          <div>查询时间：</div>
          <el-date-picker
            style="margin-right: 10px"
            v-model="y"
            align="right"
            type="year"
            placeholder="选择年"
            :disabled="isreadonly"
            size="small"
            :clearable="false"
            :editable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-select
            v-model="m"
            size="small"
            :disabled="isreadonly"
            placeholder="选择月"
          >
            <el-option
              v-for="(item, index) in monthOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
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
        <div style="display: flex; align-items: center; max-width: 20%">
          <div style="width: 70px; margin-left: 20px">装置：</div>
          <el-select
            v-model="device"
            :disabled="isreadonly"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in optDevice"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div style="display: flex; padding-left: 20px">
          <BtnList
            resetContent="导出"
            btnStyle="textAlign:left;margin-left:0px"
            :showCheck="isreadonly"
            @check="checkList"
            @reset="onExport"
          />
          <el-button
            @click="goback"
            v-if="isreadonly"
            style="height: 28px; margin: 7px 0 0 10px"
            type="primary"
            size="mini"
            >返回</el-button
          >
        </div>
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <div slot="title" class="title">
            <span class="span">{{ year }}</span
            >年
            <span class="span" v-if="month">{{ month }}月 </span>
            <span class="span">{{ area_title }} {{ plant_title }} </span>
            <span class="span">{{ deviceName }}</span> 运行数据统计表
          </div>
          <div
            class="content-table"
            ref="zcurd"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <!-- 脱硫年表 -->
            <decurd
              v-show="is_tl_show"
              @getTLDetail="getTLDetail"
              ref="curd"
              :tl_tableData="tl_tableData"
              :isClickable="isClickable"
              :height="tableHeight"
            />
            <!-- 脱硫月表 -->
            <decurdxq
              v-show="is_tl_xq_show"
              @onTLEdit="onTLEdit"
              :tl_xq_tableData="tl_xq_tableData"
              :tlUnitList="tlUnitList"
              ref="curd"
              :height="tableHeight"
            />
            <!-- 脱硝年表 -->
            <nxcurd
              v-show="is_tx_show"
              @getTXDetail="getTXDetail"
              ref="curd"
              :nx_tableData="nx_tableData"
              :isClickable="isClickable"
              :height="tableHeight"
            />
            <!-- 脱硝月表 -->
            <nxcurdxq
              v-show="is_tx_xq_show"
              @onTXEdit="onTXEdit"
              ref="curd"
              :nx_xq_tableData="nx_xq_tableData"
              :unitList="unitList"
              :unitListAB="unitListAB"
              :height="tableHeight"
            />
          </div>
        </layoutTable>
      </div>
    </Card>
    <!-- 编辑对话框 -->
    <el-dialog
      custom-class="edit"
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>{{ year }} 年 {{ dialogMonth }} 月</div>
      <div class="edit-box">
        <div class="edit-content">
          <span class="edit-title">供热量(万吉焦)</span>
          <el-input
            class="edit-input"
            type="number"
            v-model.number="rowdata.heatCapacity"
            size="small"
          ></el-input>
        </div>
        <div v-if="tx_xq_dialogShow" class="edit-content">
          <span class="edit-title">钙硫比</span>
          <el-input
            class="edit-input"
            type="number"
            v-model.number="rowdata.calSulRatio"
            size="small"
          ></el-input>
        </div>
        <div v-if="tx_xq_dialogShow" class="edit-content">
          <span class="edit-title">不合格石膏销量(t)</span>
          <el-input
            class="edit-input"
            type="number"
            v-model.number="rowdata.svGypsumSales"
            size="small"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import decurd from "./decurd";
import decurdxq from "./decurdxq";
import nxcurd from "./nxcurd";
import nxcurdxq from "./nxcurdxq";
import { getAuthority } from "@/api/admin/user.js";
import { optDevice, optMonth } from "./util";
import {
  get_nx_sum,
  get_de_sum,
  de_xq_update,
  get_nx_area,
  get_de_sum_area,
} from "@/api/report/summary.js";
import layoutTable from "../../../components/tableLayout/index";
import moment from "moment";
import "moment/locale/zh-cn";
import { excel } from "@/api/common";
import _ from "lodash";
export default {
  data() {
    return {
      tl_tableData: [], // 脱硫年表
      tl_xq_tableData: [], // 脱硫月表
      nx_yearTableData: [], //脱硝年表汇总（不含区域）
      nx_tableData: [], //脱硝年表汇总（含区域汇总）
      nx_xq_tableData: [], //脱硝月表
      unitList: [], //机组
      unitListAB: [], //含AB侧机组
      tlUnitList: [], //脱硫机组
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year(),
      month: "",
      y: Date.now(),
      m: 0,
      dialogMonth: "", //弹框上显示的月份
      optDevice,
      optMonth,
      device: "tlsys_code",
      deviceName: "脱硫",
      area: "",
      plant: "",
      area_title: "",
      plant_title: "",
      rowdata: [],
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      queryTX: {
        // 脱硝年表参数
        y: moment(Date.now()).year(),
      },
      queryTXxq: {
        // 脱硝月表参数
        y: moment(Date.now()).year(),
      },
      queryTL: {
        //脱硫年表参数
        date: moment(Date.now()).year(),
        pointCode: "",
      },
      queryTLxq: {
        //脱硫月表参数
        year: moment(Date.now()).year(),
      },
      tableShow: true,
      is_tl_show: true, //初始值：显示脱硫年表
      is_tl_xq_show: false, //脱硫月详情表
      is_tx_show: false, //脱硝年表
      is_tx_xq_show: false, //脱硝月详情表
      isreadonly: false, //控制月详情表的选择框是否禁用
      tx_xq_dialogShow: true, //控制月详情表的弹框内容是否隐藏
      isClickable: true, //控制年表下的电厂是否可以点击
      clickable: true,
      showAll: true, //区域是否显示全公司
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    monthOptions: {
      get() {
        return this.getMonthOptions(this.y, optMonth);
      },
      set(value) {
        return value;
      },
    },
  },
  components: {
    layoutTable,
    decurd,
    decurdxq,
    nxcurd,
    nxcurdxq,
  },
  created() {
    this.desulfurization_downloadMonth = this.permissions[
      "desulfurization_downloadMonth"
    ]; // 脱硫月报下载
    this.desulfurization_downloadYear = this.permissions[
      "desulfurization_downloadYear"
    ]; // 脱硫年报下载
    this.rcode = JSON.parse(sessionStorage.getItem("user")).user.regionCode;
    this.pcode = JSON.parse(sessionStorage.getItem("user")).user.projectCode;
    this.uid = JSON.parse(sessionStorage.getItem("user")).user.user_id;
    this.getAuthority({ userId: this.uid });
    let defAreaName = JSON.parse(sessionStorage.getItem("user")).user
      .regionName;
    let defPlantName = JSON.parse(sessionStorage.getItem("user")).user
      .projectName;
    if (!defPlantName) {
      this.$nextTick(() => {
        this.areaName = "";
        this.plantName = "";
      });
    } else {
      this.$nextTick(() => {
        this.area_title = defAreaName;
        this.plant_title = defPlantName;
      });
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.de_ems.offsetHeight - 230;
      this.tableShow = true;
      // this.checkList();
    });
    // if (this.pcode) {
    //   this.queryTL.pointCode = this.rcode + "_" + this.pcode;
    // } else if (this.rcode) {
    //   this.queryTL.pointCode = this.rcode;
    // } else {
    //   this.queryTL.pointCode = "";
    // }
    // this.checkList();
  },
  watch: {
    y(value) {
      this.monthOptions = this.getMonthOptions(value, optMonth);
      let yr = moment(value).year();
      this.queryTX.y = yr;
      this.queryTXxq.y = yr;
      this.queryTL.date = yr;
      this.queryTLxq.year = yr;
    },
    m(value) {
      if (value > 0) {
        this.queryTX.m = value;
        this.queryTL.date =
          moment(this.y).year() + "-" + (value > 9 ? value : "0" + value);
        this.clickable = false;
      } else {
        delete this.queryTX.m;
        this.queryTL.date = moment(this.y).year();
        this.clickable = true;
      }
    },
  },
  methods: {
    getAuthority(query) {
      getAuthority(query).then((res) => {
        let identity = res.data.data[0];
        if (identity == "ROLE_Analysiser" || identity == "ROLE_ADMIN") {
          this.showAll = false;
        } else {
          this.showAll = true;
        }
      });
    },
    //获取当前年有哪些月可选
    getMonthOptions(value, optMonth) {
      if (moment(value).year() < moment(Date.now()).year()) {
        optMonth.forEach((item, index) => {
          item.disabled = false;
        });
      } else {
        optMonth.forEach((item, index) => {
          item.disabled = this.isDisable(index - 1);
        });
      }
      return optMonth;
    },
    //判断是否大于当前月
    isDisable(item) {
      return item > moment(Date.now()).month();
    },
    //切换到脱硫月表
    getTLDetail(row) {
      //禁用修改条件、查询等功能，并显示返回按钮
      this.isreadonly = true;
      //隐藏脱硫年表
      this.is_tl_show = false;
      //显示脱硫月表
      this.$nextTick(() => {
        this.is_tl_xq_show = true;
      });
      this.plant = row.val;
      this.plant_title = row.val;
      //修改查询条件为 当前点击的电厂的月表
      this.queryTLxq.pointCode = row["val#1"].split(".")[0];
      //查询月表
      this.getTlMonthSummary("selectByMon", this.queryTLxq);
    },
    //切换到脱硝月表
    getTXDetail(row) {
      this.isreadonly = true;
      this.is_tx_show = false;
      this.$nextTick(() => {
        this.is_tx_xq_show = true;
      });
      this.plant = row.plant;
      this.plant_title = row.plantName;
      //修改查询条件为 当前点击的电厂的月表
      this.queryTXxq.plant = row.plant;
      this.getTxMonthSummary("getPM", this.queryTXxq);
    },
    // 返回
    goback() {
      this.tableLoading = false;
      //恢复修改条件、查询等功能，并隐藏返回按钮
      this.isreadonly = false;
      // 重置标题
      this.plant_title = "";
      //如果当前是脱硫月表，则返回脱硫年表
      if (this.is_tl_xq_show == true) {
        this.is_tl_xq_show = false;
        this.$nextTick(() => {
          this.is_tl_show = true;
        });
      } else {
        //如果当前是脱硝月表，则返回脱硝年表
        this.is_tx_xq_show = false;
        this.$nextTick(() => {
          this.is_tx_show = true;
        });
      }
    },
    getUnitList(arg) {
      let arry = [];
      for (var i = 0; i < arg.length; i++) {
        arry.push(arg[i].unitOrder.slice(1, 2));
      }
      return arry;
    },
    getUnitListAB(arg) {
      let arr = ["A", "B"];
      let arry = [];
      for (var i = 0; i < arg.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          arry.push(arg[i] + arr[j]);
        }
      }
      return arry;
    },
    //查询脱硝月表的请求
    getTxMonthSummary(yOrm, queryTXxq) {
      this.tableLoading = true;
      get_nx_sum(yOrm, queryTXxq).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        this.nx_xq_tableData = datas;
        let arr = [];
        datas.forEach((value, index) => {
          arr.push(value.units);
        });
        let list = this.getUnitList(arr[0]);
        this.unitList = list;
        this.unitListAB = this.getUnitListAB(list);
      });
    },
    // 查询脱硝年表的请求
    getTxYearSummary(yOrm, queryTX) {
      this.tableLoading = true;
      return get_nx_sum(yOrm, queryTX).then((res) => {
        let datas = res.data.data;
        datas.forEach((item) => {
          // if (item.plantName == "中孚") {
          //   item.units = [{}, {}, {}];
          // }
          Object.keys(item).map((k) => {
            if (k != "areaName" && k != "plantName" && item[k] == null) {
              item[k] = "--";
            }
          });
          if (!item.plant || item.plant.indexOf("XM") < 0) {
            item.units[0].ulRate = "--";
            item.units[1].ulRate = "--";
          }
        });
        return datas;
      });
    },
    // 查询脱硫月表的请求
    getTlMonthSummary(yOrm, queryTLxq) {
      this.tableLoading = true;
      get_de_sum(yOrm, queryTLxq).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        datas.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (ele[k] == null) {
              ele[k] = "--";
            }
          });
        });
        this.tlUnitList = res.data.unit;
        this.tl_xq_tableData = datas;
      });
    },
    getTlYearSummaryWithArea(query) {
      this.tableLoading = true;
      get_de_sum_area(query).then((res) => {
        this.tableLoading = false;
        let datas = res.data;
        datas.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (k != "val" && (ele[k] == null || ele[k] == "null")) {
              ele[k] = "--";
            }
          });
        });
        this.tl_tableData = datas;
      });
    },
    // 查询脱硫年表的请求
    getTlYearSummary(yOrm, queryTLxq) {
      this.tableLoading = true;
      get_de_sum(yOrm, queryTLxq).then((res) => {
        this.tableLoading = false;
        let datas = res.data;
        datas.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (k != "val" && ele[k] == null) {
              ele[k] = "--";
            }
          });
          if (!ele.valCode || ele.valCode.indexOf("XM") < 0) {
            ele["fhl#1"] = "--";
            ele["fhl#2"] = "--";
          }
        });
        this.tl_tableData = datas;
      });
    },
    //查询
    checkList() {
      this.is_tl_xq_show = false;
      this.is_tx_xq_show = false;
      if (this.device == "tlsys_code") {
        this.deviceName = "脱硫";
        //隐藏脱硝年表
        this.is_tx_show = false;
        //查询脱硫年表
        if (this.queryTL.pointCode == "") {
          this.getTlYearSummary("selectByYear", this.queryTL);
        } else {
          this.getTlYearSummaryWithArea(this.queryTL);
        }

        // 显示脱硫年表
        this.$nextTick(() => {
          this.is_tl_show = true;
        });
      } else {
        this.deviceName = "脱硝";
        //隐藏脱硫年表
        this.is_tl_show = false;
        //查询脱硝年表---年维度
        if (this.m < 1) {
          this.getTxYearSummary("getPY", this.queryTX).then((res) => {
            // console.log(res,999);
            this.tableLoading = false;
            this.nx_tableData = res;
            // get_nx_area(this.queryTX).then((response) => {
            // this.tableLoading = false;
            // let data = response.data.data;
            // data.forEach((item) => {
            //   for (var key in item) {
            //     if (key == "areaName") {
            //       item.plantName = item[key];
            //     }
            //   }
            // });
            // this.nx_tableData = res.concat(data);
            // });
          });
        } else {
          //查询脱硝年表---月维度
          this.getTxYearSummary("getPM", this.queryTX).then((res) => {
            this.tableLoading = false;
            this.nx_tableData = res;
            // get_nx_area(this.queryTX).then((response) => {
            //   this.tableLoading = false;
            //   let data = response.data.data;
            //   data.forEach((item) => {
            //     for (var key in item) {
            //       if (key == "areaName") {
            //         item.plantName = item[key];
            //       }
            //     }
            //   });
            //   this.nx_tableData = res.concat(data);
            // });
          });
        }

        // 显示脱硝年表
        this.$nextTick(() => {
          this.is_tx_show = true;
        });
      }
      // 修改标题
      this.year = moment(this.y).year();
      this.month = this.m;
      this.area_title = this.area;

      // 决定电厂是否可以点击
      this.isClickable = this.clickable;
    },
    // 导出
    onExport() {
      if (this.device == "tlsys_code") {
        if (this.is_tl_xq_show) {
          excel("/datamonitor/desulfurizationSummry/downloadMonth", {
            ...this.queryTLxq,
          }).then((res) => {
            let data = res.data;
            let m = this.m ? this.m + "月" : "";
            let p = this.plant;
            let excelName = `${this.year}年${m}${
              this.area || ""
            }${p}脱硫运行数据统计表.xls`;
            this.excel(data, excelName);
          });
        } else {
          excel("/datamonitor/desulfurizationSummry/downloadYear", {
            ...this.queryTL,
          }).then((res) => {
            let data = res.data;
            let m = this.m ? this.m + "月" : "";
            let a = this.area;
            let excelName = `${this.year}年${m}${a}脱硫运行数据统计表.xls`;
            this.excel(data, excelName);
          });
        }
      } else {
        if (this.is_tx_xq_show) {
          let qry = JSON.parse(JSON.stringify(this.queryTXxq));
          qry.plantName = this.plant_title;
          excel("/datamonitor/noxSmr/expPM", {
            ...qry,
          }).then((res) => {
            let data = res.data;
            let m = this.m ? this.m + "月" : "";
            let excelName = `${this.year}年${m}${this.area || ""}${
              qry.plantName
            }脱硝运行数据统计表.xls`;
            this.excel(data, excelName);
          });
        } else {
          let qry = JSON.parse(JSON.stringify(this.queryTX));
          if (this.area) {
            qry.areaName = this.area;
          } else {
            delete qry.areaName;
          }
          excel(`/datamonitor/noxSmr/${this.m > 0 ? "expPM" : "expPY"}`, {
            ...qry,
          }).then((res) => {
            let data = res.data;
            let m = this.m ? this.m + "月" : "";
            let excelName = `${this.year}年${m}${
              qry.areaName || ""
            }脱硝运行数据统计表.xls`;
            this.excel(data, excelName);
          });
        }
      }
    },
    // 选择区域
    selectArear(data) {
      this.area = data.name ? data.name : "";
      this.queryTL.pointCode = "";
      delete this.queryTX.area;
      if (data.deptCode != "all") {
        this.queryTX.area = data.deptCode;
        this.queryTL.pointCode = data.deptCode;
      }
    },
    //脱硫修改
    onTLEdit(row) {
      // if (hasNoTLData(row) <= 0) {
      //   return this.$message.error("本月暂时不能修改");
      // }
      this.dialogMonth = Number(row.date.split("-")[1]);
      let { heatCapacity, calSulRatio, svGypsumSales, date, val } = row;
      this.rowdata = { heatCapacity, calSulRatio, svGypsumSales, date };
      this.rowdata.area = val.split("_")[0];
      this.rowdata.plant = val.split("_")[1];
      this.tx_xq_dialogShow = true;
      this.dialogVisible = true;
    },
    //脱硝修改
    onTXEdit(row) {
      //更改弹框显示的月份为当前点击的月份
      this.dialogMonth = row.month;
      let { heat: heatCapacity, year, month, area, plant } = row;
      let date = year + "-" + (month > 9 ? month : "0" + month);
      this.rowdata = { heatCapacity, date, area, plant };
      this.tx_xq_dialogShow = false;
      this.dialogVisible = true;
    },
    //取消
    onCancel() {
      this.dialogVisible = false;
    },
    //确定
    onOK() {
      let row = this.rowdata;
      let obj = {};
      for (var key in row) {
        if (row[key]) {
          obj[key] = row[key];
        } else {
          obj[key] = 0;
        }
      }
      de_xq_update(obj)
        .then((res) => {
          if (res.data.msg == "success") {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
          } else {
            return this.$message.error("修改失败");
          }
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
      this.timer = setTimeout(() => {
        if (this.device == "tlsys_code") {
          this.getTlMonthSummary("selectByMon", this.queryTLxq);
        } else {
          this.getTxMonthSummary("getPM", this.queryTXxq);
        }
        this.dialogVisible = false;
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
.container {
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
  .edit {
    .edit-box {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // flex-wrap: wrap;
      align-items: center;
      margin-top: 30px;
      .edit-content {
        width: 100%;
        margin-bottom: 10px;
        // text-align: center;
        .edit-title {
          width: 40%;
          text-align: center;
          display: inline-block;
          // margin-right: 15px;
        }
        .edit-input {
          width: 40%;
        }
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
<template>
  <div class="superEmis" ref="superEmis">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="select__wrap">
              <div>选择时间：</div>
              <div>
                <el-date-picker
                  v-model="time"
                  align="right"
                  type="month"
                  placeholder="选择日期"
                  :clearable="false"
                  :editable="false"
                  size="small"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <SelOrg
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              @selectUnit="selectUnit"
              :showDevice="false"
              :showSystem="false"
            />
          </el-col>
          <el-col :span="4">
            <BtnList
              resetContent="导出"
              btnStyle="textAlign:left;margin-left:32px"
              @check="checkList"
              @reset="onExport"
            />
          </el-col>
        </el-row>
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <span class="title" slot="title">{{this.y}} 年 {{this.m}} 月装置超限、超排统计表</span>
          <div slot="table" v-if="tableShow" v-loading="loading">
            <el-table border :data="tableData" style="width: 100%" :height="tableHeight">
              <el-table-column align="center" prop="areaName" label="区域" width="80" fixed></el-table-column>
              <el-table-column align="center" prop="plantName" label="项目" width="50"></el-table-column>
              <el-table-column align="center" prop="unit" label="机组" width="50">
                <template slot-scope="scope">
                  <span>{{"#"+scope.row.unit.charAt(0)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="type" label="类型" width="50"></el-table-column>
              <el-table-column align="center" prop="idx" label="超限/超排指标" min-width="80"></el-table-column>
              <el-table-column align="center" prop="val" label="超限/超排值(mg/Nm3)" min-width="110"></el-table-column>
              <el-table-column align="center" prop="startTime" label="开始时间" min-width="105"></el-table-column>
              <el-table-column align="center" prop="endTime" label="结束时间" min-width="105"></el-table-column>
              <el-table-column align="center" prop="overHour" label="超限/超排时间(h)" min-width="80"></el-table-column>
            </el-table>
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
import { get_emsOver } from "../../../api/report/superEmis";
import _ from "lodash";
import layoutTable from "../../../components/tableLayout/index";
import { excel } from "@/api/common";
moment.locale("zh-cn");
export default {
  props: {},
  data() {
    return {
      loading: false,
      tableShow: true,
      tableHeight: 600,
      time: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [],
      query: {
        y: moment(Date.now()).year(),
        m: moment(Date.now()).month() + 1
      },
      y:"",
      m:""
    };
  },
  components: {
    layoutTable
  },
  computed: {},
  created() {},
  mounted() {
    this.tableShow = false;
    this.tableHeight = this.$refs.superEmis.offsetHeight - 210;
    this.$nextTick(() => {
      this.tableShow = true;
      this.y = this.query.y;
      this.m = this.query.m;
      this.get_emsOver(this.query);
    });
  },
  watch: {
    time(value) {
      this.query.y = moment(value).year();
      this.query.m = moment(value).month() + 1;
    }
  },
  methods: {
    checkList() {
      if (!this.query.unit) {
        return this.$message.error("请选择电厂");
      }
      this.y = this.query.y;
      this.m = this.query.m;
      this.get_emsOver(this.query);
    },
    onExport() {
      // this.downloadFile("/datamonitor/emsOver/exportStat", this.query);
      excel("/datamonitor/emsOver/exportStat", this.query).then(res => {
        let data = res.data;
        let excelName = `${this.query.y}年${this.query.m}月 装置超限、超排统计表.xls`;
        this.excel(data, excelName);
      });
    },
    selectArear(data) {
      delete this.query.plant;
      delete this.query.unit;
      if (data == "all") {
        this.query = _.omit(this.query, "area");
      } else {
        this.query.area = data.deptCode;
      }
    },
    selectPlant(data) {
      delete this.query.unit;
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        this.query.plant = data.deptCode;
      }
    },
    selectUnit(data) {
      if (data == "all") {
        this.query = _.omit(this.query, "unit");
      } else {
        this.query.unit = data.deviceCode;
      }
    },
    get_emsOver(query) {
      this.loading = true;
      get_emsOver(query).then(res => {
        this.loading = false;
        let midData = res.data.data;
        let datas = [];
        midData.forEach((item, index) => {
          item = {
            ...item,
            idx:
              item.idx == "so2" ? "SO₂" : item.idx == "nox" ? "NOx" : item.idx
          };
          datas.push(item);
        });
        this.tableData = datas;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.superEmis {
  height: 100%;
  .div__tool-wrap {
    padding: 20px 8px;
    .select__wrap {
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
  .div__content-wrap {
    padding: 0 32px;
  }
}
</style>
<style lang="scss">
.superEmis {
  .basic-container .el-card {
    // border-radius: 0px;
  }
  .el-table--border,
  .el-table--group {
    // border: 1px solid #333;
  }
  .avue-crud {
    width: 100%;
  }
  .avue-crud__header {
    margin-bottom: 0px;
  }
  .el-card__body {
    padding: 0;
  }
  .avue-crud__menu {
    height: 0;
    min-height: 0;
    margin-bottom: 0;
  }
  //   .el-table--border,
  //   .el-table--group {
  //     border: 1px solid #333;
  //   }
  //   .el-table--border td,
  //   .el-table--border th,
  //   .el-table__body-wrapper
  //     .el-table--border.is-scrolling-left
  //     ~ .el-table__fixed {
  //     border-right: 1px solid #333;
  //   }
  //   .el-table td,
  //   .el-table th.is-leaf {
  //     border-bottom: 1px solid #333;
  //     border-top: 1px solid #333;
  //   }
  .el-table thead.is-group th {
    background: #fff;
  }
}
.title {
  font-size: 18px;
  font-family: PingFang-SC-Heavy, PingFang-SC;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}
</style>

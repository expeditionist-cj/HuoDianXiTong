<template>
  <div class="start_stop_rp" ref="start_stop_rp">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <el-row :gutter="10">
          <el-col :span="22">
            <SelOrg
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              @selectUnit="selectUnit"
              @selectDevice="selectDevice"
              :showSystem="false"
              :showAll="false"
              :showDeviceAll="false"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="11">
            <div class="select__wrap">
              <div>选择日期段：</div>
              <div>
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :editable="false"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                  :pickerOptions="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="13">
            <BtnList
              resetContent="查询近一月"
              checkContent="查询近一周"
              btnStyle="textAlign:left;margin-left:32px;display:inline-block;width:auto"
              @check= "onWeek"
              @reset="onMonth"
              resetType="primary"
            />
            <BtnList
              resetContent="导出"
              btnStyle="textAlign:left;margin-left:32px;display:inline-block;width:auto"
              @check="checkList"
              @reset="onExport"
            />
          </el-col>
        </el-row>
      </div>
      <div class="div__content-wrap">
        <layOutTable>
          <span
            slot="title"
          >{{this.title.area}}{{this.title.plant}}{{this.title.unit}} {{this.title.type}} 装置启停统计表</span>
          <div slot="table">
            <el-table
              v-if="tableShow"
              v-loading="loading"
              border
              :data="tableData"
              style="width: 100%"
              :height="tableHeight"
              :cell-class-name="addCellClass"
            >
              <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
              <el-table-column align="center" prop="region" label="区域" min-width="120"></el-table-column>
              <el-table-column align="center" prop="project" label="项目" width="120"></el-table-column>
              <el-table-column align="center" prop="crew" label="机组" min-width="120"></el-table-column>
              <el-table-column align="center" prop="device" label="装置" width="120"></el-table-column>
              <el-table-column align="center" prop="stopTime" label="解列时刻" min-width="160" sortable></el-table-column>
              <el-table-column align="center" prop="startTime" label="并网时刻" min-width="160" sortable>
                <!-- <template slot-scope="scope">
                  <span style="color:red">{{scope.row.startTime}}</span>
                </template>-->
              </el-table-column>
              <el-table-column align="center" prop="outageDuration" label="停运时长(h)" min-width="160" sortable>
                <!-- <template slot-scope="scope">
                  
                </template>-->
              </el-table-column>
            </el-table>
          </div>
        </layOutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
import { get_st_sp_rp, get_excel } from "../../../api/report/start_stop_rp";
import _ from "lodash";
import layOutTable from "../../../components/tableLayout/index";
import {excel} from "@/api/common";
moment.locale("zh-cn");
export default {
  props: {},
  data() {
    return {
      loading: false,
      tableShow: true,
      tableHeight: 400,
      time: [
        moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [],
      query: {
        beginTime: moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      },
      title: {
        area: "",
        plant: "",
        unit: "",
        type: ""
      },
      catch: {}
    };
  },
  components: {
    layOutTable
  },
  computed: {},
  created() {},
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.start_stop_rp.offsetHeight - 260;
      this.tableShow = true;
    });
  },
  watch: {
    time(value) {
      this.query.beginTime = value[0];
      this.query.endTime = value[1];
    }
  },
  methods: {
    selectArear(data) {
      delete this.query.plant;
      delete this.query.unit;
      delete this.query.type;
      this.catch.area = data.name + "/";
      if (data == "all") {
        this.query = _.omit(this.query, "area");
      } else {
        this.query.area = data.deptCode;
      }
    },

    selectPlant(data) {
      delete this.query.unit;
      delete this.query.type;
      this.catch.plant = data.name + "/";
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        this.query.plant = data.deptCode;
      }
    },
    selectUnit(data) {
      delete this.query.type;
      this.catch.unit = data.deviceName;
      if (data == "all") {
        this.query = _.omit(this.query, "unit");
      } else {
        this.query.unit = data.deviceCode;
      }
    },
    selectDevice(data) {
      switch (data) {
        // case "all":
        //   this.query = _.omit(this.query, "type");
        //   break;
        case "tlsys_code":
          this.query.type = "S";
          this.catch.type = "脱硫";
          break;
        case "txsys_code":
          this.query.type = "N";
          this.catch.type = "脱硝";
          break;
        default:
          this.query.type = "D";
          this.catch.type = "除尘";
          break;
      }
    },
    onWeek() {
      if (!this.query.unit) {
        this.$message.error("请选择机组");
        return false;
      }
      if (!this.query.type) {
        this.$message.error("请选择装置");
        return false;
      }
      this.title = this.catch;
      let sta = moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      let end = moment().format("YYYY-MM-DD");
      this.time = [sta, end];
      this.$nextTick(()=>{
        this.get_st_sp_rp(this.query);
      })
      
    },
    onMonth() {
      if (!this.query.unit) {
        this.$message.error("请选择机组");
        return false;
      }
      if (!this.query.type) {
        this.$message.error("请选择装置");
        return false;
      }
      this.title = this.catch;
      let sta = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
      let end = moment().format("YYYY-MM-DD");
      this.time = [sta, end];
      this.$nextTick(()=>{
        this.get_st_sp_rp(this.query)
      })
      
    },
    checkList() {
      if (!this.query.unit) {
        this.$message.error("请选择机组");
        return false;
      }
      if (!this.query.type) {
        this.$message.error("请选择装置");
        return false;
      }
      this.title = this.catch;
      this.$nextTick(()=>{
        this.get_st_sp_rp(this.query);
      })
      
    },
    onExport() {
      if (!this.query.unit) {
        this.$message.error("请选择机组");
        return false;
      }
      if (!this.query.type) {
        this.$message.error("请选择装置");
        return false;
      }
      this.title = this.catch;
      // this.downloadFile(
      //   "/datamonitor/startStopStatistics/selectByParamExcel",
      //   this.query
      // );
      // console.log(this.query)
       excel("/datamonitor/startStopStatistics/selectByParamExcel",
        this.query
      ).then(res=>{
        let data = res.data;
        let excelName = `${this.catch.area}${this.catch.plant}${this.catch.unit} 脱硫 装置启停统计表.xlsx`;
        this.excel(data,excelName);
      })
    },
    // 查询报表数据
    get_st_sp_rp(query) {
      this.loading = true;
      return get_st_sp_rp(query).then(res => {
        this.loading = false;
        let data = !res.data.data || res.data.data == "empty" ? [] : res.data.data;
        if (data.length) {
          let obj = {
            startTime: "累计停运时长",
            outageDuration: data[0].total
          };
          data.push(obj);
        }
        this.tableData = data;
      });
    },
    addCellClass({ row, column, rowIndex, columnIndex }) {
      let len = this.tableData.length;
      if (len) {
        if (len - 1 == rowIndex && (columnIndex == 6 || columnIndex == 7)) {
          return "sum-cell";
        }
      }
    },
    //设置title
    setTitle(obj) {
      this.title = _.assign(this.title, obj);
    }
  }
};
</script>

<style scoped lang="scss">
.start_stop_rp {
  height: 100%;
  .div__tool-wrap {
    padding: 20px 30px;
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
.start_stop_rp {
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
  .sum-cell {
    padding: 0 !important;
    background: rgba(237, 241, 251, 1) !important;
    font-size: 16px !important;
    font-family: PingFang-SC-Bold, PingFang-SC !important;
    font-weight: bold !important;
    color: rgba(63, 158, 255, 1) !important;
    border: 1px solid rgba(220, 223, 230, 1);
  }
}
</style>

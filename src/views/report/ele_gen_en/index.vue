<template>
  <div class="ele_gen_en" ref="ele_gen_en">
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
                  size="small"
                  :clearable="false"
                  :editable="false"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <SelOrg
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              :showDevice="false"
              :showSystem="false"
              :showUnit="false"
              :showAll="false"
            />
          </el-col>
          <el-col :span="5">
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
          <span slot="title"
            >{{ y }} 年 {{ m }} 月 {{ area }}/{{
              plant
            }}
            脱硫脱硝装置发电量统计表</span
          >
          <div class="content-table" slot="table" v-if="tableShow">
            <avue-crud
              ref="crud"
              :data="tableData"
              :table-loading="tableLoading"
              :option="tableOption"
            ></avue-crud>
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
import _ from "lodash";
import { tableOption } from "../../../const/crud/report/ele_gen_en";
import { rd_clm } from "./util";
import { get_device_power } from "../../../api/report/ele_gen_en";
import layoutTable from "../../../components/tableLayout/index";
import {excel} from "@/api/common";
moment.locale("zh-cn");
let area = "";
let plant = "";
export default {
  props: {},
  data() {
    return {
      tableLoading: false,
      tableOption: tableOption,
      tableHeight: 400,
      time: Date.now(),
      y: moment(Date.now()).year(),
      m: moment(Date.now()).month() + 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [],
      query: {
        year: moment(Date.now()).year(),
        month: moment(Date.now()).month() + 1
      },
      area: "",
      plant: "",
      tableShow: true
    };
  },
  components: {
    layoutTable
  },
  computed: {},
  created() {},
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableOption.column = rd_clm(["#1", "#2"]);
      this.tableOption.height = this.$refs.ele_gen_en.offsetHeight - 230;
      this.tableShow = true;
    });
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year();
      this.query.month = moment(value).month() + 1;
    }
  },
  methods: {
    checkList() {
      if (!this.query.projectCode) {
        return this.$message.error("请选择电厂");
      }
      this.y = this.query.year;
      this.m = this.query.month;
      this.area = area;
      this.plant = plant;
      this.get_device_power(this.query);
    },
    onExport() {
      if(!this.query.projectCode){
        return this.$message.error('请先选择电厂');
      }
      // http://192.168.59.7:9999/datamonitor/device_power/export?projectCode=ELXM&year=2019&month=12
      // this.downloadFile("/datamonitor/device_power/export", {
      //   ...this.query,
      //   plantName: plant
      // });
      excel("/datamonitor/device_power/export",{
        ...this.query,
        plantName: plant
      }).then(res=>{
        let data = res.data;
        let excelName = `${this.y}年${this.m}月 ${this.area}/${this.plant} 脱硫脱硝装置发电量统计表.xls`;
        this.excel(data,excelName);
      })
    },
    selectArear(data) {
      area = data.name;
      this.query = _.omit(this.query, "projectCode");
    },
    selectPlant(data) {
      if (data == "all") {
        this.query = _.omit(this.query, "projectCode");
      } else {
        plant = data.name;
        this.query.projectCode = data.deptCode;
      }
    },
    get_device_power(query) {
      this.tableLoading = true;
      return get_device_power(query).then(res => {
        this.tableLoading = false;
        this.tableShow = false;
        let { units, unitDataList } = res.data.data;
        this.tableOption.column = rd_clm(units);
        // 下一个队列执行
        this.$nextTick(() => {
          this.tableData = unitDataList;
          this.tableShow = true;
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.ele_gen_en {
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
    .content-table {
      padding-bottom: 20px;
    }
  }
}
</style>
<style lang="scss">
.ele_gen_en {
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
  .el-table thead.is-group th {
    background: #fff;
  }
}
</style>

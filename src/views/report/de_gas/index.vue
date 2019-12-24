<template>
  <div class="de_gas" ref="de_gas">
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
          <span slot="title" class="title">
            <u class="u">{{ y }}</u> 年 <u class="u">{{ m }} </u> 月
            <u class="u">{{area_plant}}</u> 脱硫装置排放连续检测日平均值月报表</span
          >
          <div class="content-table" ref="zcurd" slot="table" v-if="tableShow" v-loading="tableLoading">
              <Zcurd :height="tableHeight" :sums="sums" :unitList="unitList" :tableData="tableData" />
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import layoutTable from "../../../components/tableLayout/index";
import {get_de_gas} from "../../../api/report/de_gas"
import moment from "moment";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud" ;
let area = "";
let plant = "";
export default {
  props: {},
  data() {
    return {
      tableLoading: false,
      tableHeight: 400,
      y: moment(Date.now()).year(),
      m: moment(Date.now()).month() + 1,
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
      area: "",
      plant: "",
      area_plant:"",
      tableShow: true,
      unitList:['1','2'],
      sums:{}
    };
  },
  components: { layoutTable,Zcurd },
  computed: {},
  created() {},
  mounted() {
      
      this.tableShow = false;
      this.$nextTick(()=>{
        this.tableHeight = this.$refs.de_gas.offsetHeight - 230;
        this.tableShow = true;
      })
  },
  watch: {
      time(value) {
      this.query.y = moment(value).year();
      this.query.m = moment(value).month() + 1;
    }
  },
  methods: {
    checkList() {
      if (!this.query.plant) {
        return this.$message.error("请选择电厂");
      }
      this.y = this.query.y;
      this.m = this.query.m;
      this.area_plant = area+"/"+plant;
      this.get_de_gas(this.query)
    },
    onExport() {
      if (!this.query.plant) {
        this.$message.error("请选择机组");
        return false;
      }
      this.downloadFile('/datamonitor/emsOver/so2Exp',{...this.query,plantName:plant})
    },
    selectArear(data) {
      area = data.name;
      delete this.query.plant;
    },
    selectPlant(data) {
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        plant = data.name;
        this.query.plant = data.deptCode;
      }
    },
    get_de_gas(query){
      this.tableLoading = true;
      get_de_gas(query).then(res=>{
        this.tableLoading = false;
        let data = res.data.data;
        let {units,dataList,sums,maxs,mins,avgs} = data;
        this.unitList = units;
        maxs.dy = "最大值";
        mins.dy = "最小值";
        avgs.dy = "平均值";
        dataList.push(avgs);
        dataList.push(maxs);
        dataList.push(mins);
        this.tableData = dataList;
        this.sums = sums;
        
      })
    }
  }
};
</script>

<style scoped lang="scss">
.de_gas {
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
    .u {
      // padding: 20px
    }
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
<style lang="scss">
.de_gas {
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
  .el-table__fixed-footer-wrapper tbody td{
    background-color:#fff;
  }
  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
    background-color:#fff;
  }
}
</style>

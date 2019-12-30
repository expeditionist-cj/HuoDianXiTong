<template>
  <div class="craft">
    <CardLayout :cardStyles="style">
      <div class="craft__wrap">
        <div class="craft__tool">
          <el-row :gutter="10">
            <el-col :span="20">
              <!-- 组织机构选择 -->
              <SelOrg
                @selectArear="selectArear"
                @selectPlant="selectPlant"
                @selectUnit="selectUnit"
                @selectSystem="selectSystem"
                @selectDevice="selectDevice"
                ref="myorg"
              />
            </el-col>
            <el-col :span="4">
              <!-- 按钮 -->
              <BtnList btnStyle="textAlign:center" @check="checkList" @reset="setReset" />
            </el-col>
          </el-row>
        </div>

        <!-- 工艺流程图 -->
        <div class="craft__content">
          <div class="nodata" style="height:100%" v-if="showCraft">
              <div>暂无工艺流程图</div> 
          </div>
          <div style="height:100%" v-else>
              <OneCraft :iframeSrc="oneCraftSrc" v-if="displayCraft == 1" />
            <MultipleCraft :srcList="srcList" v-else />
          </div>

          
        </div>

        <!-- 分页 -->
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[1,4]"
            layout="sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </CardLayout>
  </div>
</template>

<script>
import CardLayout from "@/components/cardLayout/index";
import MultipleCraft from "./multipleCraft";
import OneCraft from "./oneCraft";
import { getCraftPage } from "@/api/datamon/productmonitor";
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import { craftUrl } from "@/config/env.js";
export default {
  props: {},
  data() {
    return {
      showCraft:false,
      reset: false,
      data: "this is craft",
      style: "height: calc(100% - 48px);min-height: 629px;",
      displayCraft: 1,
      srcList: [],
      fetchAlarmTableDataQuery: {},
      page: {
        size: 1,
        current: 1
      },
      total: 0,
      currentPage: 1,
      oneCraftSrc: "",
      multipleCraftSrc: ""
    };
  },
  components: {
    CardLayout,
    MultipleCraft,
    OneCraft,
    SelOrg,
    BtnList
  },
  computed: {},
  created() {},
  mounted() {
    this.getCraftPage({
      ...this.page
    })
  },
  watch: {},
  methods: {
    getCraftPage(query) {
      return getCraftPage(query).then(response => {
        let {
          data,
          data: { code, data:{total,records} }
        } = response;
        this.total = total;
        if(!records.length){
          this.showCraft = true;
          return false
        }else{
          this.showCraft = false;
        }
        if (this.displayCraft == 1) {
          this.oneCraftSrc = craftUrl(records[0].pdFileName);
        } else {
          this.srcList = records.map(item => {
            return craftUrl(item.pdFileName);
          });
        }
       
      });
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.displayCraft = val;
      this.page.size = val;
      this.page.current = 1;
      this.currentPage = 1;
      this.getCraftPage({
        ...this.page,
        ...this.fetchAlarmTableDataQuery
      })
    },
    // 改变页码
    handleCurrentChange(val) {
      this.page.current = val;
      this.currentPage = val;
      this.getCraftPage({
        ...this.page,
        ...this.fetchAlarmTableDataQuery
      })
    },
    // 重置
    setReset() {
      this.$refs.myorg.reset1()
      this.fetchAlarmTableDataQuery = {};
      this.page.current = 1;
      this.currentPage = 1;
    },
    // 点击查询
    checkList() {
      this.getCraftPage({
        ...this.page,
        ...this.fetchAlarmTableDataQuery
      })
    },
    selectArear(data) {
      delete this.fetchAlarmTableDataQuery.plant;
      delete this.fetchAlarmTableDataQuery.unit;
      delete this.fetchAlarmTableDataQuery.sys;
      delete this.fetchAlarmTableDataQuery.pd_cn;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "region"
        );
      } else {
        this.fetchAlarmTableDataQuery.region = data.deptCode;
      }
    },
    selectPlant(data) {
      delete this.fetchAlarmTableDataQuery.unit;
      delete this.fetchAlarmTableDataQuery.sys;
      delete this.fetchAlarmTableDataQuery.pd_cn;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "plant"
        );
      } else {
        this.fetchAlarmTableDataQuery.plant = data.deptCode;
      }
    },
    selectUnit(data) {
      delete this.fetchAlarmTableDataQuery.sys;
      delete this.fetchAlarmTableDataQuery.pd_cn;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "unit"
        );
      } else {
        this.fetchAlarmTableDataQuery.unit = data.deviceCode;
      }
    },
    selectDevice(data) {
      delete this.fetchAlarmTableDataQuery.pd_cn;
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "sys"
        );
      } else {
        this.fetchAlarmTableDataQuery.sys = data;
      }
    },
    selectSystem(data) {
      if (data == "all") {
        this.fetchAlarmTableDataQuery = _.omit(
          this.fetchAlarmTableDataQuery,
          "pd_cn"
        );
      } else {
        this.fetchAlarmTableDataQuery.pd_cn = data.type;
      }
    }
  }
};
</script>
<style lang="scss">
.craft__tool {
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
    height: 72px;
    padding-top: 24px;
    margin-bottom: 16px;
  }
  .craft__content {
    height: calc(100% - 144px);
    .nodata{
      display: flex;
      
      &>div{
        margin:auto;
        font-size: 16px;
        color: red;
      }
    }
  }
  .page {
    height: 72px;
    text-align: right;
    padding: 16px 0;
    margin-right: -10px;
  }
}
</style>


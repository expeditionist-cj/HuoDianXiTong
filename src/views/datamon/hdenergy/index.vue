<template>
  <div class="hdenergy">
    <basic-container>
      <div class="tool__wrap">
        <el-row :gutter="10">
          <el-col :span="18">
            <SelOrg
              :showSystem="false"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              @selectUnit="selectUnit"
              @selectDevice="selectDevice"
            />
          </el-col>
          <el-col :span="5">
            <div class="select__wrap">
              <div>统计方式：</div>
              <div>
                <el-select  size="small" v-model="way" placeholder="请选择">
                  <el-option
                    v-for="(item,idx) in wayOptions "
                    :key="idx"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="1">
            <BtnList @check="checkList" :showRest="false" />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="selectOrg clearfix">
              <div class="item">
                <div>
                  <div>统计时长：</div>
                  <div>
                    <el-select size="small" v-model="time" placeholder="请选择">
                      <el-option
                        v-for="(item,idx) in timeOptions"
                        :key="idx"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
      ></avue-crud>
    </basic-container>
  </div>
</template>

<script>
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/datamon/hdenergy";
import { tableOption } from "@/const/crud/datamon/hdenergy";
import { mapGetters } from "vuex";

export default {
  name: "hdenergy",
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      wayOptions: [
        {
          label: "按减排统计",
          value: "E"
        },
        {
          label: "按发电量统计",
          value: "P"
        }
      ],
      time: "W",
      way: "E",
      timeOptions: [
        {
          label: "按周",
          value: "W"
        },
        {
          label: "按月",
          value: "M"
        },
        {
          label: "按年",
          value: "Y"
        }
      ],
      query: {
        way:"W",
        category:"E"
      }
    };
  },
  components: {
    SelOrg,
    BtnList
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.datamonitor_hdenergy_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.datamonitor_hdenergy_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.datamonitor_hdenergy_edit,
          false
        )
      };
    }
  },
  watch:{
    // 统计时长
    time(value){
      this.query.way = value
    },
    // 统计方式
    way(value){
      this.query.category = value
    }
  },
  methods: {
    getList(page, params=this.query) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
        this.page.currentPage = response.data.data.current;
      });
    },
        // 点击查询
    checkList() {
      this.page.currentPage = 1;
      console.log(this.query);
      this.getList(this.page, this.query);
    },
    // 区域
    selectArear(data) {
      delete this.query.projectCode;
      delete this.query.unitCode;
      delete this.query.deviceCode
      if (data == "all") {
        this.query = _.omit(this.query, "regionCode");
      } else {
        this.query.regionCode = data.deptCode;
      }
    },
    // 电厂
    selectPlant(data) {
      delete this.query.unitCode;
      delete this.query.deviceCode
      if (data == "all") {
        this.query = _.omit(this.query, "projectCode");
      } else {
        this.query.projectCode = data.deptCode;
      }
    },
    // 机组
    selectUnit(data) {
       delete this.query.deviceCode
      if (data == "all") {
        this.query = _.omit(this.query, "unitCode");
      } else {
        this.query.unitCode = data.deviceCode;
      }
    },
    // 装置
    selectDevice(data) {
      switch (data) {
        case "all":
          this.query = _.omit(this.query, "deviceCode");
          break;
        case "tlsys_code":
          this.query.deviceCode = "S";
          break;
        case "txsys_code":
          this.query.deviceCode = "N";
          break;
        default:
          this.query.deviceCode = "D";
          break;
      }
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.hdenergy {
  .tool__wrap {
    padding: 0 8px;
    .select__wrap {
      height: 42px;
      line-height: 42px;
      display: table;
      width: 100%;
      padding-left: 10%;
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
    .selectOrg {
      height: 42px;
      margin-left: -10px;

      .item {
        width: 25%;
        float: left;
        padding-left: 0;
        height: 100%;
        & > .btn__div {
          text-align: right;
        }
        & > div {
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
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        height: 100%;
        & > .btn__div {
          text-align: right;
        }
        & > div {
          height: 42px;
          line-height: 42px;
          display: table;
          width: 100%;

          & > div:nth-child(1) {
            display: table-cell;
            width: 0.1%;
            width: 90px;
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
    }
  }
}
</style>
<style lang="scss">
.hdenergy {
  .checkAndResetBtn {
    text-align: center;
    // padding-left: 20%;
  }
}
</style>

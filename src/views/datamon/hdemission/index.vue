<template>
  <div class="hdelectricity">
    <basic-container>
      <div class="tool__wrap">
        <!-- <SelOrg
              :showSystem="false"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              @selectUnit="selectUnit"
              @selectDevice="selectDevice"
        />-->
        <div style="margin-left:20px;display:flex;align-items:center;">
          <div style="width: 80px;">区域/项目：</div>
          <cascade @onMyCascader="onMyCascader" :showAll="showAll"></cascade>
        </div>
        <div style="margin-left:20px;display:flex;align-items:center;">
          <div style="width: 80px;">统计时长：</div>
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
        <div style="margin-left:20px">
          <BtnList :showRest="false" @check="checkList" />
        </div>
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
import cascade from "@/components/selectOrg/index11.vue";
// import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/datamon/hdemission";
import { tableOption } from "@/const/crud/datamon/hdemission";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "hdemission",
  data() {
    return {
      showAll: false,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      timeOptions: [
        {
          label: "按日",
          value: "D"
        },
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
      time: "D",
      query: {}
    };
  },
  components: {
    // SelOrg,
    cascade,
    BtnList
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.datamonitor_hdelectricity_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.datamonitor_hdelectricity_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.datamonitor_hdelectricity_edit,
          false
        )
      };
    }
  },
  mounted() {
    // this.getList(this.page, { });
    // 根据登录用户角色，决定筛选条件中是否显示全部公司
    this.identity = this.$store.state.writeData.identity;
    if (
      this.identity == "ROLE_ADMIN" ||
      this.identity == "ROLE_Analysiser" ||
      this.identity == "ROLE_Supervisor"
    ) {
      this.showAll = true;
    }
  },
  methods: {
    getList(page, params = { ...this.query, way: this.time }) {
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
        let {
          data,
          data: { code, data: res }
        } = response;
        this.tableData = res.records;
        this.page.total = res.total;
        this.page.currentPage = res.current;
        this.page.pageSize = res.size;
        this.tableLoading = false;
      });
    },
    // 点击查询
    checkList() {
      this.page.currentPage = 1;
      this.getList(this.page, { ...this.query, way: this.time });
    },
    onMyCascader(data) {
      // if (!data.unit) {
      //   return this.$message("请选择机组");
      // }
      if (data.area == "all") {
        delete this.query.regionCode;
      } else {
        this.query.regionCode = data.area;
      }
      this.query.projectCode = data.plant;
      this.query.unitCode = data.unit;
      this.query.deviceCode = data.sys;
      this.checkList();
    }
    // selectArear(data) {
    //   delete this.query.projectCode;
    //   delete this.query.unitCode;
    //   delete this.query.deviceCode;
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "regionCode");
    //   } else {
    //     this.query.regionCode = data.deptCode;
    //   }
    // },
    // selectPlant(data) {
    //   delete this.query.unitCode;
    //   delete this.query.deviceCode;
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "projectCode");
    //   } else {
    //     this.query.projectCode = data.deptCode;
    //   }
    // },
    // selectUnit(data) {
    //   delete this.query.deviceCode;
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "unitCode");
    //   } else {
    //     this.query.unitCode = data.deviceCode;
    //   }
    // },
    // selectDevice(data) {
    //   switch (data) {
    //     case "all":
    //       this.query = _.omit(this.query, "deviceCode");
    //       break;
    //     case "tlsys_code":
    //       this.query.deviceCode = "S";
    //       break;
    //     case "txsys_code":
    //       this.query.deviceCode = "N";
    //       break;
    //     default:
    //       this.query.deviceCode = "D";
    //       break;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.hdelectricity {
  .tool__wrap {
    padding: 0 8px;
    display: flex;
    align-items: center;
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
  }
}
</style>
<style lang="scss">
.hdelectricity {
  .checkAndResetBtn {
    text-align: center;
    // padding-left: 20%;
  }
}
</style>

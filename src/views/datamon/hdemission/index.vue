<template>
  <div class="hdelectricity">
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
          </el-col>
          <el-col :span="1">
            <BtnList :showRest="false" @check="checkList" />
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
} from "@/api/datamon/hdemission";
import { tableOption } from "@/const/crud/datamon/hdemission";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "hdemission",
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
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
    SelOrg,
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
  },
  methods: {
    getList(page, params={...this.query, way: this.time }) {
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
    selectPlant(data) {
      delete this.query.unitCode;
      delete this.query.deviceCode
      if (data == "all") {
        this.query = _.omit(this.query, "projectCode");
      } else {
        this.query.projectCode = data.deptCode;
      }
    },
    selectUnit(data) {
      delete this.query.deviceCode;
      if (data == "all") {
        this.query = _.omit(this.query, "unitCode");
      } else {
        this.query.unitCode = data.deviceCode;
      }
    },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.hdelectricity {
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

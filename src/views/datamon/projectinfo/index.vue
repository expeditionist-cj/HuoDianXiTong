<template>
  <div class="deviceSystem">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div style="display: flex; align-items: center">
        <div style="margin-left: 20px; display: flex; align-items: center">
          <div style="min-width: 100px">区域/项目：</div>
          <cascade
            @onMyCascader="onMyCascader"
            :unitIsDeviceId="false"
            :showAll="false"
            :showSys="false"
          ></cascade>
        </div>
        <BtnList
          :showRest="false"
          btnStyle="textAlign:left;margin-left:32px"
          @check="checkList"
        />
      </div>
      <!-- <SelOrg
            @selectArear="selectArear"
            @selectPlant="selectPlant"
            @selectUnit="selectUnit"
            :showDevice="false"
            :showSystem="false"
          /> -->

      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @sort-change="sortChange"
      >
        <template slot="remark" slot-scope="scope">
          <div
            @click="clickDetail(scope)"
            style="
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              color: rgba(63, 158, 255, 1);
            "
          >
            详细 >>
          </div>
        </template>
      </avue-crud>
    </Card>
    <el-dialog title="项目简介" :visible.sync="dialogVisible" width="50%">
      <span slot="title" style="font-size: 18px; color: rgba(0, 0, 0, 1)"
        >项目简介</span
      >
      <div class="detail__content">
        <div class="detail__content-text">{{ detaiText }}</div>
        <div class="detail__content-params clearfix">
          <div class="fl height100">
            <DetailTable :data="detailTableData" />
          </div>
          <div class="fl height100">
            <TXDetailTable :data="detailTableData" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import { fetchList, getDetail } from "@/api/datamon/sysdevice";
import { tableOption } from "@/const/crud/datamon/sysdevice";
import { mapGetters } from "vuex";
import DetailTable from "./detailTable";
import TXDetailTable from "./detailTableTX";
import _ from "lodash";

export default {
  name: "projectinfo",
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
      unitId: "",
      dialogVisible: false,
      detaiText: "sadfasdfasdfasdfasdfasdfasdf",
      detailTableData: {},
    };
  },
  components: {
    DetailTable,
    TXDetailTable,
    cascade,
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  mounted() {
    window.app = this;
  },
  watch: {},
  methods: {
    // 分页查询
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then((response) => {
        this.tableData = response.data.data.records.map((item) => {
          item.capacity = item.capacity * 1;
          return item;
        });
        this.page.total = response.data.data.total;
        this.page.currentPage = response.data.data.current;
        this.page.pageSize = response.data.data.size;
        this.tableLoading = false;
      });
    },
    // 项目详情
    async getDetail(query) {
      let {
        data,
        data: { code, data: res },
      } = await getDetail(query);
      return res;
    },
    // 点击查询
    checkList() {
      let { unitId, page } = this;
      page = Object.assign(page, {
        current: 1,
        size: page.pageSize,
      });
      this.page.currentPage = 1;
      if (!this.unitId) {
        this.$message({
          message: "请选择机组",
          type: "warning",
        });
        return false;
      }
      this.getList(page, {
        regionId: "",
        projectId: "",
        unitId: this.unitId == "all" ? "" : unitId,
      });
    },
    // selectUnit(value) {
    //   this.unitId = value.deviceId || value;
    // },
    // selectArear() {
    //   this.unitId = "";
    // },
    // selectPlant() {
    //   this.unitId = "";
    // },
    onMyCascader(data) {
      if (!data.unit) {
        return this.$message("请选择机组");
      }
      this.unitId = data.unit;
      this.checkList();
    },
    // 点击详情
    clickDetail(scope) {
      let {
        row: { unitId, remark },
      } = scope;

      this.dialogVisible = true;
      this.detaiText = remark || "暂无数据";
      this.getDetail(unitId).then((res) => {
        let obj = {};
        _.forOwn(res, (value, key) => {
          obj[key] = value || "暂无数据";
        });
        res = Object.assign({
          ...res,
          ...obj,
        });
        this.detailTableData = res;
      });
    },
    sortChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.deviceSystem {
  padding: 0 0px;
  .detail__content {
    .detail__content-text {
      min-height: 59px;
      border-radius: 6px;
      border: 1px solid rgba(232, 232, 232, 1);
      margin-bottom: 8px;
      margin-top: -20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(37, 37, 37, 1);
      line-height: 20px;
      padding: 10px 16px;
    }
    .detail__content-params {
      min-height: 201px;

      & > div {
        width: calc(calc(100% - 10px) / 2);
        border: 1px solid rgba(232, 232, 232, 1);
        border-radius: 6px;
      }
      & > div:nth-child(1) {
        margin-right: 8px;
      }
    }
  }
}
</style>

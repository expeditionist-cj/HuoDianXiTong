<template>
  <div class="product-brief-wrap">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="tool-wrap">
        <div class="tool-time-box">
          <span class="time-title">选择日期：</span>
          <el-date-picker
            style="display: inline-block"
            v-model="time"
            align="right"
            type="date"
            placeholder="选择日期"
            size="small"
            :clearable="false"
            :editable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div class="tool-org-box">
          <SelOrg
            @selectArear="selectArear"
            :showPlant="false"
            :showDevice="false"
            :showSystem="false"
            :showUnit="false"
            :showAll="false"
          />
        </div>
        <div class="tool-btn-box">
          <BtnList
            style="width: auto; display: inline-block"
            resetContent="导出"
            btnStyle="textAlign:left;margin-left:32px"
            @check="checkList"
            @reset="onExport"
          />
          <!-- <el-button
            @click="onEdit"
            class="el-button"
            size="mini"
            type="primary"
            >填写</el-button
          >-->
        </div>
      </div>
      <div class="table-wrap">
        <layoutTable>
          <span class="title" slot="title">
            <!-- <span>智能环保运营中心</span> -->
            <span></span>
            <span>
              <!-- <span class="area-box">{{ area }}/{{ plant }}</span> -->
              生产简报
            </span>
            <span
              >{{ this.query.year + "年" }}{{ this.query.month + "月"
              }}{{ this.query.day + "日" }}</span
            >
          </span>

          <div class="content-table" slot="table">
            <Table
              :cc="cc"
              :ts="ts"
              :tx="tx"
              :deviceStatus="deviceStatus"
              :sum="sum"
              :other="other"
            ></Table>
          </div>
        </layoutTable>
      </div>
      <!-- 其它情况说明填写情况 -->
      <el-dialog title="其它情况说明" :visible.sync="dialogTableVisible">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          maxlength="100"
          show-word-limit
          autofocus
          clear
          v-model="textarea"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="onCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="onOk">确 定</el-button>
        </span>
      </el-dialog>
    </Card>
  </div>
</template>

<script>
import layoutTable from "../../../components/tableLayout/index";
import Table from "./table.vue";
import { get, add } from "@/api/report/product_brief";
import moment from "moment";
import { excel } from "@/api/common";
let area = "";
let plant = "";
export default {
  name: "produce_brief",
  props: {},
  data() {
    return {
      time: Date.now() - 1000 * 60 * 60 * 24,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      area: "XX",
      plant: "XX",
      query: {
        year: moment().subtract(1, "days").year().toString(),
        month:
          moment().subtract(1, "days").month() + 1 > 9
            ? (moment().subtract(1, "days").month() + 1).toString()
            : "0" + (moment().subtract(1, "days").month() + 1),
        day:
          moment(Date.now() - 1000 * 60 * 60 * 24).get("date") > 9
            ? moment(Date.now() - 1000 * 60 * 60 * 24).get("date")
            : "0" + moment(Date.now() - 1000 * 60 * 60 * 24).get("date"),
        org: '',
      }, // 查询条件
      dialogTableVisible: false,
      textarea: "",
      cc: {},
      ts: {},
      tx: {},
      deviceStatus: {},
      sum: {},
      other: "",
      areaName: ""
    };
  },
  components: { layoutTable, Table },
  computed: {},
  created() {},
  mounted() {
    this.checkList();
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month =
        moment(value).month() + 1 > 9
          ? (moment(value).month() + 1).toString()
          : "0" + (moment(value).month() + 1);
      this.query.day =
        moment(value).get("date") > 9
          ? moment(value).get("date")
          : "0" + moment(value).get("date");
    },
    dialogTableVisible(value) {
      if (!value) {
        this.textarea = "";
      }
    },
  },
  methods: {
    selectArear(data) {
      this.query.org = data.deptCode == "all" ? '' : data.deptCode;
      this.areaName = data.name || "";
      this.checkList();
    },
    // selectPlant(data) {
    //   plant = data.name;
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.projectCode = data.deptCode;
    //   }
    // },
    checkList() {
      get(this.query)
        .then((res) => {
          let data = res.data.data;
          let { cc, ts, tx, deviceStatus, other, sum } = data;
          this.cc = cc;
          this.ts = ts;
          this.tx = tx;
          this.other = other;
          this.deviceStatus = deviceStatus;
          this.sum = sum;
        })
        .catch((err) => {
          this.cc = {};
          this.ts = {};
          this.tx = {};
          this.other = "";
          this.deviceStatus = {};
          this.sum = {};
        });
    },
    onExport() {
      excel("/datamonitor/hdproductionbrief/download", {
        ...this.query,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.query.year}年 ${this.query.month}月 ${this.query.day}日 ${this.areaName} 生产简报.xls`;
        this.excel(data, excelName);
      });
    },
    onEdit() {
      this.dialogTableVisible = true;
      this.textarea = this.other;
    },
    // 取消编辑
    onCancel() {
      this.dialogTableVisible = false;
    },
    // 确认编辑
    onOk() {
      if (!this.textarea) {
        return this.$message.error("情况说明不能为空");
      }
      add({ ...this.query, remark: this.textarea })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.$message.success("修改修改成功");
            this.timer = setTimeout(() => {
              this.checkList();
              this.dialogTableVisible = false;
            }, 300);
          } else {
            return this.$message.error("修改失败");
          }
        })
        .catch((e) => {
          return this.$message.error(e);
        });
    },
  },
};
</script>

<style scoped lang="less">
.product-brief-wrap {
  height: 100%;
  display: flex;
  .tool-wrap {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    height: 60px;
    .tool-time-box {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .time-title {
        display: inline-block;
        width: 40%;
        margin-right: 10px;
      }
    }
    .tool-org-box {
      margin-right: 20px;
    }
    .tool-btn-box {
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .table-wrap {
    flex: 1;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 800;
      .area-box {
        display: inline-block;
        height: 80%;
        border-bottom: 2px solid #333333;
      }
    }
  }
}
</style>

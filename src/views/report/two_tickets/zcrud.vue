<template>
  <div class="zcrud">
    <el-table
      :data="zcrudTableData"
      border
      style="width: 100%; min-height: 550px"
      size="small"
      :height="height"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        align="center"
        label="序号"
        prop="sort"
      ></el-table-column>
      <el-table-column
        align="center"
        label="类别"
        prop="ticketType"
      ></el-table-column>
      <el-table-column align="center" label="专业" prop="major">
        <template slot-scope="scope">
          <div :class="{toLeft : scope.row.merged}">
            {{ scope.row.major }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="总票数"
        prop="total"
      ></el-table-column>
      <el-table-column
        align="center"
        label="已执行"
        prop="optEd"
      ></el-table-column>
      <el-table-column
        align="center"
        label="作废"
        prop="canceled"
      ></el-table-column>
      <el-table-column
        align="center"
        label="不合格"
        prop="unqualified"
      ></el-table-column>
      <el-table-column
        align="center"
        label="合格"
        prop="qualified"
      ></el-table-column>
      <el-table-column
        align="center"
        label="合格率(%)"
        prop="rate"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import myInputs from "@/components/myInputs";
import { hasDays, hasValue } from "./util";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      zcrudTableData: [],
      sort: [],
      pos_sort: 0,
      ticketType: [],
      pos_ticketType: 0,
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  components: {
    myInputs,
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    tableData(value) {
      this.getsort(value);
      this.getticketType(value);
      this.zcrudTableData = value;
    },
  },
  methods: {
    // 合并第一列的行
    getsort(data) {
      this.sort = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.sort.push(1);
          this.pos_sort = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].sort === data[i - 1].sort) {
            this.sort[this.pos_sort] += 1;
            this.sort.push(0);
          } else {
            this.sort.push(1);
            this.pos_sort = i;
          }
        }
      }
    },
    // 合并第二列的行
    getticketType(data) {
      this.ticketType = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.ticketType.push(1);
          this.pos_ticketType = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].ticketType === data[i - 1].ticketType) {
            this.ticketType[this.pos_ticketType] += 1;
            this.ticketType.push(0);
          } else {
            this.ticketType.push(1);
            this.pos_ticketType = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let _row = this.sort[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 1) {
        let _row = this.ticketType[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 2) {
        if (row.merged == true) {
          return {
            rowspan: 1,
            colspan: 7,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
    },
  },
  destroyed() {},
};
</script>

<style scoped lang="scss">
.zcrud {
  width: 100%;
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
  .toLeft {
    text-align: left;
  }
}
._title {
  height: 30px;
  text-align: center;
  background: rgba(241, 241, 241, 0.4);
  border-radius: 6px 6px 0px 0px;
  opacity: 0.8;
  span {
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: rgba(37, 37, 37, 1);
  }
}
.change_left {
  min-width: 240px;
  height: 778px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.xsj_container {
  padding: 20px;
  // min-width: 300px;
  height: 746px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shsf_ems {
  display: flex;
  flex-direction: column;
}
.shsf_title {
  height: 26px;
  font-size: 14px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 26px;
  margin-bottom: 10px;
}
.shsf_inputs {
  display: flex;
  // flex-flow: wrap;
  flex-direction: column;
}
.shsf_tongji {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 12px 0 0;
}

.change_center {
  min-width: 240px;
  height: 778px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.change_right {
  min-width: 240px;
  height: 778px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .hs_sg_box {
    height: 233px;
    border-radius: 6px;
    border: 1px solid rgba(232, 232, 232, 1);
  }
  .hq_box {
    height: 207px;
    border-radius: 6px;
    border: 1px solid rgba(232, 232, 232, 1);
  }
}
</style>

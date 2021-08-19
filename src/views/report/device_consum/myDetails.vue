<template>
  <div class="myDetails">
    <div class="div__tool-wrap">
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
    </div>
    <div class="div__content-wrap">
      <div class="title" slot="title">
        {{ this.plantName }} {{ this.detailsTime }} 设备电耗统计表
      </div>
      <div slot="table" class="tables">
        <div>单位：万kWh</div>
        <el-table
          border
          size="small"
          class="my-tabel"
          v-if="rowData.xh_pump && rowData.xh_pump.length > 0"
          :data="rowData.xh_pump"
        >
          <el-table-column label="循环泵" align="center" width="120px">
            <template slot-scope="scope">
              {{ scope.row.unit ? "#" + scope.row.unit.slice(0, 1) : "" }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in rowData.xh_pump[0].pumps"
            :key="index"
            :label="item.name"
            align="center"
            width="120px"
            :prop="item.name"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="total_rate"
            label="耗电率(%)"
            align="center"
            width="120px"
          >
          </el-table-column>
        </el-table>
        <el-table
          border
          size="small"
          class="my-tabel"
          v-if="rowData.yh_fan && rowData.yh_fan.length > 0"
          :data="rowData.yh_fan"
        >
          <el-table-column label="氧化风机" align="center" width="120px">
            <template slot-scope="scope">
              {{ scope.row.unit ? "#" + scope.row.unit.slice(0, 1) : "" }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in rowData.yh_fan[0].pumps"
            :key="index"
            :label="item.name"
            align="center"
            width="120px"
            :prop="item.name"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="total_rate"
            label="耗电率(%)"
            align="center"
            width="120px"
          >
          </el-table-column>
        </el-table>
        <el-table
          border
          size="small"
          class="my-tabel"
          v-if="rowData.zk_pump && rowData.zk_pump.length > 0"
          :data="rowData.zk_pump"
        >
          <el-table-column align="center" width="120px">
            <template slot-scope="scope">
              <div style="color: #909399; font-size: 12px; font-weight: bold">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in rowData.zk_pump[0].pumps"
            :key="index"
            :label="item.name"
            align="center"
            width="120px"
            :prop="item.name"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="total_rate"
            label="耗电率(%)"
            align="center"
            width="120px"
          >
          </el-table-column>
        </el-table>
        <el-table
          border
          size="small"
          class="my-tabel"
          v-if="rowData.mill && rowData.mill.length > 0"
          :data="rowData.mill"
        >
          <el-table-column align="center" width="120px">
            <template slot-scope="scope">
              <div style="color: #909399; font-size: 12px; font-weight: bold">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in rowData.mill[0].pumps"
            :key="index"
            :label="item.name"
            align="center"
            width="120px"
            :prop="item.name"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="total_rate"
            label="耗电率(%)"
            align="center"
            width="120px"
          >
          </el-table-column>
        </el-table>
        <el-table
          border
          size="small"
          class="my-tabel"
          v-if="rowData.zy_fan && rowData.zy_fan.length > 0"
          :data="rowData.zy_fan"
        >
          <el-table-column label="增压风机" align="center" width="120px">
            <template slot-scope="scope">
              {{ scope.row.unit ? "#" + scope.row.unit.slice(0, 1) : "" }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in rowData.zy_fan[0].pumps"
            :key="index"
            :label="item.name"
            align="center"
            width="120px"
            :prop="item.name"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="total_rate"
            label="耗电率(%)"
            align="center"
            width="120px"
          >
          </el-table-column>
        </el-table>
        <table
          v-if="rowData.other"
          border="1px"
          style="border: 1px solid #ebeef5; margin-bottom: 10px"
          cellpadding="10"
        >
          <tr>
            <td style="width: 120px; text-align: center"></td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #909399;
                font-weight: bold;
                font-size: 12px;
              "
            >
              合计
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #909399;
                font-weight: bold;
                font-size: 12px;
              "
            >
              耗电率(%)
            </td>
          </tr>
          <tr>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #909399;
                font-weight: bold;
                font-size: 12px;
              "
            >
              低电压耗电
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #606266;
                font-size: 12px;
              "
            >
              {{ rowData.other.other }}
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #606266;
                font-size: 12px;
              "
            >
              {{ rowData.other.other_rate }}
            </td>
          </tr>
        </table>
        <table
          v-if="rowData.total"
          border="1px"
          style="border: 1px solid #ebeef5"
          cellpadding="10"
        >
          <tr>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #909399;
                font-weight: bold;
                font-size: 12px;
              "
            >
              总耗电量
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #606266;
                font-size: 12px;
              "
            >
              {{ rowData.total.total }}
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #909399;
                font-weight: bold;
                font-size: 12px;
              "
            >
              总耗电率(%)
            </td>
            <td
              style="
                width: 120px;
                text-align: center;
                color: #606266;
                font-size: 12px;
              "
            >
              {{ rowData.total.total_rate }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myDetails",
  props: {
    plantName: {
      type: String,
      default: () => {
        return "";
      },
    },
    detailsTime: {
      type: String,
      default: () => {
        return "";
      },
    },
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$emit("goBack", false);
    },
    zk_pumpSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return {
          rowspan: row.pumps.length,
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 1,
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.myDetails {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 30px;
  }
  .div__content-wrap {
    .title {
      width: 100%;
      text-align: center;
      padding: 10px 32px;
      font-size: 18px;
      font-weight: 800;
      color: #333333;
    }
    .tables {
      margin-top: 10px;
      padding-left: 20px;
      .my-tabel {
        margin-bottom: 10px;
        width: fit-content;
      }
    }
  }
}
</style>
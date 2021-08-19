<template>
  <div class="device_consum" ref="device_consum">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap" v-show="!showDetails">
        <div style="display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :hasAuthority="hasAuthority"
            :showAll="true"
            :showUnit="false"
            :showSys="false"
          ></cascade>
        </div>
        <div class="select__wrap">
          <div>选择日期段：</div>
          <div>
            <el-date-picker
              style="width: 400px"
              v-model="time"
              type="datetimerange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
              :clearable="false"
              value-format="yyyy-MM-dd HH:mm:00"
              :pickerOptions="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <BtnList
          resetContent="导出"
          btnStyle="textAlign:left;margin-left:32px"
          @check="checkList"
          @reset="onExport"
        />

      </div>
      <div class="div__content-wrap" v-show="!showDetails">
        <layOutTable>
          <span class="title" slot="title">
            {{ this.title.plant }} 设备电耗统计表
          </span>
          <!-- {{this.title.type}} -->
          <div slot="table">
            <el-table
              v-if="tableShow"
              v-loading="loading"
              border
              :data="tableData"
              style="width: 100%; min-height: 550px"
              :height="tableHeight"
              :span-method="objectSpanMethod"
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
              ></el-table-column>
              <el-table-column prop="plant" align="center" label="项目">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="clickPlant(scope.row)"
                    >{{ scope.row.plant_name }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" prop="unit" label="机组">
                <template slot-scope="scope">
                  {{ scope.row.unit ? "#" + scope.row.unit.slice(0, 1) : "" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="power"
                label="发电量(万kWh)"
                min-width="130"
              >
              </el-table-column>
              <el-table-column align="center" label="循环泵">
                <el-table-column
                  align="center"
                  prop="xh_pump"
                  label="耗电量(万kWh)"
                  min-width="130"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="xh_pump_rate"
                  label="耗电率(%)"
                  min-width="100"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="氧化风机">
                <el-table-column
                  align="center"
                  label="耗电量(万kWh)"
                  min-width="130"
                >
                  <template slot-scope="scope">
                    {{
                      scope.row.yh_fan == undefined ? "--" : scope.row.yh_fan
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="耗电率(%)"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    {{
                      scope.row.yh_fan_rate == undefined
                        ? "--"
                        : scope.row.yh_fan_rate
                    }}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="真空泵">
                <el-table-column
                  align="center"
                  prop="zk_pump"
                  label="耗电量(万kWh)"
                  min-width="130"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="zk_pump_rate"
                  label="耗电率(%)"
                  min-width="100"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="磨机">
                <el-table-column
                  align="center"
                  prop="mill"
                  label="耗电量(万kWh)"
                  min-width="130"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="mill_rate"
                  label="耗电率(%)"
                  min-width="100"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="增压风机">
                <el-table-column
                  align="center"
                  prop="zy_fan"
                  label="耗电量(万kWh)"
                  min-width="130"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="zy_fan_rate"
                  label="耗电率(%)"
                  min-width="100"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="低压设备">
                <el-table-column
                  align="center"
                  prop="other"
                  label="耗电量(万kWh)"
                  min-width="130"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="other_rate"
                  label="耗电率(%)"
                  min-width="100"
                ></el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="total"
                label="总耗电量(万kWh)"
                min-width="150"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="total_rate"
                label="耗电率(%)"
                min-width="130"
              >
              </el-table-column>
            </el-table>
          </div>
        </layOutTable>
      </div>
      <myDetails
        v-loading="loading"
        v-show="showDetails"
        :plantName="plantName"
        :detailsTime="detailsTime"
        :rowData="rowData"
        @goBack="goBack"
      ></myDetails>
    </Card>
  </div>
</template>
<script>
import cascade from "@/components/selectOrg/index11.vue";
import layOutTable from "../../../components/tableLayout/index";
import myDetails from "./myDetails.vue";
import { getDeviceConsum, getPlantConsum } from "@/api/report/device_consum.js";
import { excelPost } from "@/api/common";
import moment from "moment";
let stime = moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00");
let etime = moment().format("YYYY-MM-DD 00:00:00");

export default {
  data() {
    return {
      plantName: "",
      showDetails: false,
      detailsTime: stime + "~" + etime,
      rowData: {
        other: {
          other: "",
          other_rate: "",
        },
        total: {
          total: "",
          total_rate: "",
        },
        yh_fan: [],
        xh_pump: [
          {
            A: "",
            unit: "24",
            B: "",
            total: "",
            C: "",
            D: "",
            E: "",
            plant: "G3XM",
            total_rate: "",
            pumps: [
              {
                name: "A",
                value: "",
              },
              {
                name: "B",
                value: "",
              },
              {
                name: "C",
                value: "",
              },
              {
                name: "D",
                value: "",
              },
              {
                name: "E",
                value: "",
              },
            ],
          },
          {
            A: "",
            unit: "13",
            B: "",
            total: "",
            C: "",
            D: "",
            E: "",
            plant: "G3XM",
            total_rate: "",
            pumps: [
              {
                name: "A",
                value: "",
              },
              {
                name: "B",
                value: "",
              },
              {
                name: "C",
                value: "",
              },
              {
                name: "D",
                value: "",
              },
              {
                name: "E",
                value: "",
              },
            ],
          },
        ],
        zk_pump: [
          {
            "#3": "",
            total: "",
            plant: "G3XM",
            total_rate: "",
            pumps: [
              {
                name: "#3",
                value: "",
              },
              {
                name: "#1",
                value: "",
              },
              {
                name: "#2",
                value: "",
              },
            ],
            "#1": "",
            "#2": "",
          },
        ],
        mill: [
          {
            total: "",
            plant: "WSXM",
            total_rate: "2.6020",
            pumps: [
              {
                name: "#1",
                value: "",
              },
              {
                name: "#2",
                value: "",
              },
            ],
            "#1": "",
            "#2": "",
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > new Date(moment().format("YYYY-MM-DD 00:00:00"))
          );
        },
      },
      time: [stime, etime],
      title: {
        plant: "",
      },
      tableShow: true,
      tableHeight: 400,
      tableData: [],
      loading: false,
      hasAuthority: 0, //  0代表可以查看所有区域
    };
  },
  components: {
    layOutTable,
    cascade,
    myDetails,
  },
  watch: {
    time(value) {
      this.detailsTime = value[0] + "~" + value[1];
    },
  },
  mounted() {
    this.checkList();
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.device_consum.offsetHeight - 260;
      this.tableShow = true;
    });
  },
  methods: {
    // 查询
    checkList() {
      getDeviceConsum({
        plant: this.plant,
        startTime: this.time[0],
        endTime: this.time[1],
      }).then((res) => {
        let data = res.data.data;
        let arr = [];
        data.forEach((ele) => {
          if (ele.units.length > 0) {
            ele.units[0].rowspan = true;
            ele.units.forEach((item) => {
              arr.push({ ...ele, ...item });
            });
          } else {
            arr.push(ele);
          }
        });
        arr.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (ele[k] == null) {
              ele[k] = "--";
            }
          });
        });
        this.tableData = arr;
      });
    },
    // 导出
    onExport() {
      excelPost("/datamonitor/hd_power/export", {
        plant: this.plant,
        startTime: this.time[0],
        endTime: this.time[1],
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.plantName || ''}${this.detailsTime || ''}设备电耗统计表.xls`;
        this.excel(data, excelName);
      });
    },
    // 点击项目
    clickPlant(row) {
      this.loading = true;
      getPlantConsum({
        plant: row.plant,
        startTime: this.time[0],
        endTime: this.time[1],
      }).then((res) => {
        this.loading = false;
        this.showDetails = true;
        console.log( row,19090);
        this.plantName = row.plant_name;
        let data = res.data.data;
        if (data.zk_pump && data.zk_pump.length > 0) {
          data.zk_pump[0].title = "真空泵";
        }
        if (data.mill && data.mill.length > 0) {
          data.mill[0].title = "磨机";
        }
        this.rowData = data;
      });
    },
    goBack(value) {
      this.showDetails = value;
    },
    // 切换电厂
    onMyCascader(data) {
      if (data.area == "all") {
        this.title = {};
        this.plant = "";
      } else {
        this.title.plant = data.name.split("/")[1];
        this.plant = data.plant;
      }
      this.checkList();
    },
    // 跨行跨列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.units.length == 0) {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
      if (
        columnIndex == 1 ||
        columnIndex == 8 ||
        columnIndex == 9 ||
        columnIndex == 10 ||
        columnIndex == 11 ||
        columnIndex == 14 ||
        columnIndex == 15 ||
        columnIndex == 16 ||
        columnIndex == 17
      ) {
        if (row.rowspan) {
          return {
            rowspan: row.units.length,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 1,
          };
        }
      } else if (columnIndex == 6 || columnIndex == 7) {
        if (row.units.length > 0 && row.units[0].yh_fan === undefined) {
          if (row.rowspan) {
            return {
              rowspan: row.units.length,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 1,
            };
          }
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
};
</script>
<style scoped lang="scss">
.device_consum {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 30px;
    .select__wrap {
      height: 42px;
      max-width: 50%;
      line-height: 42px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
  }
}
</style>

<template>
  <div class="repSetting">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="repSetting-container">
        <div class="lf-container">
          <div class="lt">
            <div class="title">填报时间设置</div>
            <div class="content">
              <div class="box">
                <div class="txt">
                  <span>日报填报时间 /天</span>
                </div>
                <div class="txt">
                  <div class="txt-div">
                    <span>截止到每天</span>
                    <div class="select">
                      <el-time-select
                        v-model="dailyReportTime1"
                        size="small"
                        :picker-options="{
                          start: '00:00',
                          step: '00:05',
                          end: '24:00',
                        }"
                        placeholder="时间"
                      ></el-time-select>
                    </div>
                    <span>点，</span>
                    <div class="select">
                      <el-input
                        v-model="dailyReportTime2"
                        size="small"
                        onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                        onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                        class="ipt"
                      ></el-input>
                    </div>
                    <span>天内的数据。</span>
                  </div>
                  <el-button type="primary" size="small" @click="onDailySave"
                    >保存</el-button
                  >
                </div>
              </div>
              <div class="box">
                <div class="txt">
                  <span>调整项可修改时间</span>
                </div>
                <div class="txt">
                  <div class="txt-div">
                    <span>每月</span>
                    <div class="select">
                      <el-input
                        v-model="adjustTime1"
                        onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                        onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                        size="small"
                        class="ipt"
                      ></el-input>
                    </div>
                    <span>日</span>
                    <div class="select">
                      <el-time-select
                        v-model="adjustTime2"
                        size="small"
                        :picker-options="{
                          start: '00:00',
                          step: '00:05',
                          end: '24:00',
                        }"
                        placeholder="时间"
                      ></el-time-select>
                    </div>
                    <span>前可使用调整项功能。</span>
                  </div>
                  <el-button type="primary" size="small" @click="onAdjustSave"
                    >保存</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="lt-bottom">
            <div class="title">
              <span class="sp">日报参数设置</span>
              <el-button type="primary" size="small" @click="onTableSave"
                >保存</el-button
              >
            </div>
            <div class="lt-bottom-table">
              <el-table :data="tableData" height="400">
                <el-table-column
                  prop="name"
                  label="项目"
                  min-width="60px;"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="膏粉比数值 显示红色的范围"
                  min-width="180"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="cell">
                      <span>&lt;</span>
                      <el-input
                        class="ipt"
                        onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                        onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                        size="small"
                        v-model="scope.row.gfbLow"
                      ></el-input>
                      <span>或</span>
                      <span>&gt;</span>
                      <el-input
                        class="ipt"
                        onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                        onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                        size="small"
                        v-model="scope.row.gfbHigh"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="化验填报时间 /天"
                  min-width="130"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="select cell">
                      <el-time-select
                        v-model="scope.row.hyWriteTime"
                        size="small"
                        :picker-options="{
                          start: '00:00',
                          step: '00:05',
                          end: '24:00',
                        }"
                        placeholder="时间"
                      ></el-time-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="石膏产量估算系数"
                  min-width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="cell">
                      <el-input
                        class="ipt"
                        onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                        onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                        size="small"
                        v-model="scope.row['xh_pump@57@p']"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="rt-container">
          <div class="title">
            <span class="sp">电耗计算参数设置</span>
            <el-button type="primary" size="small" @click="onRtTableSave"
              >保存</el-button
            >
          </div>
          <el-table size="mini" height="600" :data="rtTableData" border>
            <el-table-column
              prop="plantName"
              label="项目"
              align="center"
            ></el-table-column>
            <el-table-column label="循环泵" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['xh_pump@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['xh_pump@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="氧化风机" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['yh_fan@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['yh_fan@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="真空泵" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['zk_pump@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['zk_pump@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="磨机" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['mill@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['mill@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="增压风机" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['zy_fan@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['zy_fan@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="低电压设备" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['other@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['other@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="总点" align="center">
              <el-table-column label="功率因数" min-width="100" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="var p2 =  value =='-'   ? value: parseFloat(value).toFixed(2);value = value=='' ? '' : p2=='-'? '-' : isNaN(p2) ? '' : (/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,''))"
                      onblur="value = value.replace(/\.0*$|[^\d]*$/,'')"
                      size="small"
                      v-model="scope.row['total@Y@p']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电压 (V)" min-width="110" align="center">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-input
                      class="ipt"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      size="small"
                      v-model="scope.row['total@Y@v']"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import {
  getBaseData,
  saveGlobal,
  saveTable,
  getRtTableData,
  saveRtTable,
} from "@/api/admin/reportSetting.js";
export default {
  data() {
    return {
      dailyReportTime1: "",
      dailyReportTime2: "",
      adjustTime1: "",
      adjustTime2: "",
      tableData: [],
      rtTableData: [
        {
          gypsumOutputFactor: 11,
        },
      ],
    };
  },
  mounted() {
    this.init();
    this.initRt();
  },
  methods: {
    init() {
      getBaseData().then((res) => {
        let { adjust_time, daily_report_time, plantSetting } = res.data.data;
        this.dailyReportTime1 = daily_report_time.split(",")[0];
        this.dailyReportTime2 = daily_report_time.split(",")[1];
        this.adjustTime1 = adjust_time.split(",")[0];
        this.adjustTime2 = adjust_time.split(",")[1];
        this.tableData = plantSetting;
      });
    },
    initRt() {
      getRtTableData().then((res) => {
        this.rtTableData = res.data.data;
      });
    },
    onDailySave() {
      saveGlobal({
        key: "daily_report_time",
        val: this.dailyReportTime1 + "," + this.dailyReportTime2,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.init();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onAdjustSave() {
      saveGlobal({
        key: "adjust_time",
        val: this.adjustTime1 + "," + this.adjustTime2,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.init();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onTableSave() {
      saveTable(this.tableData).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.init();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onRtTableSave() {
      let data = JSON.parse(JSON.stringify(this.rtTableData));
      data.forEach((ele) => {
        Object.keys(ele).map((k) => {
          delete ele.plantName;
          delete ele.sort;
          if (ele[k] == null || k == "plant") {
            return;
          } else {
            ele[k] = ele[k] === "" ? null : String(Number(ele[k]));
          }
        });
      });
      saveRtTable(data).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("保存成功");
          this.initRt();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.repSetting {
  .repSetting-container {
    .lf-container {
      width: 100%;
      .lt {
        padding: 20px;
        .title {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .content {
          display: flex;
          justify-content: space-between;
          .box {
            width: 49%;
            border: 1px solid #c5c2c2;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            .txt {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
              .txt-div {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .select {
                  margin: 0 2px;
                  .el-date-editor.el-input,
                  .el-date-editor.el-input__inner {
                    width: 130px;
                  }
                  .ipt {
                    width: 50px;
                  }
                }
              }
            }
          }
        }
      }
      .lt-bottom {
        width: 100%;
        padding: 0 20px 20px;
        .title {
          .sp {
            font-size: 20px;
            margin-bottom: 10px;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lt-bottom-table {
          border: 1px solid #c5c2c2;
          border-radius: 10px;
          padding: 10px;
          .select {
            .el-date-editor.el-input,
            .el-date-editor.el-input__inner {
              width: 130px;
            }
          }
          .cell {
            display: flex;
            justify-content: center;
            align-items: center;
            .ipt {
              width: 70px;
              margin: 0 2px;
            }
          }
        }
      }
    }
    .rt-container {
      width: 100%;
      padding: 20px;
      .title {
        .sp {
          font-size: 20px;
          margin-bottom: 10px;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .el-table .cell {
        padding-left: 5px !important;
        padding-right: 5px !important;
      }
    }
  }
}
</style>

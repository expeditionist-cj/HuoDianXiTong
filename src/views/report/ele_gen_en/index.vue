<template>
  <div class="ele_gen_en" ref="ele_gen_en">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <div class="select__wrap">
          <div>选择时间：</div>
          <div>
            <el-date-picker
              v-model="time"
              align="right"
              type="month"
              placeholder="选择日期"
              size="small"
              :clearable="false"
              :editable="false"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <!-- <SelOrg
            class="selorg-wrap"
            style="width:60%"
              @selectArear="selectArear"
              @selectPlant="selectPlant"
              :showDevice="false"
              :showSystem="false"
              :showUnit="false"
        />-->
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :hasAuthority="hasAuthority"
            :showAll="false"
            :showUnit="false"
            :showSys="false"
          ></cascade>
        </div>
        <BtnList
          resetContent="导出"
          btnStyle="textAlign:left;margin-left:32px"
          @check="checkList"
          @reset="onExport"
        />
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <span class="title" slot="title">
            {{ y }} 年 {{ m }} 月 {{ area_plant }}
            脱硫脱硝装置发电量统计表
          </span>
          <div class="content-table" slot="table" v-if="tableShow">
            <avue-crud
              ref="crud"
              :data="tableData"
              :table-loading="tableLoading"
              :option="tableOption"
            >
              <template slot-scope="scope" slot="menu">
                <div v-show="scope.row.day == '调整'">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >修改</el-button
                  >
                </div>
              </template>
            </avue-crud>
          </div>
        </layoutTable>
      </div>
    </Card>
    <el-dialog title="调整" width="80%" :visible.sync="dialogFormVisible">
      <div class="dialog-content">
        <div
          v-for="(item, index) in dialogData"
          :key="index"
          class="content-box"
        >
          <div class="_title">
            <span>{{ dialogUnits[index] }}机组</span>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">发电量(万KWh):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_gen_power']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">上网电量(万KWh):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_net_power']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">主机运行小时数(h):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_run_time']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">脱硫运行小时数(h):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_s_run_time']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">脱硝运行小时数(h):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_n_run_time']"
              ></el-input>
            </div>
          </div>
          <!-- <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">脱硫合格投运率(%):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_s_run_rate']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">脱硝合格投运率(%):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_n_run_rate']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">主机负荷率(%):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_load_rate']"
              ></el-input>
            </div>
          </div>
          <div class="inputs">
            <div style="width: 50%; text-align: right; display: inline-block">
              <span style="display: inline-block">利用小时(h):</span>
            </div>
            <div style="width: 50%; text-align: left; display: inline-block">
              <el-input
                size="small"
                class="__input"
                oninput="value=value.replace(/[^\d.-]/g,'');"
                v-model="item[dialogUnits[index] + '_use_time']"
              ></el-input>
            </div>
          </div> -->
        </div>
      </div>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import moment from "moment";
import "moment/locale/zh-cn";
import _ from "lodash";
import { tableOption } from "../../../const/crud/report/ele_gen_en";
import { rd_clm } from "./util";
import {
  get_device_power,
  updateAdjustData,
} from "../../../api/report/ele_gen_en";
import layoutTable from "../../../components/tableLayout/index";
import { excel } from "@/api/common";
import { mapGetters } from "vuex";
import { power_GNT } from "../../../dict/index";
moment.locale("zh-cn");
let area = "";
let plant = "";
export default {
  name: "ele_gen_en",
  props: {},
  data() {
    return {
      tableLoading: false,
      tableOption: tableOption,
      dialogData: [],
      tableHeight: 400,
      time: Date.now(),
      y: moment(Date.now()).year(),
      m: moment(Date.now()).month() + 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogFormVisible: false,
      tableData: [],
      query: {
        year: moment(Date.now()).year(),
        month: moment(Date.now()).month() + 1,
      },
      area: "",
      plant: "",
      area_plant: "",
      tableShow: true,
      code: "",
      hasAuthority: 0, //  0代表可以查看所有区域
    };
  },
  components: {
    layoutTable,
    cascade,
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  created() {
    this.code = JSON.parse(sessionStorage.getItem("user")).user.projectCode;
    this.defAreaName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.regionName;
    this.defPlantName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.projectName;
    if (!this.defPlantName) {
      this.$nextTick(() => {
        this.area_plant = "";
      });
    } else {
      this.$nextTick(() => {
        this.area_plant = this.defAreaName + "/" + this.defPlantName;
      });
    }
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableOption.column = rd_clm(["#1", "#2"]);
      this.tableOption.height =
        this.$refs.ele_gen_en.offsetHeight - 230 > 550
          ? this.$refs.ele_gen_en.offsetHeight - 230
          : 550;
      this.tableShow = true;
    });
    if (this.code) {
      this.query.projectCode = this.code;
      this.checkList();
    } else {
      delete this.query.projectCode;
    }
    if(this.roles[0] == 1 || this.roles[0] == 5 || this.roles[0] == 6 || this.roles[0] == 8) {
      this.tableOption.menu = true;
    }else {
      this.tableOption.menu = false;
    }
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year();
      this.query.month = moment(value).month() + 1;
    },
  },
  methods: {
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      if (!this.query.projectCode) {
        return this.$message.error("请选择电厂");
      }
      this.y = this.query.year;
      this.m = this.query.month;
      this.area_plant = area + "/" + plant;
      this.get_device_power(this.query);
    },
    // 导出
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      this.area_plant = area + "/" + plant;
      if (!this.query.projectCode) {
        return this.$message.error("请先选择电厂");
      }
      // http://192.168.59.7:9999/datamonitor/device_power/export?projectCode=ELXM&year=2019&month=12
      // this.downloadFile("/datamonitor/device_power/export", {
      //   ...this.query,
      //   plantName: plant
      // });
      excel("/datamonitor/device_power/export", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        let excelName = `${this.y}年${this.m}月 ${this.area_plant} 脱硫脱硝装置发电量统计表.xls`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   this.query = _.omit(this.query, "projectCode");
    // },
    // selectPlant(data) {
    //   if (data == "all") {
    //     this.query = _.omit(this.query, "projectCode");
    //   } else {
    //     plant = data.name;
    //     this.query.projectCode = data.deptCode;
    //   }
    // },
    onMyCascader(data) {
      if (!data.area || !data.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.query.projectCode = data.plant;
      area = data.name.split("/")[0];
      plant = data.name.split("/")[1];
      this.checkList();
    },
    get_device_power(query) {
      this.tableLoading = true;
      return get_device_power(query).then((res) => {
        this.tableLoading = false;
        this.tableShow = false;
        let { units, unitDataList } = res.data.data;
        this.dialogUnits = units;
        this.tableOption.column = rd_clm(units);
        unitDataList.forEach((ele) => {
          Object.keys(ele).map((k) => {
            if (ele.day != "调整" && ele[k] == null) {
              ele[k] = "--";
            }
          });
        });
        // let currentMonth = moment(Date.now()).month() + 1;
        // let selectMonth = moment(this.time).month() + 1;
        // if (selectMonth == currentMonth) {
        //   unitDataList.pop()
        //   unitDataList.pop()
        // }
        // 下一个队列执行
        this.$nextTick(() => {
          this.tableData = unitDataList;
          this.tableShow = true;
        });
      });
    },
    handleClick(row, done, loading) {
      this.dialogFormVisible = true;
      let arr = [];
      let arry = [];
      Object.keys(row).map((ele) => {
        if (ele.indexOf("#") > -1) {
          arr.push(ele.slice(3));
        }
      });
      arr = [...new Set(arr)];
      this.dialogLabel = arr;
      this.dialogUnits.forEach((item) => {
        let obj = {};
        arr.forEach((ele) => {
          obj[item + "_" + ele] = row[item + "_" + ele];
        });
        arry.push(obj);
      });
      this.dialogData = arry;
    },
    onOk() {
      let obj = {};
      let arr = JSON.parse(JSON.stringify(this.dialogData));
      arr.forEach((ele) => {
        Object.keys(ele).map((k) => {
          obj[k] = ele[k] == "" ? null : ele[k];
        });
      });
      let query = {
        y: this.query.year,
        m: this.query.month,
        project: this.query.projectCode,
      };
      updateAdjustData({ ...obj, ...query })
        .then((res) => {
          this.dialogFormVisible = false;
          let code = res.code;
          if (!code) {
            this.$message.success("修改成功");
            this.checkList();
          } else {
            this.$message.success(res.msg);
          }
        })
        .catch((e) => {
          this.dialogFormVisible = false;
          this.$message({
            message: e.message,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.ele_gen_en {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    padding: 20px 8px;
    .select__wrap {
      height: 42px;
      max-width: 25%;
      line-height: 42px;
      display: table;
      // width: 100%;
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
    .content-table {
      padding-bottom: 20px;
    }
  }
  .dialog-content {
    display: flex;
    flex-wrap: wrap;
    .content-box {
      min-width: 240px;
      width: 30%;
      border-radius: 6px;
      border: 1px solid rgba(232, 232, 232, 1);
      margin: 0 20px 0 0;
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
    }
    .inputs {
      display: block;
      height: 40px;
      font-size: 8px;
      text-align: center;
      .__input {
        display: inline-block;
        width: 100px;
        height: 14px;
        margin-left: 20px;
      }
    }
  }
}
</style>
<style lang="scss">
.ele_gen_en {
  // .basic-container .el-card {
  //   // border-radius: 0px;
  // }
  // .el-table--border,
  // .el-table--group {
  //   // border: 1px solid #333;
  // }
  .avue-crud {
    width: 100%;
  }
  .avue-crud__header {
    margin-bottom: 0px;
  }
  .el-card__body {
    padding: 0;
  }
  .avue-crud__menu {
    height: 0;
    min-height: 0;
    margin-bottom: 0;
  }
  .el-table thead.is-group th {
    background: #fff;
    color: #909399;
    font-size: 12px;
  }
}
.title {
  font-size: 18px;
  font-family: PingFang-SC-Heavy, PingFang-SC;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}
</style>

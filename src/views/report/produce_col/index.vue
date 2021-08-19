<template>
  <div class="produce-col-wrap" ref="produce_col">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="tool-wrap">
        <div class="tool-time-box">
          <span class="time-title">选择日期：</span>
          <el-date-picker
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
        <!-- <div class="tool-org-box">
          <SelOrg
            @selectArear="selectArear"
            @selectPlant="selectPlant"
            :showDevice="false"
            :showSystem="false"
            :showUnit="false"
            :showAll="true"
            :hasAuthority="hasAuthority"
          />
        </div>-->
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :hasAuthority="hasAuthority"
            :showAll="showAll"
            :showUnit="false"
            :showSys="false"
          ></cascade>
        </div>
        <div class="tool-btn-box">
          <BtnList
            style="width: auto; display: inline-block"
            resetContent="导出"
            btnStyle="textAlign:left;margin-left:32px"
            @check="checkList"
            @reset="onExport"
          />
        </div>
      </div>
      <div class="table-wrap">
        <layoutTable>
          <span class="title" slot="title">
            <span style="margin-right: 20px"
              >{{ areaName }}{{ plantName == "" ? "" : "/"
              }}{{ plantName }} 发电量及烟气参数</span
            >
            <span
              >起止时间：{{ year }}年{{ month }}月{{ day }}日00:00至24:00</span
            >
          </span>

          <div class="content-table" slot="table">
            <avue-crud style="width: 100%" :option="option" :data="tabledata">
              <template slot="unit" slot-scope="scope">
                <span v-if="scope.row.unit.indexOf('发电量') >= 0">{{
                  scope.row.unit
                }}</span>
                <span v-else>#{{ scope.row.unit }}</span>
              </template>
              <template slot="power" slot-scope="scope">
                <span v-if="scope.row.power != null">{{
                  scope.row.power
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="runTime" slot-scope="scope">
                <span v-if="scope.row.runTime == null || scope.row.runTime == 0"
                  >--</span
                >
                <span v-else>{{ scope.row.runTime }}</span>
              </template>

              <template slot="loadRate" slot-scope="scope">
                <span v-if="scope.row.loadRate != null">{{
                  scope.row.loadRate
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="inNox" slot-scope="scope">
                <span v-if="scope.row.inNox != null">{{
                  scope.row.inNox
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="inSo2" slot-scope="scope">
                <span v-if="scope.row.inSo2 != null">{{
                  scope.row.inSo2
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="inDust" slot-scope="scope">
                <span v-if="scope.row.inDust != null">{{
                  scope.row.inDust
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="outNox" slot-scope="scope">
                <span v-if="scope.row.outNox != null">{{
                  scope.row.outNox
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="outSo2" slot-scope="scope">
                <span v-if="scope.row['outSo2'] != null">{{
                  scope.row["outSo2"]
                }}</span>
                <span v-else>--</span>
              </template>

              <template slot="outDust" slot-scope="scope">
                <span v-if="scope.row['outDust'] != null">{{
                  scope.row["outDust"]
                }}</span>
                <span v-else>--</span>
              </template>
            </avue-crud>
            <el-table :data="tableFootData" style="width: 100%" size="small">
              <el-table-column
                align="center"
                label="日期"
                prop="timing"
              ></el-table-column>
              <el-table-column align="center" label="发电量（万KWh）">
                <el-table-column
                  align="center"
                  label="脱硫"
                  prop="genso2"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="脱硝"
                  prop="gennox"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="除尘"
                  prop="gendust"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="合计"
                  prop="gensum"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="上网电量（万KWh）">
                <el-table-column
                  align="center"
                  label="脱硫"
                  prop="netso2"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="脱硝"
                  prop="netnox"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="除尘"
                  prop="netdust"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="合计"
                  prop="netsum"
                ></el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </layoutTable>
      </div>
    </Card>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import { tableOption } from "@/const/crud/report/produce_col.js";
import layoutTable from "../../../components/tableLayout/index";
import { getData } from "@/api/report/produce_col.js";
import { getAuthority } from "@/api/admin/user.js";
import moment from "moment";
import { excel } from "@/api/common";
let area = "";
let plant = "";
let year = "";
let month = "";
let day = "";
export default {
  name: "produce_col",
  props: {},
  data() {
    return {
      time: Date.now() - 1000 * 60 * 60 * 24,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;
        },
      },
      query: {
        year: moment(Date.now() - 1000 * 60 * 60 * 24).get("year"),
        month: moment(Date.now() - 1000 * 60 * 60 * 24).get("month") + 1,
        day: moment(Date.now() - 1000 * 60 * 60 * 24).get("date"),
      },
      tabledata: [],
      option: tableOption,
      areaName: "",
      plantName: "",
      year: "",
      month: "",
      day: "",
      tableFootData: [],
      uid: "",
      showAll: false,
      hasAuthority: 1, //判断是否有权限
    };
  },
  components: { layoutTable, cascade },
  computed: {},
  created() {
    this.uid = JSON.parse(sessionStorage.getItem("user")).user.user_id;
    this.getAuthority({ userId: this.uid });
    let defAreaName = JSON.parse(sessionStorage.getItem("user")).user
      .regionName;
    let defPlantName = JSON.parse(sessionStorage.getItem("user")).user
      .projectName;
    if (!defPlantName) {
      this.$nextTick(() => {
        this.areaName = "";
        this.plantName = "";
      });
    } else {
      this.$nextTick(() => {
        this.areaName = defAreaName;
        this.plantName = defPlantName;
        area = defAreaName;
        plant = defPlantName;
      });
    }
  },
  mounted() {
    window.moment = moment;
    this.option.height =
      this.$refs.produce_col.offsetHeight - 350 < 350
        ? 350
        : this.$refs.produce_col.offsetHeight - 350;
    this.checkList();
  },
  watch: {
    time(value) {
      this.query.year = moment(value).get("year");
      this.query.month = moment(value).get("month") + 1;
      this.query.day = moment(value).get("date");
    },
  },
  methods: {
    getAuthority(query) {
      getAuthority(query).then((res) => {
        let identity = res.data.data[0];
        if (identity == "ROLE_Analysiser" || identity == "ROLE_ADMIN") {
          this.showAll = true;
        } else {
          this.showAll = false;
        }
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   delete this.query.plant;
    //   if (data.deptCode == "all") {
    //     delete this.query.area;
    //   } else {
    //     this.query.area = data.deptCode;
    //   }
    // },
    // selectPlant(data) {
    //   if (data.deptCode == "") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.plant = data.deptCode;
    //   }
    // },
    onMyCascader(data) {
      // if (!data.area || !data.plant) {
      //   return this.$message("请选择区域和电厂");
      // }
      if (data.area == "all") {
        delete this.query.area;
        delete this.query.plant;
      } else {
        this.query.area = data.area;
        this.query.plant = data.plant;
        area = data.name.split("/")[0];
        plant = data.name.split("/")[1];
      }
      this.checkList();
    },
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.area = this.$store.state.writeData.selectOptions.area;
        this.query.plant = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.area = null;
        this.query.plant = null;
        area = "";
        plant = "";
      }
      getData({ ...this.query }).then((res) => {
        this.area = area;
        this.areaName = area;
        this.plantName = plant;
        this.year = this.query.year;
        this.month = this.query.month;
        this.day = this.query.day;
        let { list, nox, so2, sum, dust } = res.data.data;
        // let dust = {};
        // let arry = this.formatterOther({ nox, so2, sum });
        this.tableFootData = this.getFormatterOther({ nox, so2, sum, dust });
        let data = [...list];
        data.forEach((item) => {
          _.forOwn(item, (value, key) => {
            if (value == null) {
              item[key] = "--";
              if (key == "inSo2") {
                item["outSo2"] = "--";
              }
              if (key == "inNox") {
                item["outNox"] == "--";
              }
            }
          });
        });
        this.tabledata = data;
      });
    },
    getFormatterOther({ nox, so2, sum, dust }) {
      let array = [
        {
          timing: "本日",
          genso2: so2.genDay,
          gennox: nox.genDay,
          gendust: dust.genDay,
          gensum: sum.genDay,
          netso2: so2.netDay,
          netnox: nox.netDay,
          netdust: dust.netDay,
          netsum: sum.netDay,
        },
        {
          timing: "本月",
          genso2: so2.genMonth,
          gennox: nox.genMonth,
          gendust: dust.genMonth,
          gensum: sum.genMonth,
          netso2: so2.netMonth,
          netnox: nox.netMonth,
          netdust: dust.netMonth,
          netsum: sum.netMonth,
        },
      ];
      array.forEach((item) => {
        _.forOwn(item, (value, key) => {
          if (value == null || value == undefined) {
            item[key] = "--";
          }
        });
      });
      return array;
    },
    // formatterOther({ nox, so2, sum }) {
    //   let arry = [];
    //   let types = ["脱硫", "脱硝", "除尘", "合计"];
    //   let mapper = {
    //     脱硫: so2,
    //     脱硝: nox,
    //     除尘: {},
    //     合计: sum
    //   };
    //   types.forEach(item => {
    //     let obj = {};
    //     obj.plantCn = item;
    //     obj.unit = "发电量(万KWh)";
    //     obj.inSo2 = "上网电量(万KWh)";
    //     obj.power = "本日";
    //     obj.loadRate = "本月";
    //     obj.inDust = "本日";
    //     obj.outSo2 = "本月";
    //     if (item == "脱硫") {
    //       obj.runTime = mapper[item].genDay;
    //       obj.inNox = mapper[item].genMonth;
    //       obj.outNox = mapper[item].netDay;
    //       obj.netMonth = mapper[item].netMonth;
    //     } else if (item == "脱硝") {
    //       obj.runTime = mapper[item].genDay;
    //       obj.inNox = mapper[item].genMonth;
    //       obj.outNox = mapper[item].netDay;
    //       obj.netMonth = mapper[item].netMonth;
    //     } else if (item == "合计") {
    //       obj.runTime = mapper[item].genDay;
    //       obj.inNox = mapper[item].genMonth;
    //       obj.outNox = mapper[item].netDay;
    //       obj.netMonth = mapper[item].netMonth;
    //     }
    //     arry.push(obj);
    //   });
    //   return arry;
    // },
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.area = this.$store.state.writeData.selectOptions.area;
        this.query.plant = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.area = null
        this.query.plant = null
        area = "";
        plant = "";
      }
      excel("/datamonitor/DailyRptAd/export", {
        ...this.query,
      }).then((res) => {
        let data = res.data;
        if (plant == undefined || area == undefined) {
          area = "";
          plant = "";
        }
        let excelName = `${this.query.year}年 ${this.query.month}月${this.query.day}日 ${area} ${plant} 发电量及烟气参数.xls`;
        this.excel(data, excelName);
      });
    },
  },
};
</script>

<style scoped lang="less">
.produce-col-wrap {
  height: 100%;
  // 工具栏
  .tool-wrap {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    height: 60px;
    .tool-time-box {
      display: flex;
      align-items: center;
      // margin-right: 20px;
      .time-title {
        display: inline-block;
        width: 40%;
        // margin-right: 10px;
      }
    }
    .tool-org-box {
      margin-right: 0px;
    }
  }

  // 编辑框
  .edit-org-box {
    margin-bottom: 10px;
  }
  .edit-box {
    .edit-item-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .edit-item {
        border-radius: 6px;
        border: 1px solid rgba(232, 232, 232, 1);

        width: 24%;
        .edit-item-title {
          font-weight: bold;
          color: rgba(37, 37, 37, 1);
          margin-bottom: 20px;
          text-align: center;
          background: rgba(241, 241, 241, 0.4);
          border-radius: 6px 6px 0px 0px;
          opacity: 0.8;
        }
        .edit-item-ipt-box {
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          .edit-item-ipt {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.produce-col-wrap {
  .avue-crud__menu {
    display: none !important;
  }
  .content-title {
    background: #f5f7fa !important;
  }
  .avue-crud__header {
    display: none !important;
  }
  .avue-crud__box .el-card__body,
  .avue-crud__box .el-card__header {
    padding: 0px !important;
  }
  // .avue-input-number,
  // .el-cascader,
  // .el-date-editor.el-input,
  // .el-date-editor.el-input__inner,
  // .el-select {
  //   width: 220px !important;
  // }
}
</style>


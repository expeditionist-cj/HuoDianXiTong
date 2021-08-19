<template>
  <div class="produce-fill-wrap" ref="produce_fill">
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
            :showAll="showAll"
            :hasAuthority="hasAuthority"
          />
        </div>-->
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :showAll="showAll"
            :showUnit="false"
            :showSys="false"
            :hasAuthority="hasAuthority"
          ></cascade>
        </div>
        <div class="tool-btn-box">
          <!-- <el-button @click="onAdd" v-if="dailyRptMd_add" type="primary" size="mini">新增</el-button> -->
          <BtnList
            style="width: auto; display: inline-block; margin-left: 10px"
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
            <span>
              {{ areaName }}{{ plantName == "" ? "" : "/"
              }}{{ plantName }} 原材料使用情况
            </span>
            <span style="margin-left: 10px">
              起止时间：{{ titleMonth }}月{{ titleDay }}日00:00至{{
                titleMonth
              }}月{{ titleDay }}日24:00
            </span>
          </span>

          <div class="content-table" slot="table">
            <!-- <avue-crud v-if="tableShow" style="width:100%" :option="option" :data="tabledata">
              <template slot="action" slot-scope="scope">
                <div class="action-box" v-if="scope.row.plantCn != '合计'">
                  <el-button @click="onEdit(scope.row)" type="text" size="small">修改</el-button>
                  <el-button type="text" size="small" @click="onDel(scope.row)">删除</el-button>
                </div>
              </template>
            </avue-crud>-->
            <zcurd
              ref="curd"
              :data="tabledata"
              :height="tableHeight"
              @onEdit="onEdit"
              @onDel="onDel"
            ></zcurd>
          </div>
        </layoutTable>
      </div>
      <!-- 编辑对话框 -->
      <el-dialog
        custom-class="a"
        :title="title"
        :visible.sync="dialogVisible"
        width="90%"
      >
        <div class="edit-org-box" v-if="title == '新增'">
          <div>
            <span>选择电厂：</span>
            <!-- <el-select
              size="small"
              v-model="plant"
              placeholder="请选择内容"
              type="tree"
              :dic="plantOpiton"
            ></el-select>-->
            <el-select v-model="plant" size="small" placeholder="请选择内容">
              <el-option
                v-for="(item, index) in plantOpiton"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            新增日期：{{ this.query.year }}年{{ this.query.month }}月{{
              this.query.day
            }}日
          </div>
        </div>
        <div class="edit-box">
          <!-- 上面4个输入类 -->
          <div class="edit-item-box">
            <div class="edit-item">
              <div class="edit-item-title">吸收剂采购量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.absBuyDay"
                  ></el-input>
                </div>
                <div class="edit-item-ipt">
                  <div class="ipt-title">当前库存使用天数：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.absCanUse"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">吸收剂耗量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.absUseDay"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">还原剂采购量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.redBuyDay"
                  ></el-input>
                </div>
                <div class="edit-item-ipt">
                  <div class="ipt-title">当前库存使用天数：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.redCanUse"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">还原剂耗量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.redUseDay"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>

          <!-- 下面4个输入类 -->
          <div class="edit-item-box">
            <div class="edit-item">
              <div class="edit-item-title">石膏出库量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.gypOutputDay"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">增效剂添加量</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（kg）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.synUseDay"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">废水系统</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">处理量（t）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.effTaDay"
                  ></el-input>
                </div>
                <div class="edit-item-ipt">
                  <div class="ipt-title">运行时间（h）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.effRunDay"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="edit-item">
              <div class="edit-item-title">高效絮凝剂</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <div class="ipt-title">本日（kg）：</div>
                  <el-input
                    type="number"
                    size="small"
                    v-model="rowData.floUseDay"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 其它情况说明 -->
          <div class="edit-item-box">
            <div class="edit-item" style="width: 100%; height: 128px">
              <div class="edit-item-title">其它情况说明</div>
              <div class="edit-item-ipt-box">
                <div class="edit-item-ipt">
                  <el-input
                    type="textarea"
                    :rows="3"
                    :autosize="{ minRows: 3 }"
                    v-model="rowData.remark"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="onCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="onOK">确 定</el-button>
        </span>
      </el-dialog>
    </Card>
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import zcurd from "./zcurd";
import { tableOption } from "@/const/crud/report/produce_fill.js";
import layoutTable from "../../../components/tableLayout/index";
import { getData, add, update, del } from "@/api/report/produce_fill.js";
import { getAuthority } from "@/api/admin/user.js";
import moment from "moment";
import { excel } from "@/api/common";
import { mapGetters } from "vuex";
import _ from "lodash";
let area = "";
let plant = "";
export default {
  name: "produce_fill",
  props: {},
  data() {
    return {
      cardStyles: "margin-bottom:16px;padding:12px 32px",
      time: Date.now() - 1000 * 60 * 60 * 24,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      query: {
        year: moment().subtract(1, "days").year().toString(),
        month: moment().subtract(1, "days").month() + 1,
        day: moment().subtract(1, "days").get("date"),
      },
      tabledata: [],
      tableHeight: 400,
      tableShow: true,
      option: tableOption,
      title: "修改",
      dialogVisible: false,
      rowData: {},
      plant: "",
      plantOpiton: [],
      areaName: "",
      plantName: "",
      titleMonth: "",
      titleDay: "",
      uid: "",
      showAll: false, //区域是否显示全公司
      hasAuthority: 1, //0代表可以查看所有区域
    };
  },
  components: { layoutTable, zcurd, cascade },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.dailyRptMd_add = this.permissions["dailyRptMd_add"]; // 新增
    this.dailyRptMd_export = this.permissions["dailyRptMd_export"]; // 导出
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
    this.$nextTick(() => {
      this.tableHeight = this.$refs.produce_fill.offsetHeight - 230;
    });
    this.checkList();
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month = moment(value).month() + 1;
      this.query.day = moment(value).get("date");
    },
    dialogVisible(value) {
      if (value == false) {
        this.rowData = {};
        this.plantOpiton = [];
        this.plant = "";
      }
    },
  },
  methods: {
    showFullScreen(value) {
      this.cardStyles = "";
      this.tableHeight = value;
    },
    exitFullScreen(value) {
      this.cardStyles = "margin-bottom:16px;padding:12px 32px";
      this.tableHeight = value;
    },
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
    // 查询
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
      // if (this.query.area == undefined) {
      //   return this.$message.error("请选择区域或电厂");
      // }
      this.$nextTick(() => {
        getData(this.query).then((res) => {
          let { list, sum } = res.data.data;
          sum.plantCn = "合计";
          list.push(sum);
          let data = list;
          data.forEach((item) => {
            _.forOwn(item, (value, key) => {
              if (key != "remark" && value == null) {
                item[key] = "--";
              }
            });
          });
          this.tabledata = data;
          this.areaName = area;
          this.plantName = plant;
          this.titleMonth = this.query.month;
          this.titleDay = this.query.day;
        });
      });
    },
    onExport() {
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
      // if (this.query.area == undefined) {
      //   return this.$message.error("请先选择区域或电厂");
      // }
      excel("/datamonitor/DailyRptMd/export", {
        ...this.query,
      }).then((res) => {
        let data = res.data;
        if (plant == undefined || area == undefined) {
          area = "";
          plant = "";
        }
        let excelName = `${this.query.year}年 ${this.query.month}月 ${this.query.day}日 ${area} ${plant} 原材料使用情况.xls`;
        this.excel(data, excelName);
      });
    },
    onAdd() {
      let arry = [];
      let data = JSON.parse(JSON.stringify(this.tabledata));
      data = data.slice(0, -1);
      data.forEach((item) => {
        _.forOwn(item, (value, key) => {
          if (value == "--") {
            item[key] = null;
          }
        });
        if (item.id == null) {
          let obj = {};
          obj.label = item.plantCn;
          obj.value = JSON.stringify({
            plant: item.plant,
            plantCn: item.plantCn,
            areaCode: this.query.area,
          });
          arry.push(obj);
        }
      });
      if (!arry.length) {
        return this.$message.info("没有新增项目");
      }
      this.title = "新增";
      this.dialogVisible = true;
      this.rowData = {};
      this.plantOpiton = arry;
      this.plant = this.plantOpiton[0].value;
    },
    // 行编辑
    onEdit(data) {
      _.forOwn(data, (value, key) => {
        if (value == "--") {
          data[key] = null;
        }
      });
      if (data.id == null) {
        return this.$message.error("请先增加");
      }
      this.title = "修改-" + data.plantCn;
      this.dialogVisible = true;
      this.rowData = { ...data };
    },
    // 行删除
    onDel(data) {
      _.forOwn(data, (value, key) => {
        if (value == "--") {
          data[key] = null;
        }
      });
      if (data.id == null) {
        return this.$message.error("该条记录不能删除");
      }
      this.$confirm("确认要删除该条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del({ id: data.id }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.timer = setTimeout(() => {
                this.checkList();
                this.dialogVisible = false;
              }, 300);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消编辑弹窗
    onCancel() {
      this.dialogVisible = false;
    },
    // 确定编辑弹窗
    onOK() {
      let rowdata = JSON.parse(JSON.stringify(this.rowData));
      _.forOwn(rowdata, (value, key) => {
        if (value == "--") {
          rowdata[key] = null;
        }
      });
      if (
        !this.rowData.absBuyDay ||
        !this.rowData.absUseDay ||
        !this.rowData.gypOutputDay ||
        !this.rowData.redUseDay ||
        !this.rowData.redUseDay
      ) {
        return this.$message.info(
          "本日吸收剂采购量，用量，石灰石出库量；本日还原剂采购量、用量不能为空！"
        );
      }
      if (this.title.indexOf("修改") >= 0) {
        update(rowdata)
          .then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.$message.success("修改成功");
              this.timer = setTimeout(() => {
                this.checkList();
                this.dialogVisible = false;
              }, 300);
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      } else {
        // 新增
        if (!this.plant) {
          return this.$message.error("请选择电厂");
        }
        if (!Object.values(rowdata).join("")) {
          return this.$message.error("输入值不能为空");
        }
        let areaCode = _.filter(this.tabledata, (item) => {
          return item.plant == JSON.parse(this.plant).plant;
        })[0];
        let areaObj = { areaCode: areaCode.areaCode, area: areaCode.area };
        let dt = moment(this.time).format("YYYY-MM-DD [00:00:00]");
        // console.log({ ...rowdata, ...JSON.parse(this.plant), dt, ...areaObj })
        add({ ...rowdata, ...JSON.parse(this.plant), dt, ...areaObj })
          .then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.$message.success("新增成功");
              this.timer = setTimeout(() => {
                this.checkList();
                this.dialogVisible = false;
              }, 300);
            } else {
              this.$message.error("新增失败");
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      }
    },
  },
  destroyed() {
    this.$store.commit("SET_SELECTOPTIONS", {
      area: "",
      plant: "",
      areaName: "",
      plantName: "",
    });
  },
};
</script>

<style scoped lang="less">
.produce-fill-wrap {
  height: 100%;
  // 工具栏
  .tool-wrap {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    height: 60px;
    .tool-time-box {
      // margin-right: 30px;
      display: flex;
      align-items: center;
      .time-title {
        // margin-right: -20px;
        width: 40%;
      }
    }
    .tool-org-box {
      margin-right: 0px;
    }
    .tool-btn-box {
      width: 20%;
      margin-left: 40px;
    }
  }

  // 编辑框
  .edit-org-box {
    margin-bottom: 10px;
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    & > div:nth-child(2) {
      margin-left: 10px;
      color: rgba(37, 37, 37, 1);
      font-weight: bold;
    }
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
            & > .ipt-title {
              width: 90%;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.produce-fill-wrap {
  .avue-crud__menu {
    display: none !important;
  }
  .avue-crud__header {
    display: none !important;
  }
  .avue-crud__box .el-card__body,
  .avue-crud__box .el-card__header {
    padding: 0px !important;
  }
  .content-title {
    background: #f5f7fa !important;
  }
  .avue-input-number,
  .el-cascader,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select {
    width: auto;
  }
  @media screen and (min-device-width: 1920px) {
    .el-dialog {
      width: 65% !important;
    }
  }
}
</style>

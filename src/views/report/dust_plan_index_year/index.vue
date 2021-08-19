<template>
  <div class="de_gas" ref="de_ems">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="div__tool-wrap">
        <div class="select__wrap">
          <div>选择时间：</div>
          <div>
            <el-date-picker
              v-model.number="time"
              align="right"
              type="year"
              placeholder="选择日期"
              size="small"
              :clearable="false"
              :editable="false"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div style="margin-left: 20px; display: flex; align-items: center">
          <span>区域/项目：</span>
          <cascade
            @onMyCascader="onMyCascader"
            :hasAuthority="hasAuthority"
            :showAll="showAll"
            :showUnit="false"
            :showSys="false" 
            :tlOrTx="'D'"
          ></cascade>
        </div>
        <!-- <SelOrg
          class="selorg-wrap"
          style="width:40%"
          @selectArear="selectArear"
          @selectPlant="selectPlant"
          :showDevice="false"
          :showSystem="false"
          :showUnit="false"
          :showAll="false"
          :hasAuthority="hasAuthority"
        />-->
        <div
          style="
            width: 30%;
            display: flex;
            padding-left: 20px;
            align-items: center;
          "
        >
          <el-button
            @click="onAdd"
            v-if="hddustplanningindicators_add"
            type="primary"
            size="mini"
            >新增</el-button
          >
          <BtnList
            resetContent="导出"
            btnStyle="textAlign:left;margin-left:10px"
            @check="checkList"
            @reset="onExport"
          />
          <el-button
            @click="importExcelDialogVisible = true"
            style="margin-left: 10px"
            type="primary"
            size="mini"
            v-if="hddustplanningindicators_import"
            >导入</el-button
          >
        </div>
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <div slot="title" class="title">
            <span class="span">{{ year }}</span>年
            <!-- <span class="span">{{ month }}</span> 月 -->
            <span class="span">{{ area_plant }}</span> 除尘计划指标
          </div>
          <div
            class="content-table"
            ref="zcurd"
            slot="table"
            v-if="tableShow"
            v-loading="tableLoading"
          >
            <Zcurd
              ref="curd"
              :point_code="pointCode"
              :year="year"
              :height="tableHeight"
              :tableData="tableData"
              @del="del"
              @update="update"
            />
          </div>
        </layoutTable>
      </div>
    </Card>
    <!-- 编辑对话框 -->
    <el-dialog
      custom-class="edit"
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <div class="edit-box">
        <div class="edit-tool-box" v-if="toolShow">
          <span class="edit-tool-title">选择电厂：</span>
          <el-select size="small" v-model.number="add_sel" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="edit-content-box">
          <div class="row">
            <Box class="item" title="运行计划">
              <div slot="content" class="box-wrap">
                <div class="box">
                  <div class="tilte-box">
                    <span>计划发电量</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    :min="0"
                    @input="changePlanGeneration"
                    v-model.number="rowData.planGeneration"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>装置运行时间</span>
                    <span>(h)</span>
                  </div>
                  <el-input
                    :min="0"
                    type="number"
                    v-model.number="rowData.runTime"
                    size="small"
                  ></el-input>
                </div>

                <div class="box">
                  <div class="tilte-box">
                    <span>计划上网电量</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    :min="0"
                    v-model.number="rowData.planElectricityConsumption"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>计划负荷率</span>
                    <span>(%)</span>
                  </div>
                  <el-input
                    type="number"
                    :min="0"
                    disabled
                    v-model.number="rowData.planLoadRate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>入口烟尘浓度</span>
                    <span>(mg/Nm³)</span>
                  </div>
                  <el-input
                    :min="0"
                    type="number"
                    v-model.number="rowData.inletConsistency"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </Box>
          </div>
          <div class="row row2">
            <Box class="item" title="耗电计划">
              <div slot="content" class="box-wrap">
                <div class="box">
                  <div class="tilte-box">
                    <span>装置耗电率</span>
                    <span>(%)</span>
                  </div>
                  <el-input
                    type="number"
                    @input="changePlanConsumePowerRate"
                    v-model.number="rowData.planConsumePowerRate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>装置耗电量</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    disabled
                    v-model.number="rowData.planConsumePower"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>分摊耗电率</span>
                    <span>(%)</span>
                  </div>
                  <el-input
                    type="number"
                    @input="changeShareConsumePowerRate"
                    v-model.number="rowData.shareConsumePowerRate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>分摊耗电量</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    disabled
                    v-model.number="rowData.shareConsumePower"
                    size="small"
                  ></el-input>
                </div>

                <div class="box">
                  <div class="tilte-box">
                    <span>合计</span>
                    <span>(%)</span>
                  </div>
                  <el-input
                    type="number"
                    disabled
                    v-model.number="rowData.sumConsumePowerRate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>合计</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    disabled
                    v-model="rowData.sumConsumePower"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onOK">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导入excel弹框提示 -->
    <MyUpload
      ref="myUpload"
      @submitUpload="submitUpload"
      :submitLoading="submitLoading"
      :importExcelDialogVisible="importExcelDialogVisible"
      @changeImportExcelDialogVisible="changeImportExcelDialogVisible"
    />
  </div>
</template>

<script>
import cascade from "@/components/selectOrg/index11.vue";
import layoutTable from "../../../components/tableLayout/index";
import { mapGetters } from "vuex";
import {
  getData,
  add,
  modify,
  del,
  upload_dust_plan,
} from "@/api/report/dust_plan_year.js";
import moment from "moment";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud";
import { excel } from "@/api/common";
import Box from "./box.vue";
import { getAddPlant } from "./util.js";
import MyUpload from "@/components/myUpload";
import { getAuthority } from "@/api/admin/user.js";
let area = "";
let plant = "";
let o1 = {
  // month: null,
  pointCode: null,
  pointName: null,
  year: null,
};
export default {
  name: "dust_plan_index",
  props: {},
  data() {
    return {
      submitLoading: false,
      importExcelDialogVisible: false,
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year().toString(),
      // month:
      //   moment(Date.now()).month() + 1 > 9
      //     ? (moment(Date.now()).month() + 1).toString()
      //     : "0" + (moment(Date.now()).month() + 1),
      time: Date.now(),
      pointCode: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      query: {
        year: moment(Date.now()).year().toString(),
        // month:
        //   moment(Date.now()).month() + 1 > 9
        //     ? (moment(Date.now()).month() + 1).toString()
        //     : "0" + (moment(Date.now()).month() + 1),
        point_code: "",
      },
      area: "",
      plant: "",
      area_plant: "",
      tableShow: true,
      title: "修改",
      dialogVisible: false,
      toolShow: false,
      options: [], // 电厂选择下拉框
      add_sel: "",
      rowData: {},
      showAll: true,
      hasAuthority: 0, //0代表可以查看所有区域
    };
  },
  components: { layoutTable, Zcurd, Box, MyUpload, cascade },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.hddustplanningindicators_add = this.permissions[
      "hddustplanningindicators_add"
    ]; // 新增
    this.hddustplanningindicators_export = this.permissions[
      "hddustplanningindicators_export"
    ]; // 下载
    this.hddustplanningindicators_import = this.permissions[
      "hddustplanningindicators_import"
    ]; // 导入
    this.rcode = JSON.parse(sessionStorage.getItem("user")).user.regionCode;
    this.pcode = JSON.parse(sessionStorage.getItem("user")).user.projectCode;
    this.uid = JSON.parse(sessionStorage.getItem("user")).user.user_id;
    // this.getAuthority({ userId: this.uid });
    this.defAreaName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.regionName;
    this.defPlantName = JSON.parse(
      sessionStorage.getItem("user")
    ).user.projectName;
    // 初始化标题默认显示当前登录用户所属区域/电厂
    // if (!this.defPlantName) {
    //   this.$nextTick(() => {
    //     this.area_plant = "";
    //   });
    // } else {
    //   this.$nextTick(() => {
    //     this.area_plant = this.defAreaName + "/" + this.defPlantName;
    //   });
    // }
    //标题默认显示西南区域---盘县
    this.$nextTick(() => {
      this.area_plant = "西南区域/盘县";
    });
  },
  mounted() {
    this.tableShow = false;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.de_ems.offsetHeight - 230;
      this.tableShow = true;
      // this.checkList();
    });
    //初始化默认显示当前登录用户所属电厂的数据
    // if (this.pcode) {
    //   this.query.point_code = this.rcode + "_" + this.pcode;
    // } else {
    //   this.query.point_code = "";
    // }
    //默认显示西南区域---盘县的数据
    this.query.point_code = "XN_PXXM";

    this.checkList();
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      // this.query.month =
      //   moment(value).month() + 1 > 9
      //     ? (moment(value).month() + 1).toString()
      //     : "0" + (moment(value).month() + 1);
    },
    dialogVisible(value) {
      if (value == false) {
        this.add_sel = "";
        this.options = [];
      }
    },
  },
  methods: {
    getAuthority(query) {
      getAuthority(query).then((res) => {
        let identity = res.data.data[0];
        if (
          identity == "ROLE_Supervisor" ||
          identity == "ROLE_Analysiser" ||
          identity == "ROLE_ADMIN"
        ) {
          this.showAll = true;
        } else {
          this.showAll = false;
        }
      });
    },
    getData(query) {
      this.tableLoading = true;
      return;
      get_dust_plan(query).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        let { data } = datas;
        this.tableData = data;
      });
    },
    //新增
    onAdd() {
      let data = JSON.parse(JSON.stringify(this.tableData));
      data.forEach((item, index) => {
        if (item.pointName == "总和") {
          data.splice(index, 1);
        }
        _.forOwn(item, (value, key) => {
          if (value == "--") {
            item[key] = null;
          }
        });
      });
      this.options = getAddPlant(data);
      // if (!this.query.point_code) {
      //   return this.$message.error("请选择区域或电厂");
      // } else
      if (!data.length) {
        return this.$message.error("请先查询");
      } else if (!this.options.length) {
        return this.$message.error("没有新增的项目");
      }
      this.dialogVisible = true;
      this.title = "新增";
      this.toolShow = true;
      let arr = data[0];
      _.forOwn(arr, (value, key) => {
        arr[key] = null;
      });
      this.rowData = arr;
    },
    //查询
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.point_code =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.point_code = "";
        area = "";
        plant = "";
      }
      // if (!this.query.point_code) {
      //   return this.$message.error("请选择区域或者电厂");
      // }
      this.year = this.query.year;
      // this.month = this.query.month;
      // this.pointCode = this.query.pointCode;
      this.area_plant = area ? (plant ? area + "/" + plant : area) : "";
      getData(this.query).then((res) => {
        let data = res.data.data;
        data.forEach((item) => {
          _.forOwn(item, (value, key) => {
            if (value == null) {
              item[key] = "--";
            }
          });
        });
        this.tableData = data;
      });
    },
    //导出
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.point_code =
          this.$store.state.writeData.selectOptions.area +
          "_" +
          this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.point_code = "";
        area = "";
        plant = "";
      }
      // if (!this.query.point_code) {
      //   return this.$message.error("请先选择区域或电厂");
      // }
      excel("/datamonitor/hdDustIndicatorsYear/listByMapDownload", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        this.area_plant = area ? (plant ? area + "/" + plant : area) : "";
        let excelName = `${this.year}年 ${this.area_plant} 除尘计划指标.xlsx`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   plant = "";
    //   // delete this.query.point_code;
    //   // this.query.area = data.deptCode;
    //   // this.query.point_code = data.deptCode;
    //   if (data.deptCode == "all") {
    //     delete this.query.area;
    //     this.query.point_code = "";
    //   } else {
    //     this.query.area = data.deptCode;
    //     this.query.point_code = data.deptCode;
    //   }
    // },
    // selectPlant(data) {
    //   if (data.deptCode == "") {
    //     this.query.point_code = "";
    //   } else {
    //     plant = data.name;
    //     this.query.point_code = this.query.area + "_" + data.deptCode;
    //   }
    // },
    // onMyCascader(data) {
    //   if (!data.plant) {
    //     this.query.point_code = data.area;
    //   } else {
    //     this.query.point_code = data.area + "_" + data.plant;
    //   }
    //   area = data.name.split("/")[0];
    //   plant = data.name.split("/")[1];
    // },
    onMyCascader(data) {
      // if (!data.area || !data.plant) {
      //   return this.$message("请选择区域和电厂");
      // }
      if (data.area == "all") {
        this.query.point_code = "";
      } else {
        if (!data.plant) {
          this.query.point_code = data.area;
        } else {
          this.query.point_code = data.area + "_" + data.plant;
        }
        area = data.name.split("/")[0];
        plant = data.name.split("/")[1];
      }
      this.checkList();
    },
    // 修改
    update(data) {
      let copy = JSON.parse(JSON.stringify(data));
      copy.pointCode = "--";
      copy.pointName = "--";
      _.forOwn(copy, (value, key) => {
        if (value == "--") {
          copy[key] = null;
        }
      });
      if (Object.values(copy).join("") == "") {
        return this.$message.error("请先新增");
      } else {
        copy.pointCode = data.pointCode;
        copy.pointName = data.pointName;
        this.dialogVisible = true;
        this.title = "修改" + " - " + data.pointName;
        this.toolShow = false;
        this.rowData = copy;
      }
    },
    // 删除
    del(data) {
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
    // 编辑框取消
    onCancel() {
      this.dialogVisible = false;
    },
    // 编辑框确认
    onOK() {
      let text = this.title == "新增" ? "新增" : "修改";
      this.rowData.year = this.query.year;
      if (this.title == "新增") {
        if (!this.add_sel) {
          return this.$message.error("请选择电厂");
        }
        this.rowData.pointCode = this.add_sel;
        add(this.rowData)
          .then((res) => {
            if (res.data.msg == "success") {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
            } else {
              return this.$message.error("新增失败");
            }
          })
          .catch((res) => {
            this.$message.error("新增失败");
          });
      } else {
        delete this.rowData.pointName;
        modify(this.rowData)
          .then((res) => {
            if (res.data.msg == "success") {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
            } else {
              return this.$message.error("修改失败");
            }
          })
          .catch(() => {
            this.$message.error("修改失败");
          });
      }
      this.timer = setTimeout(() => {
        this.checkList();
        this.dialogVisible = false;
      }, 300);
    },
    // 改变计划发电量
    changePlanGeneration(data) {
      this.rowData["planConsumePower"] = Number(
        ((data * this.rowData["planConsumePowerRate"]) / 100).toFixed(4)
      );
      this.rowData["shareConsumePower"] = Number(
        ((data * this.rowData["shareConsumePowerRate"]) / 100).toFixed(4)
      );
      this.rowData["sumConsumePower"] = Number(
        (
          this.rowData["planConsumePower"] * 1 +
          this.rowData["shareConsumePower"] * 1
        ).toFixed(2)
      );
      this.rowData["sumConsumePowerRate"] = Number(
        (
          (this.rowData["sumConsumePower"] / this.rowData["planGeneration"]) *
          100
        ).toFixed(4)
      );
    },
    // 改变装置电耗率
    changePlanConsumePowerRate(data) {
      this.rowData["planConsumePower"] = Number(
        ((data / 100) * this.rowData["planGeneration"]).toFixed(4)
      );
      this.rowData["sumConsumePower"] = Number(
        (
          this.rowData["planConsumePower"] * 1 +
          this.rowData["shareConsumePower"] * 1
        ).toFixed(2)
      );
      this.rowData["sumConsumePowerRate"] = Number(
        (
          (this.rowData["sumConsumePower"] / this.rowData["planGeneration"]) *
          100
        ).toFixed(4)
      );
    },
    // 改变分摊电耗率
    changeShareConsumePowerRate(data) {
      this.rowData["shareConsumePower"] = Number(
        ((data / 100) * this.rowData["planGeneration"]).toFixed(4)
      );
      this.rowData["sumConsumePower"] = Number(
        (
          this.rowData["planConsumePower"] * 1 +
          this.rowData["shareConsumePower"] * 1
        ).toFixed(2)
      );
      this.rowData["sumConsumePowerRate"] = Number(
        (
          (this.rowData["sumConsumePower"] / this.rowData["planGeneration"]) *
          100
        ).toFixed(4)
      );
    },
    // 导入excel
    submitUpload(formData) {
      this.submitLoading = true;
      upload_dust_plan(formData)
        .then((res) => {
          let code = res.data.code;
          if (code == 0) {
            this.$message.success("上传成功！");
            this.submitLoading = false;
            this.importExcelDialogVisible = false;
            this.$refs.myUpload.clearFils(); // 清空已上传的文件
          } else if(code == 3 || code == 1) {
            this.submitLoading = false;
            this.$message.error(res.data.msg);
            this.$refs.myUpload.clearFils(); // 清空已上传的文件
          }else{
            this.submitLoading = false;
            this.$message.error('上传失败')
            this.$refs.myUpload.clearFils(); // 清空已上传的文件
          }
        })
        .catch((err) => {
          this.submitLoading = false;
          this.$message.error(err);
          this.$refs.myUpload.clearFils(); // 清空已上传的文件
        });
    },
    changeImportExcelDialogVisible(value) {
      this.importExcelDialogVisible = value;
    },
  },
  destroy() {
    this.timer = null;
    clearTimeout(this.timer);
  },
};
</script>

<style scoped lang="less">
.de_gas {
  height: 100%;
  .div__tool-wrap {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 20px 8px;
    .select__wrap {
      height: 42px;
      line-height: 42px;
      display: table;
      max-width: 25%;
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

    .title {
      font-size: 18px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
    }
    .content-table {
      padding-bottom: 20px;
    }
  }

  // 编辑框
  .edit-box {
    display: flex;
    flex-direction: column;
    .edit-tool-box {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .edit-tool-title {
        display: inline-block;
        width: 10%;
      }
    }
    .edit-content-box {
      .row {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        .item {
          margin-right: 10px;
          .box-wrap {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
          }
          .box {
            display: flex;
            width: 50%;
            justify-content: flex-end;
            padding: 10px;
            align-items: center;
            // margin-bottom:10px;
            & > .tilte-box {
              width: 60%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 10px;
              text-align: center;
            }
            .ipt {
              width: 180px !important;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.de_gas {
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
  }
  .el-table__fixed-footer-wrapper tbody td {
    background-color: #fff;
  }
  .el-table__footer-wrapper tbody td,
  .el-table__header-wrapper tbody td {
    background-color: #fff;
  }
  @media screen and (min-device-width: 1920px) {
    .el-dialog {
      width: 60% !important;
    }
  }
}
</style>

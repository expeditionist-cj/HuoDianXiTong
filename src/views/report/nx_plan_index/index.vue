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
              type="month"
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
            :tlOrTx="'N'"
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
        /> -->

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
            v-if="hdTxIndicator_add"
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
            v-if="hdTxIndicator_import"
            >导入</el-button
          >
        </div>
      </div>
      <div class="div__content-wrap">
        <layoutTable>
          <div slot="title" class="title">
            <span class="span">{{ year }}</span>年 <span class="span">{{ month }}</span>月
            <span class="span">{{
              area_plant.indexOf("undefined") >= 0 ? "" : area_plant
            }}</span>
            脱硝计划指标
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
              :month="month"
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
      width="80%"
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
            <Box class="item" title="运行计划" style="width: 60%">
              <div slot="content" class="box-wrap">
                <div class="box">
                  <div class="tilte-box">
                    <span>计划发电量</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    :min="0"
                    v-model.number="rowData.plan_power"
                    size="small"
                    @input="changePlantPower"
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
                    v-model.number="rowData.run_time"
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
                    v-model.number="rowData.plan_net_power"
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
                    v-model.number="rowData.plan_load_rate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box">
                  <div class="tilte-box">
                    <span>入口NOx浓度</span>
                    <span>(mg/Nm3)</span>
                  </div>
                  <el-input
                    :min="0"
                    type="number"
                    v-model.number="rowData.in_nox"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </Box>

            <Box class="item" title="还原耗用计划" style="width: 35%">
              <div slot="content">
                <div class="box" style="width: 100%">
                  <div class="tilte-box">
                    <span>还原剂耗用率</span>
                    <span>(t/万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    :min="0"
                    v-model.number="rowData.xsj_rate"
                    size="small"
                    @input="changeXsj_rate"
                  ></el-input>
                </div>
                <div class="box" style="width: 100%">
                  <div class="tilte-box">
                    <span>还原剂耗用量</span>
                    <span>(t)</span>
                  </div>
                  <el-input
                    :min="0"
                    disabled
                    type="number"
                    v-model.number="rowData.xsj"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </Box>
          </div>
          <div class="row row2">
            <Box class="item" title="耗电计划" style="width: 60%">
              <div slot="content" class="box-wrap">
                <div class="box">
                  <div class="tilte-box">
                    <span>装置耗电率</span>
                    <span>(%)</span>
                  </div>
                  <el-input
                    type="number"
                    @input="change_hd_rate"
                    v-model.number="rowData.hd_rate"
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
                    v-model.number="rowData.hd"
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
                    @input="change_ft_rate"
                    v-model.number="rowData.ft_rate"
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
                    v-model.number="rowData.ft"
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
                    v-model.number="rowData.total_rate"
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
                    v-model.number="rowData.total"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </Box>

            <Box class="item" title="蒸汽耗用计划" style="width: 35%">
              <div slot="content">
                <div class="box" style="width: 100%">
                  <div class="tilte-box">
                    <span>蒸汽耗用率</span>
                    <span>(万KWh)</span>
                  </div>
                  <el-input
                    type="number"
                    @input="change_water_rate"
                    v-model.number="rowData.gas_rate"
                    size="small"
                  ></el-input>
                </div>
                <div class="box" style="width: 100%">
                  <div class="tilte-box">
                    <span>蒸汽耗用量</span>
                    <span>(t)</span>
                  </div>
                  <el-input
                    type="number"
                    disabled
                    v-model.number="rowData.gas"
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
  add_de_plan,
  del_de_plan,
  update_de_plan,
  get_de_plan,
  upload_nx_plan,
} from "@/api/report/nx_plan";
import moment from "moment";
import "moment/locale/zh-cn";
import Zcurd from "./zcrud";
import { excel } from "@/api/common";
import Box from "../dust_plan_index/box";
import { hasNoData, hasNoDataProject } from "./util.js";
import MyUpload from "@/components/myUpload";
import { getAuthority } from "@/api/admin/user.js";
let area = "";
let plant = "";
export default {
  name: "nx_plan_index",
  props: {},
  data() {
    return {
      submitLoading: false,
      importExcelDialogVisible: false,
      tableLoading: false,
      tableHeight: 400,
      year: moment(Date.now()).year().toString(),
      month:
        moment(Date.now()).month() + 1 > 9
          ? (moment(Date.now()).month() + 1).toString()
          : "0" + (moment(Date.now()).month() + 1),
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
        month:
          moment(Date.now()).month() + 1 > 9
            ? (moment(Date.now()).month() + 1).toString()
            : "0" + (moment(Date.now()).month() + 1),
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
      rcode: "",
      pcode: "",
      hasAuthority: 0, //  0代表可以查看所有区域
    };
  },
  components: { layoutTable, Zcurd, Box, MyUpload, cascade },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.hdTxIndicator_add = this.permissions["hdTxIndicator_add"]; // 新增
    this.hdTxIndicator_export = this.permissions["hdTxIndicator_export"]; // 下载
    this.hdTxIndicator_import = this.permissions["hdTxIndicator_import"]; // 导入

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
      this.tableHeight = this.$refs.de_ems.offsetHeight - 230;
      this.tableShow = true;
      // this.checkList();
    });
    if (this.pcode) {
      this.query.regionCode = this.rcode;
      this.query.projectCode = this.pcode;
    } else {
      delete this.query.regionCode;
      delete this.query.projectCode;
    }
    this.checkList();
  },
  watch: {
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month =
        moment(value).month() + 1 > 9
          ? (moment(value).month() + 1).toString()
          : "0" + (moment(value).month() + 1);
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
    get_de_plan(query) {
      this.tableLoading = true;
      return;
      get_de_plan(query).then((res) => {
        this.tableLoading = false;
        let datas = res.data.data;
        let { data } = datas;
        this.tableData = data;
      });
    },
    //新增
    onAdd() {
      let data = JSON.parse(JSON.stringify(this.tableData));
      data.forEach((item) => {
        _.forOwn(item, (value, key) => {
          if (value == "--") {
            item[key] = null;
          }
        });
      });
      let projectArray = hasNoDataProject(data);
      if (!data.length) {
        return this.$message.error("请先查询");
      } else if (projectArray.length <= 0) {
        return this.$message.error("没有新增的项目");
      }
      this.options = projectArray.map((item) => {
        return {
          label: item.plant_name,
          value: item.region_code + "_" + item.plant_code,
        };
      });
      this.dialogVisible = true;
      this.title = "新增";
      this.toolShow = true;
      this.rowData = {};
    },
    //查询
    checkList() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.regionCode = this.$store.state.writeData.selectOptions.area;
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.regionCode = null;
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      this.year = this.query.year;
      this.month = this.query.month;
      this.area_plant = area ? (plant ? area + "/" + plant : area) : "";
      get_de_plan(this.query).then((res) => {
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
    onExport() {
      if (this.$store.state.writeData.selectOptions.plant) {
        this.query.regionCode = this.$store.state.writeData.selectOptions.area;
        this.query.projectCode = this.$store.state.writeData.selectOptions.plant;
        area = this.$store.state.writeData.selectOptions.areaName;
        plant = this.$store.state.writeData.selectOptions.plantName;
      } else {
        this.query.regionCode = null;
        this.query.projectCode = null;
        area = "";
        plant = "";
      }
      excel("/datamonitor/hdtxindicator/export", {
        ...this.query,
        plantName: plant,
      }).then((res) => {
        let data = res.data;
        this.area_plant = area ? (plant ? area + "/" + plant : area) : "";
        let excelName = `${this.year}年 ${this.month}月 ${this.area_plant} 脱硝计划指标.xlsx`;
        this.excel(data, excelName);
      });
    },
    // selectArear(data) {
    //   area = data.name;
    //   plant = "";
    //   delete this.query.regionCode;
    //   delete this.query.projectCode;
    //   if (data.deptCode != "all") {
    //     this.query.regionCode = data.deptCode;
    //   }
    // },
    // selectPlant(data) {
    //   if (data.deptCode == "") {
    //     this.query = _.omit(this.query, "plant");
    //   } else {
    //     plant = data.name;
    //     this.query.projectCode = data.deptCode;
    //   }
    // },
    onMyCascader(data) {
      // if(!data.area || !data.plant){
      //   return this.$message("请选择区域和电厂")
      // }
      if (data.area == "all") {
        delete this.query.regionCode;
        delete this.query.projectCode;
      } else {
        this.query.regionCode = data.area;
        this.query.projectCode = data.plant;
        area = data.name.split("/")[0];
        plant = data.name.split("/")[1];
      }
      this.checkList();
    },
    // 修改
    update(data) {
      _.forOwn(data, (value, key) => {
        if (value == "--") {
          data[key] = null;
        }
      });
      if (hasNoData(data) <= 0) {
        return this.$message.error("请先新增");
      }
      this.dialogVisible = true;
      this.title = "修改" + " - " + data.plant_name;
      this.toolShow = false;
      this.rowData = { ...data };
    },
    // 删除
    del(data) {
      let query = {
        year: parseInt(this.query.year),
        month: parseInt(this.query.month),
        projectCode: data.plant_code,
      };
      this.$confirm("确认要删除该条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del_de_plan(query).then((res) => {
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
      //当前是新增编辑框
      if (this.title == "新增") {
        if (!this.add_sel) {
          return this.$message.error("请选择电厂");
        }
        let query = {
          month: this.query.month,
          year: this.query.year,
          regionCode: this.add_sel.split("_")[0],
          projectCode: this.add_sel.split("_")[1],
          data: { ...this.rowData },
        };
        add_de_plan(query)
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
        //当前是修改编辑框
        delete this.rowData.plant_name;
        let keys = Object.keys(this.rowData);
        keys.forEach((key) => {
          if (this.rowData[key] == "") {
            this.rowData[key] = null;
          }
        });
        let query = {
          year: this.rowData.year,
          month: this.rowData.month,
          regionCode: this.rowData.region_code,
          projectCode: this.rowData.plant_code,
          data: this.rowData,
        };
        update_de_plan(query)
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
    changePlantPower(data) {
      this.rowData["xsj"] = Number(data * this.rowData["xsj_rate"]).toFixed(2);
      this.rowData["hd"] = Number(
        ((data * this.rowData["hd_rate"]) / 100).toFixed(4)
      );
      this.rowData["ft"] = Number(
        ((data * this.rowData["ft_rate"]) / 100).toFixed(4)
      );
      this.rowData["total"] = Number(
        (this.rowData["hd"] * 1 + this.rowData["ft"] * 1).toFixed(4)
      );
      this.rowData["gas"] = Number(data * this.rowData["gas_rate"]);
      this.rowData["total_rate"] = Number(
        ((this.rowData["total"] / data) * 100).toFixed(4)
      );
    },
    // 改变还原剂耗用率
    changeXsj_rate(data) {
      // 【还原剂耗用量】=【计划发电量】*【还原剂耗用率】；
      this.rowData["xsj"] = Number(data * this.rowData["plan_power"]).toFixed(
        2
      );
    },
    // 改变装置耗电率
    change_hd_rate(data) {
      this.rowData["hd"] = Number(
        ((data * this.rowData["plan_power"]) / 100).toFixed(4)
      );
      this.rowData["total"] = Number(
        (this.rowData["hd"] * 1 + this.rowData["ft"] * 1).toFixed(4)
      );
      this.rowData["total_rate"] = Number(
        ((this.rowData["total"] / this.rowData["plan_power"]) * 100).toFixed(4)
      );
    },
    // 改变分摊耗电率
    change_ft_rate(data) {
      this.rowData["ft"] = Number(
        ((data * this.rowData["plan_power"]) / 100).toFixed(4)
      );
      this.rowData["total"] = Number(
        this.rowData["hd"] * 1 + this.rowData["ft"] * 1
      );
      this.rowData["total_rate"] = Number(
        ((this.rowData["total"] / this.rowData["plan_power"]) * 100).toFixed(4)
      );
    },
    // 改变耗水率
    change_water_rate(data) {
      this.rowData["gas"] = Number(data * this.rowData["plan_power"]);
    },
    // 导入excel
    submitUpload(formData) {
      this.submitLoading = true;
      console.log(formData);

      upload_nx_plan(formData)
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
          width: 32%;
          margin-right: 10px;
          .box-wrap {
            display: flex;
            flex-direction: flex-start;
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

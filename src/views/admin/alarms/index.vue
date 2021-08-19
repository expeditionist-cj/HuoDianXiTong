<template>
  <div class="alarms-container">
    <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
      <div class="alarms-header">
        <SelOrg class="alarms-sel"
                @selectArear="selectArear"
                @selectPlant="selectPlant"
                @selectUnit="selectUnit"
                :showDevice="false"
                :showSystem="false"
                :showGy="true"
                ref="myorg" />
        <div style="display: flex; align-items: center; margin: -20px 40px 0 0">
          <div style="width: 70px; margin-left: 20px">装置：</div>
          <el-select v-model="checkedDevice"
                     size="small"
                     placeholder="请选择">
            <el-option v-for="(item, index) in optDevice"
                       :key="index"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
        </div>
        <el-button class="alarms-btn"
                   type="primary"
                   @click="getAlarmData"
                   size="small">查询</el-button>
        <el-button class="alarms-btn"
                   type="primary"
                   @click="doAdd"
                   size="small">新增</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column fixed
                         prop="id"
                         label="序号"
                         align="center"
                         min-width="50"></el-table-column>
        <el-table-column prop="alarmName"
                         label="报警名"
                         align="center"
                         min-width="100"></el-table-column>
        <el-table-column prop="deptName"
                         label="电厂"
                         align="center"
                         min-width="100"></el-table-column>
        <el-table-column prop="DEVICE_NAME"
                         label="机组"
                         align="center"
                         min-width="100"></el-table-column>
        <el-table-column prop="deviceName"
                         label="装置"
                         align="center"
                         min-width="100"></el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button @click="doClick(scope.row)"
                       type="text"
                       size="small">查看</el-button>
            <el-button @click="doUpdate(scope.row)"
                       type="text"
                       size="small">修改</el-button>
            <el-button @click="doChangeEnable(scope.row)"
                       type="text"
                       size="small">{{scope.row.enable > 0 ? '停用' : '启用'}}</el-button>
            <el-button @click="doDelete(scope.row)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 计算点详细信息 -->
      <el-dialog :title="title"
                 :visible.sync="dialogVisible"
                 width="80%"
                 :close-on-click-modal="false">
        <div v-if="title == '修改'"
             style="
            display: flex;
            font-size: 16px;
            margin-left: 25px;
            margin-bottom: 20px;
          ">
          <span style="display: inline-block; margin-right: 50px">区域/项目：{{ areaName }}
          </span>
          <span style="display: inline-block; margin-right: 50px">
            电厂：{{ plantName }}</span>
          <span style="display: inline-block; margin-right: 50px">
            机组： {{ unitName }}</span>
          <span style="display: inline-block; margin-right: 50px">装置： {{ deviceName }}</span>
        </div>
        <div v-if="title == '新增' || title == '修改'"
             style="display: flex; margin: 0 0 20px 20px">
          <SelOrg class="alarms-sel"
                  @selectArear="selectArear"
                  @selectPlant="selectPlant"
                  @selectUnit="selectUnit"
                  :showDevice="false"
                  :showSystem="false"
                  :showGy="true"
                  ref="myorg" />

          <div style="display: flex; align-items: center">
            <div style="width: 70px; margin-left: 20px">装置：</div>
            <el-select v-model="checkedDevice"
                       size="small"
                       placeholder="请选择">
              <el-option v-for="(item, index) in optDevice"
                         :key="index"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div style="margin: 0 0 20px 20px; display: flex"
             v-else>
          <div style="display: flex; align-items: center">
            <div style="width: 70px; min-width: 80px">区域/公司：</div>
            <el-input v-model="areaName"
                      :readonly="true"></el-input>
          </div>
          <div style="display: flex; align-items: center">
            <div style="width: 70px; margin-left: 20px">项目：</div>
            <el-input v-model="plantName"
                      :readonly="true"></el-input>
          </div>
          <div style="display: flex; align-items: center">
            <div style="width: 70px; margin-left: 20px">机组：</div>
            <el-input v-model="unitName"
                      :readonly="true"></el-input>
          </div>
          <div style="display: flex; align-items: center">
            <div style="width: 70px; margin-left: 20px">装置：</div>
            <el-input v-model="deviceName"
                      :readonly="true"></el-input>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px">
          <div style="
              width: 70px;
              margin-left: 20px;
              min-width: 80px;
              text-align: right;
            ">
            报警名：
          </div>
          <el-input style="width: 200px"
                    v-model="alarmName"
                    :readonly="isReadOnly"></el-input>
        </div>
        <el-form :model="dynamicValidateForm"
                 ref="dynamicValidateForm"
                 label-width="100px">
          <!-- 动态增加 -->
          <el-row :gutter="20"
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="index">
            <el-col :span="8">
              <el-form-item :label="'P' + (index + 0)"
                            :prop="'domains[' + index + '].cn'"
                            :rules="[
                  {
                    required: true,
                    message: '请输入中文描述',
                    trigger: 'blur',
                  },
                ]">
                <el-input v-model="domain.cn"
                          placeholder="请输入中文描述"
                          :readonly="isReadOnly"
                          clearable
                          :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label-width="0"
                            :prop="'domains[' + index + '].en'"
                            :rules="[
                  { required: true, message: '请输入点名', trigger: 'blur' },
                ]">
                <el-input v-model="domain.en"
                          placeholder="请输入点名"
                          clearable
                          :readonly="isReadOnly"
                          :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0"
                            :prop="'domains[' + index + '].value'"
                            :rules="[
                  { required: true, message: '请先校验', trigger: 'blur' },
                ]">
                <span v-show="!isReadOnly">返回值：{{ domain.value }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6"
                    v-show="!isReadOnly">
              <el-tooltip class="item"
                          effect="dark"
                          content="点击验证"
                          placement="top">
                <el-button @click="valMult(index)"
                           type="primary"
                           icon="el-icon-check"
                           circle></el-button>
              </el-tooltip>

              <el-button @click="addP"
                         type="primary"
                         icon="el-icon-circle-plus-outline"
                         circle></el-button>
              <el-button @click="delP(index)"
                         type="primary"
                         icon="el-icon-remove-outline"
                         circle></el-button>
            </el-col>
          </el-row>

          <el-form-item label="公式框"
                        prop="formula"
                        :rules="[
              { required: true, message: '请输入公式', trigger: 'blur' },
            ]">
            <el-input v-model="dynamicValidateForm.formula"
                      type="textarea"
                      placeholder="请输入公式"
                      :readonly="isReadOnly"
                      clearable
                      :autosize="{ minRows: 10, maxRows: 100 }"
                      :style="{ width: '100%' }"></el-input>
          </el-form-item>

          <el-form-item size="small">
            <div style="display: flex; justify-content: space-between">
              <div v-show="!isReadOnly">
                <el-button type="primary"
                           @click="submitForm">校验</el-button>
                <el-button @click="resetForm"
                           type="primary"
                           style="margin-right: 20px">重置</el-button>
                <span>{{ loadingText }}</span>
              </div>
              <div v-show="!isReadOnly">返回值：{{ formulaResult }}</div>
              <div>
                <el-button @click="onCptExpOk"
                           v-show="!isReadOnly"
                           type="primary">确定</el-button>
                <el-button @click="onCancel"
                           type="primary">取消</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination style="text-align: right"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
    </Card>
  </div>
</template>
<script>
import {
  getAlarm,
  validateSinglePoint,
  validatePoints,
  addAlarm,
  delAlarm,
  updateAlarm,
  changeEnable
} from "@/api/admin/alg.js";

let idx = 0;
export default {
  data () {
    return {
      isReadOnly: false,
      dynamicValidateForm: {
        domains: [
          {
            cn: "",
            en: "",
            value: "",
          },
        ],
        formula: "", // 公式
      },
      checkedDevice: "",
      optDevice: [
        {
          label: "请选择",
          value: null,
        },
        {
          label: "脱硫",
          value: "S",
        },
        {
          label: "脱硝",
          value: "N",
        },
      ],
      loading: false,
      loadingText: "",
      formulaResult: "",
      iscptExpPass: false,
      area: "",
      plant: "",
      unit: "",
      device: "",
      areaName: "",
      plantName: "",
      unitName: "",
      deviceName: "",
      title: "",
      dialogData: {},
      dialogVisible: false,
      cptExp: "",
      point: "",
      points: "",
      alarmName: "",
      plantOptions: [],
      unitOptions: [],
      tableData: [],
      query: {
        size: 10,
        current: 1,
      },
      alarm_id: "",
      showDetail: false,
      currentPage: 1,
      total: 0,
    };
  },
  mounted () {
    this.getAlarmData();
  },
  watch: {
    //选择装置
    checkedDevice (value) {
      this.deviceName = value.label;
      this.device = value.value;
      this.query.device = value.value;
      this.query.current = 1;
      this.currentPage = 1;
    },
    dialogVisible (value) {
      if (!value) {
        // this.area = "";
        // this.plant = "";
        // this.unit = "";
        // this.device = "";
        // this.areaName = "";
        // this.alarmName = "";
        // this.plantName = "";
        // this.unitName = "";
        // this.deviceName = "";
        // this.checkedDevice = "";
        this.$refs["dynamicValidateForm"].resetFields();
      }
    },
  },
  components: {},
  methods: {
    // 验证多测点
    valMult (index) {
      let data = this.dynamicValidateForm.domains[index];
      if (!data.cn || !data.en) {
        return this.$message.error("请输入中文描述和点名");
      }
      validateSinglePoint({
        point: data.en,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message.success("验证成功");
            data.value = res.data.data.av;
          } else {
            this.$message.error("验证失败");
            data.value = "验证失败";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * 吸收塔浆液密度
     * 吸收塔浆液密度
     * W3.HN_LYXM.11:S:X:TB:AB6:DDB
     *
     * if(P0<1080||P0>1140){
        '2';
        }else{
        '0';
        }
     */
    // 验证公式及测点的正确性
    submitForm () {
      this.$refs["dynamicValidateForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let points = [];
          this.dynamicValidateForm.domains.forEach((item, index) => {
            points.push({
              code: item.en,
              name: item.cn,
              dCode: "P" + index,
            });
          });
          points = JSON.stringify(points);
          // 验证
          validatePoints({
            points,
            cptExp: this.dynamicValidateForm.formula,
          })
            .then((res) => {
              this.formulaResult =
                res.data.data == null ? "null" : res.data.data;
              if (res.data.data != null) {
                this.loading = false;
                this.iscptExpPass = true;
                this.loadingText = "校验成功";
              } else {
                this.loading = false;
                this.iscptExpPass = false;
                this.loadingText = "校验失败";
                this.$message.error(res.data.value);
              }
            })
            .catch((e) => {
              this.loading = false;
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
    resetForm () {
      this.dynamicValidateForm.formula = "";
    },
    // 确定新增
    onCptExpOk () {
      if (this.title == "新增") {
        if (!this.iscptExpPass) {
          return this.$message.error("算法验证未通过，不能新增");
        }
        let points = [];
        this.dynamicValidateForm.domains.forEach((item, index) => {
          points.push({
            code: item.en,
            name: item.cn,
            dCode: "P" + index,
          });
        });
        points = JSON.stringify(points);
        let arr = [];
        arr.push({
          alarmName: this.alarmName,
          plant: this.plant,
          unit: this.unit,
          device: this.device,
          points,
          cptExp: this.dynamicValidateForm.formula,
        });
        addAlarm(arr)
          .then((res) => {
            let code = res.data.code;
            if (code == 0) {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              // delete this.query.area;
              // delete this.query.plant;
              // delete this.query.unit;
              // delete this.query.device;
              this.query.current = 1;
              this.currentPage = 1;
              this.getAlarmData();
            } else {
              this.$message.error("新增失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.title == "修改") {
        // updateAlarm(arr).then((res) => {
        //   console.log(res);
        // });

        delAlarm({ id: this.alarm_id }).then((res) => {
          let code = res.data.code;
          if (code == 0) {
            if (!this.iscptExpPass) {
              return this.$message.error("算法验证未通过，不能修改");
            }
            let points = [];
            this.dynamicValidateForm.domains.forEach((item, index) => {
              points.push({
                code: item.en,
                name: item.cn,
                dCode: "P" + index,
              });
            });
            points = JSON.stringify(points);
            let arr = [];
            arr.push({
              id: this.alarm_id,
              alarmName: this.alarmName,
              plant: this.plant,
              unit: this.unit,
              device: this.device,
              points,
              cptExp: this.dynamicValidateForm.formula,
            });
            addAlarm(arr)
              .then((res) => {
                let code = res.data.code;
                if (code == 0) {
                  this.$message.success("修改成功");
                  this.dialogVisible = false;
                  this.query.current = 1;
                  this.currentPage = 1;
                  // delete this.query.area;
                  // delete this.query.plant;
                  // delete this.query.unit;
                  // delete this.query.device;
                  this.getAlarmData();
                } else {
                  this.$message.error("修改失败");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            return this.$message.error("修改失败");
          }
        });
      }
    },
    handleSizeChange (val) {
      this.query.size = val;
      this.getAlarmData();
    },
    handleCurrentChange (val) {
      this.query.current = val;
      this.currentPage = val;
      this.getAlarmData();
    },
    // 查询
    getAlarmData () {
      getAlarm({
        ...this.query,
      }).then((res) => {
        let data = res.data.data.records;
        let { total } = res.data.data;
        data.forEach((ele) => {
          if (!ele.unit) {
            ele.DEVICE_NAME = "公用";
          }
        });
        this.tableData = data;
        this.total = parseInt(total);
      });
    },
    //查看
    doClick (data) {
      this.isReadOnly = true;
      this.dialogVisible = true;
      this.iscptExpPass = false;
      let {
        points,
        cptExp,
        alarmName,
        areaName,
        deptName,
        DEVICE_NAME,
        deviceName,
      } = data;
      this.areaName = areaName;
      this.alarmName = alarmName;
      this.plantName = deptName;
      this.unitName = DEVICE_NAME;
      this.deviceName = deviceName || "";
      let p = JSON.parse(points);
      let domains = [];
      p.forEach((ele) => {
        domains.push({
          cn: ele.name,
          en: ele.code,
          value: "",
        });
      });
      this.title = "查看";
      this.dynamicValidateForm = {
        domains,
        formula: cptExp, // 公式
      };
    },
    // 修改
    doUpdate (data) {
      this.title = "修改";
      this.areaName = data.areaName;
      this.plantName = data.deptName;
      this.unitName = data.DEVICE_NAME;
      this.deviceName = data.deviceName;
      this.alarm_id = data.id;
      this.area = data.plant ? data.plant.split("_")[0] : "";
      this.plant = data.plant || "";
      this.unit = data.unit;
      this.device = data.device;
      this.dialogVisible = true;
      this.isReadOnly = false;
      this.iscptExpPass = false;
      this.alarmName = data.alarmName;
      this.loadingText = "";
      let points = JSON.parse(data.points);
      let domains = [];
      points.forEach((ele) => {
        domains.push({
          cn: ele.name,
          en: ele.code,
          value: ele.dCode,
        });
      });
      this.dynamicValidateForm = {
        domains,
        formula: data.cptExp, // 公式
      };
    },
    doChangeEnable (row) {
      changeEnable({
        id: row.id,
        status: Number(!row.enable)
      }).then(res => {
        if(res.data.code === 0) {
          this.$message.success("操作成功")
          this.getAlarmData()
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 删除
    doDelete (data) {
      delAlarm({ id: data.id })
        .then((res) => {
          let code = res.data.code;
          if (code == 0) {
            this.$message.success("删除成功");
            this.getAlarmData();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除参数
    delP (index) {
      let { domains } = this.dynamicValidateForm;
      let length = domains.length;
      if (length == 1) {
        return this.$message({
          message: "至少保留一个参数",
          type: "warning",
        });
      }
      domains.splice(index, 1);
    },
    // 添加参数
    addP () {
      this.dynamicValidateForm.domains.push({
        cn: "",
        en: "",
        value: "",
      });
    },
    // 新增
    doAdd () {
      // this.area = "";
      // this.plant = "";
      // this.unit = "";
      // this.device = "";
      this.dialogVisible = true;
      this.isReadOnly = false;
      this.iscptExpPass = false;
      this.title = "新增";
      // this.checkedDevice = "";
      this.alarmName = "";
      this.loadingText = "";
      this.dynamicValidateForm = {
        domains: [
          {
            cn: "",
            en: "",
            value: "",
          },
        ],
        formula: "", // 公式
      };
    },
    onCancel () {
      this.dialogVisible = false;
    },
    // 选择项目
    selectArear (data) {
      delete this.query.plant;
      delete this.query.unit;
      this.area = data.deptCode;
      this.query.area = data.deptCode;
      this.areaName = data.name;
      this.query.current = 1;
      this.currentPage = 1;
      // this.plantName = "";
      // this.unitName = "";
    },
    // 选择项目
    selectPlant (data) {
      if (!data.deptCode) {
        return this.$message.error("网络连接超时");
      }
      this.query.current = 1;
      this.currentPage = 1;
      delete this.query.unit;
      this.plantName = data.name;
      // this.unitName = "";
      this.plant = this.area + "_" + data.deptCode;
      this.query.plant = this.area + "_" + data.deptCode;
    },
    // 选择机组
    selectUnit (data) {
      this.query.current = 1;
      this.currentPage = 1;
      this.unitName = data.deviceName;
      this.unit = data.deviceCode;
      this.query.unit = data.deviceCode;
    },
  },
};
</script>

<style lang="scss">
.alarms-container {
  .alarms-header {
    display: flex;
    .alarms-sel {
      margin: 0 20px 20px 0;
    }
    .alarms-btn {
      height: 28px;
      line-height: 5px;
      margin-top: 7px;
    }
  }
  .alarms-body {
    width: 80%;
    height: 100%;
  }
  .dialog-div {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    & > span {
      display: inline-block;
      min-width: 150px;
    }
    .ipt {
      width: 80%;
      margin-right: 20px;
    }
    .btn {
      line-height: 5px;
      margin-right: 20px;
    }
  }
}
.el-dialog__body {
  padding: 30px 60px 30px 20px;
}
</style>

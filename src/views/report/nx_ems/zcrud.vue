<template>
  <div class="zcrud" v-loading="loading">
    <el-table :data="tableData" style="width: 100%" size="small" :height="height">
      <el-table-column align="center" label="日期" prop="day" width="140" fixed></el-table-column>

      <!-- 还原剂（液氨）-->
      <el-table-column label="还原剂（液氨）" align="center">
        <el-table-column align="center" label="采购量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_YA['采购量']['prop']"
            :minWidth="NX_EMS_YA['采购量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="库存量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_YA['库存量']['prop']"
            :minWidth="NX_EMS_YA['库存量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="纯度>99.6%">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_YA['纯度>99.6%']['prop']"
            :minWidth="NX_EMS_YA['纯度>99.6%']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          v-for="(item, index) of unitList"
          :key="index"
          :label="item + '耗量'"
        >
          <el-table-column
            align="center"
            label="吨"
            :prop="item + NX_EMS_YA['耗量']['prop']"
            :minWidth="NX_EMS_YA['耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_YA['合计']['prop']"
            :minWidth="NX_EMS_YA['合计']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_YA['耗用率']['prop']"
            :minWidth="NX_EMS_YA['耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 尿素 -->
      <el-table-column label="尿素" align="center">
        <el-table-column align="center" label="采购量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_NS['采购量']['prop']"
            :minWidth="NX_EMS_NS['采购量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="库存量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_NS['库存量']['prop']"
            :minWidth="NX_EMS_NS['库存量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总氮">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_NS['总氮']['prop']"
            :minWidth="NX_EMS_NS['总氮']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          v-for="(item, index) of unitList"
          :key="index"
          :label="item + '耗量'"
        >
          <el-table-column
            align="center"
            label="吨"
            :prop="item + NX_EMS_NS['耗量']['prop']"
            :minWidth="NX_EMS_NS['耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_NS['合计']['prop']"
            :minWidth="NX_EMS_NS['合计']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_NS['耗用率']['prop']"
            :minWidth="NX_EMS_NS['耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 还原剂 -->
      <el-table-column label="还原剂" align="center">
        <el-table-column align="center" label="总耗量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_HYJ['总耗量']['prop']"
            :minWidth="NX_EMS_HYJ['总耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="总耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_HYJ['总耗用率']['prop']"
            :minWidth="NX_EMS_HYJ['总耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硝装置及分摊电耗 -->
      <el-table-column label="脱硝装置及分摊电耗" align="center">
        <el-table-column
          align="center"
          v-for="(item, index) of unitList"
          :key="index"
          :label="item + '电耗'"
        >
          <el-table-column
            align="center"
            label="万KWh"
            :prop="item + NX_EMS_DH['电耗']['prop']"
            :minWidth="NX_EMS_DH['电耗']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="NX_EMS_DH['合计']['prop']"
            :minWidth="NX_EMS_DH['合计']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_DH['厂用电率']['prop']"
            :minWidth="NX_EMS_DH['厂用电率']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="公用系统电耗">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="NX_EMS_DH['公用系统电耗']['prop']"
            :minWidth="NX_EMS_DH['公用系统电耗']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="公用厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_DH['公用厂用电率']['prop']"
            :minWidth="NX_EMS_DH['公用厂用电率']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column
          align="center"
          v-for="(item, index) of unitList"
          :key="index"
          :label="item + '分摊'"
        >
          <el-table-column
            align="center"
            label="万KWh"
            :prop="item + NX_EMS_DH['分摊']['prop']"
            :minWidth="NX_EMS_DH['分摊']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="NX_EMS_DH['合计']['prop']"
            :minWidth="NX_EMS_DH['合计']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="分摊厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_DH['分摊厂用电率']['prop']"
            :minWidth="NX_EMS_DH['分摊厂用电率']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="总电量">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="NX_EMS_DH['总电量']['prop']"
            :minWidth="NX_EMS_DH['总电量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="总厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="NX_EMS_DH['总厂用电率']['prop']"
            :minWidth="NX_EMS_DH['总厂用电率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硝用水 -->
      <el-table-column label="脱硝用水" align="center">
        <el-table-column align="center" label="工业水">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_YS['工业水']['prop']"
            :minWidth="NX_EMS_YS['工业水']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="工业耗水率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_YS['工业耗水率']['prop']"
            :minWidth="NX_EMS_YS['工业耗水率']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="除盐水">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_YS['除盐水']['prop']"
            :minWidth="NX_EMS_YS['除盐水']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="除盐耗水率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_YS['除盐耗水率']['prop']"
            :minWidth="NX_EMS_YS['除盐耗水率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硝用汽 -->
      <el-table-column label="脱硝用汽" align="center">
        <el-table-column align="center" label="耗汽量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_HQL['耗汽量']['prop']"
            :minWidth="NX_EMS_HQL['耗汽量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="耗汽率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_HQL['耗汽率']['prop']"
            :minWidth="NX_EMS_HQL['耗汽率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硝用气 -->
      <el-table-column label="脱硝用气" align="center">
        <el-table-column align="center" label="耗气量">
          <el-table-column
            align="center"
            label="吨"
            :prop="NX_EMS_GAS['耗气量']['prop']"
            :minWidth="NX_EMS_GAS['耗气量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="耗气率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="NX_EMS_GAS['耗气率']['prop']"
            :minWidth="NX_EMS_GAS['耗气率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 操作栏 -->
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.day=='合计(或加权平均)'||scope.row.day=='调整'"></div>
          <div v-else>
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="doDelete(scope.row)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改---页面弹框 -->
    <el-dialog :title="title" width="80%" :visible.sync="dialogFormVisible">
      <div>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="select__wrap">
              <div>选择时间：</div>
              <div>
                <el-select @change="changeDate" size="small" v-model="date" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="30" class="change_container">
        <!-- 还原剂 -->
        <el-col :xl="11" :md="8">
          <div class="change_left">
            <div class="_title">
              <span>还原剂</span>
            </div>
            <div class="hyj_container">
              <!-- （还原剂-液氨） -->
              <div>
                <div class="xsj_box">
                  <div class="shsf_ems">
                    <div class="shsf_title">（还原剂-液氨）</div>
                    <div class="shsf_inputs">
                      <myInputs :list="unitList" :label="'采购量'" :unit="'t'" :att="'ya_cg'"></myInputs>
                      <myInputs
                        :list="unitList"
                        v-for="(item, index) in unitList"
                        :key="index"
                        :label="item + '耗量'"
                        :unit="'t'"
                        :att="item + '_ya_hl'"
                      ></myInputs>
                      <myInputs :list="unitList" :label="'库存量'" :unit="'t'" :att="'ya_kc'"></myInputs>
                      <myInputs :list="unitList" :label="'纯度'" :unit="'CaCO3%'" :att="'ya_cd'"></myInputs>
                    </div>
                    <!-- 液氨合计 -->
                    <div class="shsf_tongji">
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'t'"
                        :att="'ya_hj'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <!-- （尿素） -->
              <div>
                <div class="xsj_box">
                  <div class="shsf_ems">
                    <div class="shsf_title">（尿素）</div>
                    <div class="shsf_inputs">
                      <myInputs :list="unitList" :label="'采购量'" :unit="'t'" :att="'ns_cg'"></myInputs>
                      <myInputs
                        :list="unitList"
                        v-for="(item, index) in unitList"
                        :key="index"
                        :label="item + '耗量'"
                        :unit="'t'"
                        :att="item + '_ns_hl'"
                      ></myInputs>
                      <myInputs :list="unitList" :label="'库存量'" :unit="'t'" :att="'ns_kc'"></myInputs>
                      <myInputs :list="unitList" :label="'总氮'" :unit="'%'" :att="'ns_zd'"></myInputs>
                    </div>
                    <!-- 尿素合计 -->
                    <div class="shsf_tongji">
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'t'"
                        :att="'ns_hj'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <!-- 还原剂总耗用 -->
              <div>
                <div class="shsf_ems">
                  <div class="shsf_title">还原剂总耗用</div>
                  <!-- 还原剂总耗用 -->
                  <div class="shsf_tongji">
                    <myInputs
                      :list="unitList"
                      :disabled="true"
                      :label="'总耗量'"
                      :unit="'t'"
                      :att="'hyj_hj'"
                    ></myInputs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 电耗 -->
        <el-col :xl="6" :md="8">
          <div class="change_center">
            <div class="_title">
              <span>电耗</span>
            </div>
            <div class="hyj_container">
              <div>
                <div style="margin-top:40px;">
                  <div class="shsf_ems">
                    <div class="shsf_inputs">
                      <myInputs
                        :list="unitList"
                        v-for="(item, index) in unitList"
                        :key="index"
                        :label="item + '耗电'"
                        :unit="'万KWh'"
                        :att="item + '_dh'"
                      ></myInputs>
                    </div>
                    <div class="shsf_tongji">
                      <!-- 耗电合计 -->
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'万KWh'"
                        :att="'dh_hj'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <div>
                <div style="margin-top:30px;">
                  <div class="shsf_ems">
                    <div class="shsf_inputs">
                      <myInputs :list="unitList" :label="'公用系统电耗'" :unit="'万KWh'" :att="'gy_dh'"></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:30px 0;"></div>
              </div>
              <div>
                <div class="shsf_ems">
                  <div class="shsf_inputs">
                    <myInputs
                      :list="unitList"
                      v-for="(item, index) in unitList"
                      :key="index"
                      :label="item + '分摊'"
                      :unit="'万KWh'"
                      :att="item + '_ft'"
                    ></myInputs>
                  </div>
                  <div class="shsf_tongji">
                    <!-- 分摊合计 -->
                    <myInputs
                      :list="unitList"
                      :disabled="true"
                      :label="'合计'"
                      :unit="'万KWh'"
                      :att="'ft_hj'"
                    ></myInputs>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <div class="shsf_ems">
                <div class="shsf_tongji">
                  <myInputs
                    :list="unitList"
                    :disabled="true"
                    :label="'总电量'"
                    :unit="'万KWh'"
                    :att="'zdh'"
                  ></myInputs>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xl="6" :md="8">
          <div class="change_right">
            <!-- 耗水 -->
            <div class="hs_box">
              <div class="_title">
                <span>耗水</span>
              </div>
              <div style="padding:20px;">
                <div>
                  <div style="margin-top:40px;">
                    <div class="shsf_ems">
                      <div class="shsf_inputs">
                        <myInputs :list="unitList" :label="'工业水'" :unit="'t'" :att="'gys'"></myInputs>
                        <myInputs :list="unitList" :label="'除盐水'" :unit="'t'" :att="'cys'"></myInputs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 耗汽 -->
            <div class="hq_box">
              <div class="_title">
                <span>耗汽</span>
              </div>
              <div style="padding:20px;">
                <div>
                  <div style="margin-top:50px;">
                    <div class="shsf_ems">
                      <div class="shsf_inputs">
                        <myInputs :list="unitList" :label="'耗汽量'" :unit="'t'" :att="'hql'"></myInputs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 耗气 -->
            <div class="hq_box">
              <div class="_title">
                <span>耗气</span>
              </div>
              <div style="padding:20px;">
                <div>
                  <div style="margin-top:50px;">
                    <div class="shsf_ems">
                      <div class="shsf_inputs">
                        <myInputs :list="unitList" :label="'耗气量'" :unit="'t'" :att="'gas'"></myInputs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  NX_EMS_YA,
  NX_EMS_NS,
  NX_EMS_HYJ,
  NX_EMS_DH,
  NX_EMS_YS,
  NX_EMS_HQL,
  NX_EMS_GAS
} from "../../../dict/index";
import myInputs from "@/components/myInputs";
import tongJi from "@/components/tongJi";
import { hasDays } from "./util";
import moment from "moment";
import {
  get_nx_ems,
  update_nx_ems,
  add_nx_ems,
  del_nx_ems
} from "../../../api/report/nx_ems";
import { hasValue } from "./util";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => {
        return ["#1", "#2"];
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: Number,
      default: 400
    },
    year: "",
    month: "",
    projectCode: ""
  },
  data() {
    return {
      NX_EMS_YA,
      NX_EMS_NS,
      NX_EMS_HYJ,
      NX_EMS_DH,
      NX_EMS_YS,
      NX_EMS_HQL,
      NX_EMS_GAS,
      row: {},
      dialogFormVisible: false,
      options: [],
      date: "",
      loading: false,
      title: "修改记录"
    };
  },

  components: {
    myInputs,
    tongJi
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 更新
    updateAddr() {
      try {
        let mid=this.$store.state.nx_ems.row;
        
        for(var key in mid){
          if(mid[key]==''){
            mid[key]=null;
          }
        }
        update_nx_ems({
          projectCode: this.projectCode,
          year: this.year,
          month: this.month,
          day: this.date,
          data: mid
        }).then(res => {
          let msg = res.data.data;
          if (msg == "success") {
            this.dialogFormVisible = false;
            this.timer = setTimeout(() => {
              this.$store.commit("SET_ISSUCESS", true);
              this.$message.success("更新成功");
            }, 500);
          } else {
            this.$message.error("更新失败");
          }
        });
      } catch (error) {
        this.$message.error("更新失败");
      }
    },
    // 新增
    add_nx_ems() {
      if (hasValue(this.$store.state.nx_ems.row)) {
        this.$message.error("输入值不能为空");
        return false;
      }
      try {
        let query = this.$store.state.nx_ems.query;
        add_nx_ems({
          projectCode: query.projectCode,
          year: query.year,
          month: query.month,
          day: this.date,
          data: this.$store.state.nx_ems.row
        }).then(res => {
          let msg = res.data.data;
          if (msg == "success") {
            this.dialogFormVisible = false;
            this.timer = setTimeout(() => {
              this.$store.commit("SET_ISSUCESS", true);
              this.$message.success("新增成功");
            }, 500);
          } else {
            this.$message.error("新增失败");
          }
        });
      } catch (error) {
        this.$message.error("新增失败");
      }
    },
    // 修改
    handleClick(row) {
      let days = hasDays(this.tableData, "day");
      let day = row.day;
      if (days.indexOf(day) < 0) {
        this.$message.error("请先新增！");
        return false;
      }
      this.title = "修改记录";
      this.options = days.map(item => {
        return {
          label: this.year + "-" + this.month + "-" + item,
          value: item
        };
      });
      this.date = day;
      this.dialogFormVisible = true;
      this.$store.commit("SET_ROW", JSON.parse(JSON.stringify(row)));
    },
    //确认修改
    onOk() {
      if (this.title == "修改记录") {
        this.updateAddr();
      } else {
        this.add_nx_ems();
      }
    },
    //删除
    doDelete(row) {
      this.$confirm("是否删除本行数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let query = {
            projectCode: this.projectCode,
            year: this.year,
            month: this.month,
            day: row.day
          };
          del_nx_ems(query).then(res => {
            let msg = res.data.msg;
            if (msg == "success") {
              this.timer = setTimeout(() => {
                this.$store.commit("SET_ISSUCESS", true);
                this.$message.success("删除成功");
              }, 500);
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    selectArear(data) {
      area = data.name;
      delete this.query.plant;
    },
    selectPlant(data) {
      if (data == "all") {
        this.query = _.omit(this.query, "plant");
      } else {
        plant = data.name;
        this.query.plant = data.deptCode;
      }
    },
    changeDate(value) {
      if (this.title == "新增记录") {
        return false;
      }
      value = value * 1;
      let row = this.tableData[value - 1];
      this.$store.commit("SET_ROW", JSON.parse(JSON.stringify(row)));
    }
  },
  destroyed() {
    clearTimeout(this.timer);
    this.timer = null;
  }
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
  height: 815px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.hyj_container {
  padding: 20px;
  height: 780px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  flex-flow: wrap;
}
.shsf_tongji {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 12px 0 0;
}

.change_center {
  height: 815px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.change_right {
  height: 815px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .hs_box {
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

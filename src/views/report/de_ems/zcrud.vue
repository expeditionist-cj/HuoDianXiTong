<template>
  <div class="zcrud">
    <el-table :data="tableData" style="width: 100%" size="small" :height="height">
      <el-table-column align="center" label="日期" prop="date" width="140" fixed></el-table-column>

      <!-- 吸收剂(石灰石粉)-->
      <el-table-column label="吸收剂(石灰石粉)" align="center">
        <el-table-column align="center" label="采购量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_LS['采购量']['prop']"
            :minWidth="DE_EMS_LS['采购量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="库存量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_LS['库存量']['prop']"
            :minWidth="DE_EMS_LS['库存量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="纯度(CaCO3)">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_EMS_LS['纯度']['prop']"
            :minWidth="DE_EMS_LS['纯度']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          v-for="(item,index) of unitList"
          :key="index"
          :label="item+'耗量'"
        >
          <el-table-column
            align="center"
            label="吨"
            :prop="item +DE_EMS_LS['耗量']['prop']"
            :minWidth="DE_EMS_LS['耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_LS['合计']['prop']"
            :minWidth="DE_EMS_LS['合计']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="DE_EMS_LS['耗用率']['prop']"
            :minWidth="DE_EMS_LS['耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 吸收剂(石灰石、电石渣)-->
      <el-table-column label="吸收剂(石灰石、电石渣)" align="center">
        <el-table-column align="center" label="采购量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_CB['采购量']['prop']"
            :minWidth="DE_EMS_CB['采购量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="库存量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_CB['库存量']['prop']"
            :minWidth="DE_EMS_CB['库存量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="纯度(%)">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_EMS_CB['纯度']['prop']"
            :minWidth="DE_EMS_CB['纯度']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          v-for="(item,index) of unitList"
          :key="index"
          :label="item+'耗量'"
        >
          <el-table-column
            align="center"
            label="吨"
            :prop="item + DE_EMS_CB['耗量']['prop']"
            :minWidth="DE_EMS_CB['耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_CB['合计']['prop']"
            :minWidth="DE_EMS_CB['合计']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="DE_EMS_CB['耗用率']['prop']"
            :minWidth="DE_EMS_CB['耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 吸收剂 -->
      <el-table-column label="吸收剂" align="center">
        <el-table-column align="center" label="总耗量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_SUM['总耗量']['prop']"
            :minWidth="DE_EMS_SUM['总耗量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="总耗用率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="DE_EMS_SUM['总耗用率']['prop']"
            :minWidth="DE_EMS_SUM['总耗用率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硫装置及分摊电耗 -->
      <el-table-column label="脱硫装置及分摊电耗" align="center">
        <el-table-column
          align="center"
          v-for="(item,index) of unitList"
          :key="index"
          :label="item+'电耗'"
        >
          <el-table-column
            align="center"
            label="万KWh"
            :prop="item + DE_EMS_DH['电耗']['prop']"
            :minWidth="DE_EMS_DH['电耗']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_EMS_DH['电耗合计']['prop']"
            :minWidth="DE_EMS_DH['电耗合计']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_EMS_DH['厂用电率']['prop']"
            :minWidth="DE_EMS_DH['厂用电率']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column
          align="center"
          v-for="(item,index) of unitList"
          :key="index"
          :label="item+'分摊'"
        >
          <el-table-column
            align="center"
            label="万KWh"
            :prop="item + DE_EMS_DH['分摊']['prop']"
            :minWidth="DE_EMS_DH['分摊']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_EMS_DH['分摊合计']['prop']"
            :minWidth="DE_EMS_DH['分摊合计']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="分摊厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_EMS_DH['分摊厂用电率']['prop']"
            :minWidth="DE_EMS_DH['分摊厂用电率']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总电量">
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_EMS_DH['总电量']['prop']"
            :minWidth="DE_EMS_DH['总电量']['width']"
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总厂用电率">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_EMS_DH['总厂用电率']['prop']"
            :minWidth="DE_EMS_DH['总厂用电率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硫用水 -->
      <el-table-column label="脱硫用水" align="center">
        <el-table-column align="center" label="工业水(中水、冷却水)">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_YS['工业水']['prop']"
            :minWidth="DE_EMS_YS['工业水']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="工艺水(消防水、自来水等)">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_YS['工艺水']['prop']"
            :minWidth="DE_EMS_YS['工艺水']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_YS['合计']['prop']"
            :minWidth="DE_EMS_YS['合计']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="耗水率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="DE_EMS_YS['耗水率']['prop']"
            :minWidth="DE_EMS_YS['耗水率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 石膏产量及销售 -->
      <el-table-column label="石膏产量及销售" align="center">
        <el-table-column
          align="center"
          v-for="(item,index) of unitList"
          :key="index"
          :label="item+'石膏产量'"
        >
          <el-table-column
            align="center"
            label="吨"
            :prop="item +DE_EMS_SG['石膏产量']['prop']"
            :minWidth="DE_EMS_SG['石膏产量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="石膏产量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_SG['石膏总产量']['prop']"
            :minWidth="DE_EMS_SG['石膏总产量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="石膏销量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_SG['石膏销量']['prop']"
            :minWidth="DE_EMS_SG['石膏销量']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 脱硫用汽 -->
      <el-table-column label="脱硫用汽" align="center">
        <el-table-column align="center" label="耗汽量">
          <el-table-column
            align="center"
            label="吨"
            :prop="DE_EMS_HQL['耗汽量']['prop']"
            :minWidth="DE_EMS_HQL['耗汽量']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="耗汽率">
          <el-table-column
            align="center"
            label="吨/万KWh"
            :prop="DE_EMS_HQL['耗汽率']['prop']"
            :minWidth="DE_EMS_HQL['耗汽率']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 操作栏 -->
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.date=='合计'||scope.row.date=='调整'"></div>
          <div v-else>
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="doDelete(scope.row)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改---页面弹框 -->
    <el-dialog title="修改记录" width="80%" :visible.sync="dialogFormVisible">
      <div>
        <el-row :gutter="40">
          <el-col :span="7">
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
        <!-- 吸收剂 -->
        <el-col :xl="11" :md="8">
          <div class="change_left">
            <div class="_title">
              <span>吸收剂</span>
            </div>
            <div class="xsj_container">
              <div>
                <!-- 石灰石粉耗用 -->
                <div class="xsj_box">
                  <div class="shsf_ems">
                    <div class="shsf_title">石灰石粉耗用</div>
                    <div class="shsf_inputs">
                      <myInputs
                        :list="unitList"
                        :label="'采购量'"
                        :unit="'t'"
                        :att="'limestone_powder_procure'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        v-for="(item,index) in unitList"
                        :key="index"
                        :label="item+'耗量'"
                        :unit="'t'"
                        :att="item + '_limestone_powder_consum'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        :label="'库存量'"
                        :unit="'t'"
                        :att="'limestone_powder_stock'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        :label="'纯度'"
                        :unit="'CaCO3%'"
                        :att="'limestone_powder_purity'"
                      ></myInputs>
                    </div>
                    <div class="shsf_tongji">
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'t'"
                        :att="'sum_limestone_powder_consum'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <!-- 石灰石、电石渣耗用 -->
              <div>
                <div class="xsj_box">
                  <div class="shsf_ems">
                    <div class="shsf_title">石灰石、电石渣耗用</div>
                    <div class="shsf_inputs">
                      <myInputs
                        :list="unitList"
                        :label="'采购量'"
                        :unit="'t'"
                        :att="'carbide_slag_procure'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        v-for="(item,index) in unitList"
                        :key="index"
                        :label="item+'耗量'"
                        :unit="'t'"
                        :att="item + '_carbide_slag_consum'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        :label="'库存量'"
                        :unit="'t'"
                        :att="'carbide_slag_stock'"
                      ></myInputs>
                      <myInputs
                        :list="unitList"
                        :label="'纯度'"
                        :unit="'%'"
                        :att="'carbide_slag_purity'"
                      ></myInputs>
                    </div>
                    <div class="shsf_tongji">
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'t'"
                        :att="'sum_carbide_slag_consum'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <!-- 吸收剂总耗用 -->
              <div>
                <div class="shsf_ems">
                  <div class="shsf_title">吸收剂总耗用</div>
                  <div class="shsf_tongji">
                    <myInputs
                      :list="unitList"
                      :disabled="true"
                      :label="'总耗量'"
                      :unit="'t'"
                      :att="'sumhl'"
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
            <div class="xsj_container">
              <div>
                <div style="margin-top:60px;">
                  <div class="shsf_ems">
                    <div class="shsf_inputs">
                      <myInputs
                        :list="unitList"
                        v-for="(item,index) in unitList"
                        :key="index"
                        :label="item+'耗电'"
                        :unit="'万KWh'"
                        :att="item + '_power'"
                      ></myInputs>
                    </div>
                    <div class="shsf_tongji">
                      <!-- 耗电合计 -->
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'万KWh'"
                        :att="'sum_power'"
                      ></myInputs>
                    </div>
                  </div>
                </div>
                <div style="border-bottom:1px solid #ccc; margin:10px 0;"></div>
              </div>
              <div>
                <div style="margin-top:0px;">
                  <div class="shsf_ems">
                    <div class="shsf_inputs">
                      <myInputs
                        :list="unitList"
                        v-for="(item,index) in unitList"
                        :key="index"
                        :label="item+'分摊'"
                        :unit="'万KWh'"
                        :att="item + '_share'"
                      ></myInputs>
                    </div>
                    <div class="shsf_tongji">
                      <!-- 分摊合计 -->
                      <myInputs
                        :list="unitList"
                        :disabled="true"
                        :label="'合计'"
                        :unit="'万KWh'"
                        :att="'sum_share'"
                      ></myInputs>
                    </div>
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
                    :att="'sumdh'"
                  ></myInputs>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xl="6" :md="8">
          <div class="change_right">
            <!-- 耗水 -->
            <div class="hs_sg_box">
              <div class="_title">
                <span>耗水</span>
              </div>
              <div style="padding:20px;">
                <div>
                  <div style="margin-top:20px;">
                    <div class="shsf_ems">
                      <div class="shsf_inputs">
                        <myInputs
                          :list="unitList"
                          :label="'工业水'"
                          :unit="'t'"
                          :att="'industrial_water'"
                        ></myInputs>
                        <myInputs
                          :list="unitList"
                          :label="'工艺水'"
                          :unit="'t'"
                          :att="'process_water'"
                        ></myInputs>
                      </div>
                      <div class="shsf_tongji">
                        <myInputs
                          :disabled="true"
                          :list="unitList"
                          :label="'合计'"
                          :unit="'t'"
                          :att="'sum_water'"
                        ></myInputs>
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
                        <myInputs
                          :list="unitList"
                          :label="'耗汽量'"
                          :unit="'t'"
                          :att="'air_consumption'"
                        ></myInputs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 石膏产量及销量 -->
            <div class="hs_sg_box">
              <div class="_title">
                <span>石膏产量及销量</span>
              </div>
              <div style="padding:20px;">
                <div>
                  <div>
                    <div class="shsf_ems">
                      <div class="shsf_inputs">
                        <div class="shsf_inputs">
                          <myInputs
                            :list="unitList"
                            v-for="(item,index) in unitList"
                            :key="index"
                            :label="item+'石膏产量'"
                            :unit="'t'"
                            :att="item+'_gypsum_output'"
                          ></myInputs>
                          <myInputs
                            :list="unitList"
                            :disabled="true"
                            :label="'石膏产量'"
                            :unit="'t'"
                            :att="'sum_gypsum_output'"
                          ></myInputs>
                          <myInputs
                            :list="unitList"
                            :label="'石膏销量'"
                            :unit="'t'"
                            :att="'gypsum_sales'"
                          ></myInputs>
                        </div>
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
  DE_EMS_HQL,
  DE_EMS_SG,
  DE_EMS_LS,
  DE_EMS_CB,
  DE_EMS_SUM,
  DE_EMS_DH,
  DE_EMS_YS
} from "../../../dict/index";
import myInputs from "@/components/myInputs";
import tongJi from "@/components/tongJi";
import { hasDays, hasValue } from "./util";
import {
  del_de_ems,
  update_de_ems,
  add_de_ems,
  get_de_ems
} from "../../../api/report/de_ems";
export default {
  data() {
    return {
      DE_EMS_HQL,
      DE_EMS_SG,
      DE_EMS_LS,
      DE_EMS_CB,
      DE_EMS_SUM,
      DE_EMS_DH,
      DE_EMS_YS,
      row: {},
      dialogFormVisible: false,
      time: Date.now(),
      options: [],
      date: "",
      loading: false,
      title: "修改记录",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
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
    point_code: ""
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
        let data = this.$store.state.nx_ems.row;
        data.point_code = this.point_code;
        data.year = this.year;
        data.month = this.month;
        data.day = this.date;
        delete data.date;
        for(var key in data){
          if(data[key]==''){
            data[key]=null;
          }
        }
        update_de_ems({ data: JSON.stringify(data) }).then(res => {
          let msg = res.data.msg;
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
    add_de_ems() {
      if (hasValue(this.$store.state.nx_ems.row)) {
        this.$message.error("输入值不能为空");
        return false;
      }
      try {
        let query = this.$store.state.nx_ems.query;
        let data = this.$store.state.nx_ems.row;
        data = JSON.parse(JSON.stringify(data));
        data.point_code = query.pointCode;
        data.year = query.year;
        data.month = query.month;
        data.day = this.date;
        let datas = this.tableData[0];
        for (var key in datas) {
          datas[key] = null;
        }
        data = { ...datas, ...data };
        add_de_ems({ data: JSON.stringify(data) }).then(res => {
          let msg = res.data.msg;
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
    handleClick(row) {
      console.log(row)
      let days = hasDays(this.tableData, "date");
      let day = row.date;
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
    onOk() {
      if (this.title == "修改记录") {
        this.updateAddr();
      } else {
        this.add_de_ems();
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
            point_code: this.point_code,
            year: this.year,
            month: this.month,
            day: row.date
          };
          del_de_ems({ data: JSON.stringify(query) }).then(res => {
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
  height: 778px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.xsj_container {
  padding: 20px;
  height: 746px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: 778px;
  border-radius: 6px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.change_right {
  height: 778px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .hs_sg_box {
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

<template>
  <div class="zcrud">
    <el-table :data="tableData" style="width: 100%;min-height:550px;" size="small" :height="height">
      <el-table-column align="center" label="项目" prop="plant_name" width="140" fixed></el-table-column>

      <el-table-column align="center" label="计划发电量">
        <el-table-column
          align="center"
          label="万KWh"
          :prop="DE_PLAN_IDX['计划发电量']['prop']"
          :minWidth="DE_PLAN_IDX['计划发电量']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="计划上网电量">
        <el-table-column
          align="center"
          label="万KWh"
          :prop="DE_PLAN_IDX['计划上网电量']['prop']"
          :minWidth="DE_PLAN_IDX['计划上网电量']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="计划负荷率">
        <el-table-column
          align="center"
          label="%"
          :prop="DE_PLAN_IDX['计划负荷率']['prop']"
          :minWidth="DE_PLAN_IDX['计划负荷率']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="装置运行时间">
        <el-table-column
          align="center"
          label="h"
          :prop="DE_PLAN_IDX['装置运行时间']['prop']"
          :minWidth="DE_PLAN_IDX['装置运行时间']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="入口SO₂浓度">
        <el-table-column
          align="center"
          label="mg/Nm³"
          :prop="DE_PLAN_IDX['入口SO₂浓度']['prop']"
          :minWidth="DE_PLAN_IDX['入口SO₂浓度']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="吸收剂">
        <el-table-column
          align="center"
          label="t/万KWh"
          :prop="DE_PLAN_IDX['t/万KWh']['prop']"
          :minWidth="DE_PLAN_IDX['t/万KWh']['width']"
        ></el-table-column>

        <el-table-column
          align="center"
          label="t"
          :prop="DE_PLAN_IDX['t']['prop']"
          :minWidth="DE_PLAN_IDX['t']['width']"
        ></el-table-column>
      </el-table-column>

      <el-table-column align="center" label="耗电率">
        <el-table-column align="center" label="装置">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_PLAN_IDX['装置率']['prop']"
            :minWidth="DE_PLAN_IDX['装置率']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_PLAN_IDX['装置']['prop']"
            :minWidth="DE_PLAN_IDX['装置']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="分摊">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_PLAN_IDX['分摊率']['prop']"
            :minWidth="DE_PLAN_IDX['分摊率']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_PLAN_IDX['分摊']['prop']"
            :minWidth="DE_PLAN_IDX['分摊']['width']"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="合计">
          <el-table-column
            align="center"
            label="%"
            :prop="DE_PLAN_IDX['合计率']['prop']"
            :minWidth="DE_PLAN_IDX['合计率']['width']"
          ></el-table-column>
          <el-table-column
            align="center"
            label="万KWh"
            :prop="DE_PLAN_IDX['合计']['prop']"
            :minWidth="DE_PLAN_IDX['合计']['width']"
          ></el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" label="耗水率">
        <el-table-column
          align="center"
          label="t/万KWh"
          :prop="DE_PLAN_IDX['计划率']['prop']"
          :minWidth="DE_PLAN_IDX['计划率']['width']"
        ></el-table-column>
        <el-table-column
          align="center"
          label="t"
          :prop="DE_PLAN_IDX['计划']['prop']"
          :minWidth="DE_PLAN_IDX['计划']['width']"
        ></el-table-column>
      </el-table-column>

      <!-- 操作栏 -->
      <el-table-column
        v-if=" hdTsIndicator_update || hdTsIndicator_del "
        fixed="right"
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.plant_name == '脱硫合计'"></div>
          <div v-else>
            <el-button
              @click="update(scope.row)"
              v-if="hdTsIndicator_update"
              type="text"
              size="small"
            >修改</el-button>

            <el-button
              @click="del(scope.row)"
              v-if="hdTsIndicator_del"
              type="text"
              size="small"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DE_PLAN_IDX } from "../../../dict/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      DE_PLAN_IDX,
      dialogFormVisible: false,
      time: Date.now(),
      options: [],
      date: "",
      title: "修改记录",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: Number,
      default: 400
    }
  },
  components: {},
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.hdTsIndicator_update = this.permissions["hdTsIndicator_update"]; // 修改
    this.hdTsIndicator_del = this.permissions["hdTsIndicator_del"]; // 删除
  },
  mounted() {},
  watch: {},
  methods: {
    // 修改
    update(row) {
      this.$emit("update", row);
    },
    //删除
    del(row) {
      this.$emit("del", row);
    }
  },
  destroyed() {}
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

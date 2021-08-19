<template>
  <div class="zcurd">
    <el-table :data="data" style="width: 100%;min-height:550px;" size="small" :height="height">
      <el-table-column label="项目" align="center" prop="plantCn" fixed></el-table-column>
      <el-table-column label="吸收剂采购量" align="center">
        <el-table-column label="本日（t）" align="center" prop="absBuyDay"></el-table-column>
        <el-table-column label="本月累积（t）" align="center" prop="absBuyMonth"></el-table-column>
        <el-table-column label="当前库存使用天数" align="center" prop="absCanUse"></el-table-column>
      </el-table-column>
      <el-table-column label="吸收剂耗量" align="center">
        <el-table-column label="本日（t）" align="center" prop="absUseDay"></el-table-column>
        <el-table-column label="本月累计（t）" align="center" prop="absUseMonth"></el-table-column>
      </el-table-column>
      <el-table-column label="石膏出库量" align="center">
        <el-table-column label="本日（t）" align="center" prop="gypOutputDay"></el-table-column>
        <el-table-column label="本月累计（t）" align="center" prop="gypOutputMonth"></el-table-column>
      </el-table-column>
      <el-table-column label="还原剂采购量" align="center">
        <el-table-column label="本日（t）" align="center" prop="redBuyDay"></el-table-column>
        <el-table-column label="本月累计（t）" align="center" prop="redBuyMonth"></el-table-column>
        <el-table-column label="当天库存可使用天数" align="center" min-width="100" prop="redCanUse"></el-table-column>
      </el-table-column>
      <el-table-column label="还原剂耗量" align="center">
        <el-table-column label="本日（t）" align="center" prop="redUseDay"></el-table-column>
        <el-table-column label="本月累计（t）" align="center" prop="redUseMonth"></el-table-column>
      </el-table-column>
      <el-table-column label="增效剂添加量" align="center">
        <el-table-column label="本日（kg）" align="center" prop="synUseDay"></el-table-column>
        <el-table-column label="本月累计（kg）" align="center" prop="synUseMonth"></el-table-column>
      </el-table-column>
      <el-table-column label="废水系统" align="center">
        <el-table-column label="运行时间（h）" align="center" prop="effRunDay"></el-table-column>
        <el-table-column label="本月累计（h）" align="center" prop="effRunMonth"></el-table-column>
        <el-table-column label="处理量（t）" align="center" prop="effTaDay"></el-table-column>
        <el-table-column label="本月累计（t）" align="center" prop="effTaMonth"></el-table-column>
      </el-table-column>
      <el-table-column label="高效絮凝剂" align="center">
        <el-table-column label="本日（kg）" align="center" prop="floUseDay"></el-table-column>
        <el-table-column label="本月累计（kg）" align="center" prop="floUseMonth"></el-table-column>
      </el-table-column>
      <!-- 操作栏 -->
      <!-- <el-table-column v-if="dailyRptMd_mdf || dailyRptMd_del" fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.plantCn=='合计'"></div>
          <div v-else>
            <el-button @click="onEdit(scope.row)" v-if="dailyRptMd_mdf" type="text" size="small">修改</el-button>
            
            <el-button @click="onDel(scope.row)" v-if="dailyRptMd_del" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    data: {
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
  computed: {
    ...mapGetters(["permissions"])
  },
  created(){
    this.dailyRptMd_mdf = this.permissions["dailyRptMd_mdf"]; // 修改
    this.dailyRptMd_del = this.permissions["dailyRptMd_del"]; // 删除
  },
  methods: {
    onEdit(row) {
      this.$emit("onEdit", row);
    },
    onDel(row) {
      this.$emit("onDel", row);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<template>
  <AssitantLayout class="dust">
    <!-- 选择栏 -->
    <AssitantOrg @onOk="onOk"></AssitantOrg>
    <!-- 参数数据 -->
    <AssitantParame :data="data" style="margin-bottom:16px">
      <span slot="header" class="header">参数数据</span>
    </AssitantParame>

    <!-- 建议 -->
    <AssitantAdvice :data="spl" style="margin-bottom:16px">
      <span slot="header" class="header">建议</span>
    </AssitantAdvice>

    <!-- 烟气流量时刻曲线 -->
    <AssitantQurve>
      <div slot="header">
        <span class="header">烟气流量时刻曲线</span>
        <el-button @click="open_vis" class="his-curve fr" type="primary" size="mini" plain>查看历史曲线</el-button>
        <el-dialog title="供浆智能优化-历史曲线" :visible.sync="his_curve_vis">
          <div class="his_curve_vis-wrap"></div>
        </el-dialog>
      </div>
    </AssitantQurve>
  </AssitantLayout>
</template>

<script>
/**
 * 烟气流量分析
 *
 *
 */
import AssitantParame from "../../../components/assitantParame";
import AssitantAdvice from "../../../components/assitantAdvice";
import AssitantQurve from "../../../components/assitantQurve";
import AssitantOrg from "../../../components/assitantOrg";
import { getInstanceId, getDustData } from "../../../api/assitant/common";
export default {
  props: {},
  data() {
    return {
      his_curve_vis: false,
      data:[],
      spl:{}
    };
  },
  components: { AssitantParame, AssitantAdvice, AssitantQurve, AssitantOrg },
  computed: {},
  created() {},
  mounted() {

  },
  watch: {},
  methods: {
    open_vis() {
      this.his_curve_vis = true;
    },
    onOk(query, cnname) {
      getInstanceId({ ...query, modelId: 1 }).then(res => {
        let num=res.data.data;
        getDustData({instanceId:num}).then(res=>{
          let result=res.data.data;
          let idx=null;
          result.forEach((item,index)=>{
            if(item.fieldCode=='sg'){
              idx=index;
            }
          });
          let spl= result.splice(idx,1);
          this.data=result;
          this.spl=spl[0];
        })
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dust {
  .his-curve {
    position: relative;
    top: 10px;
  }
}
</style>

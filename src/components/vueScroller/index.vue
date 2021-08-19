<template>
  <div class="vue-scroller-wrap" >
    <div class="scroller-wrap" @click="onDetail">
      <vue-seamless-scroll
        :data="newsList"
        :class-option="optionLeft"
        class="seamless-warp"
        v-if="scrollerShow"
      >
        <ul class="item">
          <li v-for="item in newsList" :key="item.plant">
            <span>{{ item.plantName }}</span>
          </li>
          <li v-if="newsList.length">数据异常，点击查看详情!!!</li>
        </ul>
      </vue-seamless-scroll>
    </div>

    <el-dialog title="详情" :visible.sync="dialogVisible" :modal="true">
      <div class="tool">
        <el-button :loading="show" @click="onRefresh" size="small" type="primary" >刷新</el-button>
      </div>
      <el-table :data="newsList" border size="small" stripe>
        <el-table-column
          property="plantName"
          label="项目名称"
          min-width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          property="complete"
          label="数据是否正常"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span :style="{ color: scope.row.complete ? '正常' : 'red' }">{{
              scope.row.complete ? "正常" : "异常"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="canCps"
          label="是否可补偿"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.canCps ? "可补偿" : "暂不可补偿" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="overDay"
          label="异常天数"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          property="maxEdt"
          label="最近异常点"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          property="cpsIng"
          label="是否正在补偿"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cpsIng ? "正在补偿中" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="onArtificial(scope.row)"
              type="primary"
              size="small"
              :disabled="!(scope.row.canCps && !scope.row.cpsIng)"
              :loading="scope.row.cpsIng"
            >
              {{scope.row.cpsIng?'补偿中':'补偿'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Scroller from "vue-seamless-scroll";
import { getPlantDs, getAreaDs,runCpsByMan } from "@/api/common.js";
import moment from "moment";
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {
      newsList: [],
      tm: moment(Date.now()).format("YYYY-MM-DD") + " " + "00:00:00",
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogVisible: false,
      scrollerShow:true,
      show:false
    };
  },
  components: { Scroller },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2
      };
    },
    ...mapState({
      plant: state => state.user.projectCode,
      area: state => state.user.regionCode
    })
  },
  created() {},
  mounted() {
    this.init();
    setInterval(()=>{
      this.scrollerShow = false;
      this.init().then(res=>{
        if(res){
          this.scrollerShow = true;
        }
      });
    },300000)
  },
  watch: {},
  methods: {
    async init() {
      try {
      //   if (this.plant) {
      //  await this.getPlantDs(this.plant, this.tm);
      // } else
       if (!this.plant) {
       await this.getAreaDs(this.area, this.tm);
      };
      return true;
      } catch (error) {
        return false;
      }

    },
    // 根据电厂获取数据状态
    getPlantDs(plant, tm) {
      getPlantDs({
        plant,
        tm
      }).then(res => {
        let data = res.data;
        // console.log(data);
        this.newsList = [data.data];
      });
    },
    // 根据区域获取数据状态
    getAreaDs(area, tm) {
      getAreaDs({
        area,
        tm
      }).then(res => {
        let data = res.data.data;
        // console.log(data);
        this.newsList = data.plants.filter(item => {
          item.loading = item.cpsIng;
          return !item.complete && item.dataOnline;
        });
      });
    },
    runCpsByMan(plant,tm){
      runCpsByMan({
        tm,
        plant
      }).then(res=>{
        let data = res.data;
        this.init();
      })
    },
    onDetail(e) {
      this.dialogVisible = true;
      this.onRefresh();
    },
    onArtificial(row){
      let plant = row.plant;
      this.runCpsByMan(plant,row.maxEdt);
    },
    onRefresh(){
      clearTimeout(this.timer);
      this.timer = null;
      this.scrollerShow = false;
      this.show = true;
      this.init().then(res=>{
        this.timer = setTimeout(()=>{
          this.show = false;
        },400)
        if(res){
          this.scrollerShow = true;
        }

      });

    }
  }
};
</script>

<style scoped lang="scss">

.vue-scroller-wrap {
  width: 500px;
  height: 20px;
  position: fixed;
  left: 270px;
  bottom: 10px;
  z-index: 3000;
  // .scroller-wrap {

  // }
  .seamless-warp {
    width: 500px;
    height: 20px;
    overflow: hidden;
    ul.item {
      min-width: 300px;
      cursor: pointer;
      li {
        float: left;
        margin-right: 10px;
        color: red;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  .tool{
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>

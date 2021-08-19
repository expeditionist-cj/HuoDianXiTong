<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        class="avue-breadcrumb"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        v-if="showCollapse"
      >
        <i class="icon-navicon" @click="setCollapse"></i>
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show" v-if="showMenu">
        <top-menu></top-menu>
      </div>
      <span class="top-bar__item" v-if="showSearch">
        <top-search></top-search>
      </span>
    </div>
    <div class="top-bar__right">
      <div class="top-bar__item" style="line-height: 64px">
        <MyTime></MyTime>
      </div>
      <!-- 报警 -->
      <el-popover
        @hide="hide"
        v-model="visible"
        placement="bottom"
        width="496px"
        height="486px"
        trigger="manual"
      >
        <div
          class="alarm__table"
          style="width: 496px; height: 486px; overflow-y: scroll"
        >
          <div style="margin: 0 20px -30px 0; text-align: right">
            <span
              @click="
                () => {
                  this.visible = false;
                }
              "
              >X</span
            >
          </div>

          <Ala_table :tableData="list"></Ala_table>
        </div>
        <div class="top-bar__item" slot="reference">
          <div
            class="top-bar__item"
            style="line-height: 64px; cursor: pointer; fontsize: 20px"
          >
            <el-badge :value="num" class="item">
              <i
                @click="visible = !visible"
                size="medium"
                class="el-icon-bell"
              ></i>
            </el-badge>
          </div>
        </div>
      </el-popover>

      <!-- <el-tooltip v-if="showColor"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip>-->
      <!-- <el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>-->
      <!-- <el-tooltip v-if="showLock"
                  effect="dark"
                  content="锁屏"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>-->
      <!-- <el-tooltip v-if="showTheme"
                  effect="dark"
                  content="特色主题"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>-->
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="isFullScren ? '退出全屏' : '全屏'"
        placement="bottom"
      >
        <div class="top-bar__item">
          <i
            :class="isFullScren ? 'icon-tuichuquanping' : 'icon-quanping'"
            @click="handleScreen"
          ></i>
        </div>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="$refs.seting.open()" divided
            >界面设置</el-dropdown-item
          >
          <el-dropdown-item @click.native="logout" divided
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting ref="seting"></top-setting>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topSetting from "./top-setting";
import MyTime from "./time";
import Ala_table from "./ala_table";
import Vue from "vue";
import { scoketUrl } from "@/config/env.js";
// websocket
import VueNativeSock from "vue-native-websocket";

export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topSetting,
    MyTime,
    Ala_table,
  },
  name: "top",
  data() {
    return {
      visible: false,
      num: 0,
      list: [],
    };
  },
  filters: {},
  created() {},
  mounted() {
    // 注册websocket
    let { user } = JSON.parse(window.sessionStorage.getItem("user"));
    let sid = user.user_id || "null";
    let area = user.regionCode || "null";
    let plant = user.projectCode || "null";
    let unit = "null";
    let clientId = Date.parse(new Date());
    let url = scoketUrl + `${sid}/${area}/${plant}/${unit}/${clientId}`;
    this.$connect(url, { format: "json" });
    listenfullscreen(this.setScreen);
    this.$nextTick(() => {
      this.doSocket();
    });
  },
  updated() {},
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
    ]),
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    // 处理socket数据
    doSocket() {
      // 注册侦听器
      this.$options.sockets.onmessage = (data) => {
        data = JSON.parse(data.data);
        let { data: list } = data;
        this.list = list;
        this.num = list.length;
        if (this.num) {
          this.visible = true;
        }
      };
    },
    hide() {
      this.list = [];
      this.num = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

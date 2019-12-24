<template>
  <div class="wel">
    <CardLayout
      cardStyles="height: calc(100% - 48px);min-height: 629px;background:none;box-shadow:none;"
    >
      <ul class="wel__up clearfix">
        <li class="fl">
          <Mycard>
            <div slot="header" class>综合数据</div>
            <div slot="content" class>综合数据</div>
          </Mycard>
        </li>
        <li class="fl">
          <div class="wel__up__right__up">
            <Mycard>
              <div slot="header" class>当月发电量统计</div>
              <div slot="content" class>综合数据</div>
            </Mycard>
          </div>
          <div class="wel__up__right__down">
            <Mycard>
              <div slot="header" class>当月上网电量统计</div>
              <div slot="content" class>综合数据</div>
            </Mycard>
          </div>
        </li>
      </ul>
      <ul class="wel__down clearfix">
        <li class="fl wel__down__lelf">
          <Mycard>
            <div slot="header" class="">
              减排统计
            </div>
            <div slot="content" class="">
              综合数据
            </div>
          </Mycard>
        </li>
        <li class="fl wel__down__right">
          <Mycard>
            <div slot="header" class="">
              能耗与物耗统计
            </div>
            <div slot="content" class="">
              综合数据
            </div>
          </Mycard>
        </li>
      </ul>
    </CardLayout>
    <Foot />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import request from "@/router/axios";
import CardLayout from "@/components/cardLayout/index";
import Mycard from "@/components/mycard/mycard";
export default {
  name: "wel",
  data() {
    return {};
  },
  components: {
    CardLayout,
    Mycard
  },
  computed: {
    ...mapGetters(["website"])
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped="scoped" lang="scss">
.wel {
  height: 100%;
  padding: 16px;
  .wel__up {
    height: calc(calc(100% - 16px) * 0.68);
    margin-bottom: 16px;
    & > li:nth-child(1) {
      width: calc(calc(100% - 16px) * 0.76);
      height: 100%;
      margin-right: 16px;
    }
    & > li:nth-child(2) {
      width: calc(calc(100% - 16px) * 0.24);
      height: 100%;
      & > div {
        height: calc(calc(100% - 16px) / 2);
      }
      & > div:first-child {
        margin-bottom: 16px;
      }
    }
  }
  .wel__down {
    height: calc(calc(100% - 16px) * 0.32);
    & > li {
      width: calc(calc(100% - 16px) / 2);
      height: 100%;
    }
    & > li:nth-child(1) {
      margin-right: 16px;
    }
  }
}
</style>

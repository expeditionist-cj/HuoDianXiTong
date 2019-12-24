<template>
  <div class="runstate">
    <Card cardStyles="min-height:678px;margin-bottom:16px;padding:12px 32px;">
      <div class="runstate__content">
        <ul class="runstate__content-ul">
          <li>
            <span>东北区域</span>
          </li>
          <li class>
            <div class="clearfix">
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
              <div class="plant__wrap fl">
                <div>大连</div>
                <ul class="clearfix">
                  <li class="fl">#1</li>
                  <li class="fl">#2</li>
                  <li class="fl">#2</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="runstate__foot">
        <div class="runstate__foot-cicle">
          <span></span>
          <span>启动</span>
        </div>
        <div class="runstate__foot-cicle">
          <span style="background:rgba(126,208,107,1)"></span>
          <span>停止</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getRunState } from "@/api/datamon/runstate";
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getRunState() {
      getRunState().then(response => {
        let {
          data,
          data: { code, data: res }
        } = response;
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.runstate {
  //   padding: 24px;
  .runstate__content-ul {
    width: 100%;
    display: table;
    margin-bottom: 8px;
    & > li:nth-child(1) {
      width: 170px;
      display: table-cell;
      //   height: 92px;
      background: rgba(63, 158, 255, 0.08);
      border-radius: 2px;
      border: 1px solid rgba(177, 215, 255, 1);
      position: relative;
      margin-right: 8px;
      border-left: 5px solid rgba(63, 158, 255, 1);
      span {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(63, 158, 255, 1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    & > li:nth-child(2) {
      display: table-cell;
      & > div {
        min-height: 92px;
        padding: 14px 0;
        margin-left: 8px;
        border-radius: 2px;
        border: 1px solid rgba(233, 233, 233, 1);
        margin-left: -10px;
        overflow: hidden;
      }
      .plant__wrap {
        margin-right: 8px;
        margin-top: 8px;
        & > div {
          width: 100%;
          height: 29px;
          background: rgba(255, 88, 88, 1);
          border-radius: 2px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 29px;
          text-align: center;
        }
        & > ul {
          li {
            width: 52px;
            height: 29px;
            background: rgba(255, 88, 88, 1);
            border-radius: 2px;
            margin: 3px 3px 0 0;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 29px;
            text-align: center;
          }
          & > li:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
  .runstate__foot {
    height: 40px;
    line-height: 40px;
    padding: 10px 24px;
    text-align: right;
    .runstate__foot-cicle {
      height: 20px;
      display: inline-block;
      margin-right: 24px;
      & > span:nth-child(1) {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: rgba(255, 88, 88, 1);
        border-radius: 50%;
        margin-right: 8px;
      }
      & > span:nth-child(2) {
        display: inline-block;
        height: 20px;
        vertical-align: super;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>

<template>
  <div class="card-box-wrap">
      <div class="title">{{title}}</div>
      <div class="content" >
          <slot name="content"></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      title:{
          type:String,
          default:"xxx"
      }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
.card-box-wrap{
    border-radius:6px;
    border:1px solid rgba(232,232,232,1);
    min-height: 198px;
    display:flex;
    flex-direction:column;
    .title{
        height: 30px;
        background:rgba(241,241,241,0.4);
        opacity:0.8;
        text-align:center;
        font-weight:bold;
        color:rgba(37,37,37,1);
        font-size:14px;
    }
    .content{
        flex:1
    }
}
</style>

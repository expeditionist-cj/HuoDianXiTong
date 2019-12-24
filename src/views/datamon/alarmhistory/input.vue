<template>
  <div class="my__input">
    <input @change="changeInput" :value="value" type="text" placeholder="请输入查询内容" />
  </div>
</template>

<script>
export default {
  props: {
      iptChange:Function
  },
  data() {
    return {
        value:""
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
      changeInput(){
          iptChange && iptChange(this.value)
      }
  }
};
</script>

<style scoped lang="scss">
.my__input {
  .my__input {
    input {
      display: inline-block;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      float: none;
      z-index: auto;
      width: auto;
      height: auto;
      position: static;
      cursor: default;
      opacity: 1;
      margin: 4px;
      padding: 4px;
      overflow: visible;
      border: 0 solid #b7b7b7;
      border-bottom-width: 1px;
      -webkit-border-radius: 0;
      border-radius: 0;
      font: normal 2px / normal "Times New Roman", Times, serif;
      color: rgba(0, 142, 198, 1);
      -o-text-overflow: clip;
      text-overflow: clip;
      background: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      text-shadow: none;
      -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      -webkit-transform: none;
      transform: none;
      -webkit-transform-origin: 50% 50% 0;
      transform-origin: 50% 50% 0;
    }
  }
}
</style>

// 定义组件生成模版

module.exports = {
    vueTemplate: compoenntName => {
        return `<template>
            <div class="${compoenntName}">
            ${compoenntName}组件
            </div>
                </template>
        <script>
        export default {
            name: '${compoenntName}',
            props:{},
            components:{},
            data(){
                return {}
            },
            mounted(){},
            methods:{},
            watch:{},
            computed:{},
            destroyed(){}
        }
  </script>
  <style lang="less" scoped>
  .${compoenntName} {
  
  }
  </style>
  `
    },
}

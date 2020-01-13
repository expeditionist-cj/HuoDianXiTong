import Vue from "vue";

// 自动加载 global 目录下的 .vue 结尾的文件
// 自动加载的组件，必须要设置属性
const componentsContext = require.context('./global', true, /\.vue$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrl = componentConfig.default || componentConfig;
  if(!ctrl.name){
       throw new Error("组件未设置name属性或name属性为空");
  }
  Vue.component(ctrl.name, ctrl)
})
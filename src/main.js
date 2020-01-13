import 'babel-polyfill'
// import '@babel/polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import App from './App'
import './permission' // 权限
import './error' // 日志
import router from './router/router'
import store from './store'
import { loadStyle, filterForm, vaildData } from './util/util'
import * as urls from '@/config/env'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import * as filters from './filters' // 全局filter
import "@/components/index.js"; // 引入全局组件
import './styles/common.scss';
import "./styles/changeElementStyle.scss"
import basicContainer from './components/basic-container/main'
// 插件 json 展示
import vueJsonTreeView from 'vue-json-tree-view'

import { validatenull } from '@/util/validate';

// websocket
import VueNativeSock from 'vue-native-websocket';


import Mycard from "@/components/mycard/mycard";
import Foot from "@/components/footer/index";
import SelOrg from "@/components/selectOrg/index";
import BtnList from "@/components/checkAndResetBtn/index";

// 引入表表导出功能
import { install } from "./util/downLoadExcel"

// 引入vue-echarts
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import "echarts/map/js/china.js";
import { scoketUrl } from "./config/env"
import MyIcon from "@/components/icon/index";
import AssitantLayout from "@/components/assitantLayout/index"
import Nodata from "@/components/nodata/index"
import _ from "lodash";
Vue.prototype.validatenull = validatenull
Vue.prototype.filterForm = filterForm
Vue.prototype.vaildData = vaildData
Vue.prototype._ = _;
install(Vue)
Vue.use(router)

Vue.use(vueJsonTreeView)

Vue.use(VueAxios, axios)

// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('v-chart', ECharts);
Vue.component('MyIcon', MyIcon);
Vue.component('Card', basicContainer);
Vue.component('Mycard', Mycard);
Vue.component('Foot', Foot);

Vue.component('SelOrg', SelOrg);
Vue.component('BtnList', BtnList);
Vue.component('AssitantLayout', AssitantLayout);
Vue.component('Nodata', Nodata);
// 注册socket
Vue.use(VueNativeSock, scoketUrl, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

//加载过滤器
Object.keys(filters).forEach(key => {
  console.log(key)
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

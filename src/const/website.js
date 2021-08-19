import { env } from '../const/version/version.js'
export default {
  title: '火电',
  logo: '火电',
  key: 'sca',   //配置主键,目前用于存储
  indexTitle: `火电环保智能系统(${env})`,
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  lockPage: '/lock',
  tokenTime: 6000,
  infoTitle: '火电环保智能系统',
  statusWhiteList: [428],
  // 配置首页不可关闭
  isFirstPage: false,
  // fistPage: {
  //   label: '首页',
  //   value: '/wel/index',
  //   params: {},
  //   query: {},
  //   group: [],
  //   close: false
  // },
  fistPage: {
    label: '项目简介',
    value: '/wel/index',
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}

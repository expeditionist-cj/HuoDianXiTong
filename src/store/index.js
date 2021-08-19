import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import nx_ems from "./modules/nx_ems"
import writeData from "./modules/writeData"
import getters from './getters'
import assitantTitle from './modules/assitantTitle'
import analysis from "./modules/analysis"
import vuejsStorage from "vuejs-storage";


Vue.use(Vuex)
Vue.use(vuejsStorage)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
    nx_ems,
    writeData,
    assitantTitle,
    analysis
  },
  getters,
  plugins: [
    vuejsStorage({
      keys: ['user.user_id',
        'user.dept_id',
        'user.regionCode',
        'user.projectCode',
        'user.regionName',
        'user.projectName',
        'writeData.identity',
        'user.user_id'
      ],
      //keep state.count in localStorage
      namespace: 'user',
      driver: vuejsStorage.drivers.sessionStorage
      //if you want to use sessionStorage instead of localStorage
    })
  ]
})

export default store

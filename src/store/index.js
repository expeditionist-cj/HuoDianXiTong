import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import nx_ems from "./modules/nx_ems"
import getters from './getters'
import assitantTitle from './modules/assitantTitle'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
    nx_ems,
    assitantTitle
  },
  getters
})

export default store

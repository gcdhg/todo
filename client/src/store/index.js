import Vue from 'vue'
import Vuex from 'vuex'

import users from './module/users'
import projects from './module/projects'
import tasks from './module/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    projects,
    tasks,
  }
})
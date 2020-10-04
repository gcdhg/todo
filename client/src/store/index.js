import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import todos from './modules/todos'
import createEdit from './modules/createEdit'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projects,
    createEdit,
    users,
    todos
  }
})
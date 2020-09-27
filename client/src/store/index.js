import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import todos from './modules/todos'
import createEdit from './modules/createEdit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    createEdit,
    users,
    todos
  }
})
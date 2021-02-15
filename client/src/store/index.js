import Vue from "vue";
import Vuex from "vuex";

import users from "@/store/moduls/users";
import tasks from "@/store/moduls/tasks";
import projects from "@/store/moduls/projects";
import controllers from "@/store/moduls/controllers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    controllers,
    tasks,
    projects,
  },
});

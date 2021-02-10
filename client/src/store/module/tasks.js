// const { default: fetch } = require("node-fetch");
// import userFetch from "./fetchers/user";
// import projectFetch from "./fetchers/project";
import taskFetch from "./fetchers/task";

export default {
  state: {
    tasks: [],
  },
  mutations: {
    UPDATE_ALL_PRIVATE_TASKS(state, newTasks) {
      state.tasks = newTasks;
    },
  },
  actions: {
    async CREATE_NEW_TASK(context, newTask) {
      const res = await taskFetch.createTask(
        context.getters.RETURN_TOKEN,
        newTask
      );
      if (res.status === (200 || 201)) {
        await context.dispatch("GET_ONE_PROJECT", newTask.project);
      }
    },
    async GET_ALL_USER_TASKS(context) {
      const res = await taskFetch.getAllPrivateTasks(
        context.getters.RETURN_TOKEN
      );
      if (res.status === 200) {
        const json = await res.json();
        context.commit("UPDATE_ALL_PRIVATE_TASKS", json);
      }
    },
  },
  getters: {
    GET_PRIVATE_TASKS(state) {
      return state.tasks;
    },
  },
};

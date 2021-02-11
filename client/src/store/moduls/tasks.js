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
      if (res.status === 201) {
        await context.dispatch("GET_ALL_USER_TASKS");
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
    async EDIT_TASK(context, task) {
      const res = await taskFetch.editTask(
        context.getters.RETURN_TOKEN,
        task._id,
        task
      );
      if (res.status === 201) {
        await context.dispatch("GET_ALL_USER_TASKS");
      }
    },
    async DELETE_TASK(context, task) {
      const res = await taskFetch.deleteTask(
        context.getters.RETURN_TOKEN,
        task._id
      );
      if (res.status === 201) {
        await context.dispatch("GET_ALL_USER_TASKS");
      }
    },
  },
  getters: {
    GET_PRIVATE_TASKS(state) {
      return state.tasks;
    },
  },
};

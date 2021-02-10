// const { default: fetch } = require("node-fetch");
// import userFetch from "./fetchers/user";
// import projectFetch from "./fetchers/project";
import taskFetch from "./fetchers/task";

export default {
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
  },
};

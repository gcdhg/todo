// const { default: fetch } = require("node-fetch");
// import userFetch from "./fetchers/user";
// import projectFetch from "./fetchers/project";
import taskFetch from "./fetchers/task";

export default {
  actions: {
    async CREATE_NEW_TASK(context, newTask) {
      const res = await taskFetch.createTask(context.getters.RETURN_TOKEN, newTask)
      // const res = await fetch("http://localhost:3000/tasks/create", {
      //   headers: {
      //     Authorization: `Bearer ${context.getters.RETURN_TOKEN}`,
      //     "Content-Type": "application/json;charset=utf-8",
      //     Origin: "http://localhost:3000/tasks/create",
      //   },
      //   method: "POST",
      //   body: JSON.stringify({
      //     title: newTask.title,
      //     planedAt: newTask.planedAt,
      //     projectId: newTask.project,
      //     "state.currentState": newTask.state,
      //   }),
      // });
      if (res.status === (200 || 201)) {
        await context.dispatch("GET_ONE_PROJECT", newTask.project);
      }
    },
  },
};

import projectFetch from "./fetchers/project";
import taskFetch from "./fetchers/task";

export default {
  state: {
    projects: [],
    tasks: [],
  },
  mutations: {
    UPDATE_PROJECTS(state, project) {
      state.projects = project;
    },
    UPDATE_ONE_PROJECT_TASKS(state, project) {
      state.tasks = project.tasks;
    },
  },
  actions: {
    async CREATE_PROJECT(context, project) {
      const res = await projectFetch.createProject(
        context.getters.RETURN_TOKEN,
        project
      );
      if (res.status === 201) {
        await context.dispatch("GET_ALL_PROJECTS");
      }
    },
    async GET_ALL_PROJECTS(context) {
      const res = await projectFetch.getUserProjects(
        context.getters.RETURN_TOKEN
      );
      if (res.status === 200) {
        const json = await res.json();
        context.commit("UPDATE_PROJECTS", json);
      }
    },
    async GET_ONE_PROJECT(context, project) {
      const res = await projectFetch.getOneprojectById(
        context.getters.RETURN_TOKEN,
        project._id
      );
      if (res.status === 200) {
        const json = await res.json();
        context.commit("UPDATE_ONE_PROJECT_TASKS", json);
      }
    },
    async CREATE_PROJECT_TASK(context, newTask) {
      const res = await taskFetch.createTask(
        context.getters.RETURN_TOKEN,
        newTask
      );
      if (res.status === 201) {
        await context.dispatch("GET_ONE_PROJECT", newTask);
      }
    },
    async EDIT_PROJECT(context, project) {
      const res = await projectFetch.editOneprojectById(
        context.getters.RETURN_TOKEN,
        project
      );
      if (res.status === 201) {
        await context.dispatch("GET_ALL_PROJECTS");
      }
    },
    async DELETE_PROJECT(context, project) {
      const res = await projectFetch.deleteProject(
        context.getters.RETURN_TOKEN,
        project._id
      );
      if (res.status === 201) {
        await context.dispatch("GET_ALL_PROJECTS");
      }
    },
  },
  getters: {
    RETURN_ALL_PROJECTS(state) {
      return state.projects;
    },
    RETURN_ONE_PROJECT_TASKS(state) {
      return state.tasks;
    },
  },
};

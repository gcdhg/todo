import projectFetch from "./fetchers/project";

export default {
  state: {
    projectList: [],
    project: {},
    id: "",
  },
  mutations: {
    UPDATE_PROJECTS(state, newProject) {
      state.projectList = newProject;
    },
    UPDATE_ONE_PROJECT(state, newProject) {
      state.project = newProject;
    },
  },
  actions: {
    async GET_ALL_USER_PROJECTS(context) {
      const res = await projectFetch.getAllProjects(
        context.getters.RETURN_TOKEN
      );
      if (res.status === (200 || 201)) {
        const json = await res.json();
        context.commit("UPDATE_PROJECTS", json);
      }
    },
    async CREATE_NEW_PROJECT(context, project) {
      const res = await projectFetch.createProject(
        context.getters.RETURN_TOKEN,
        project
      );

      if (res.status === (200 || 201)) {
        await context.dispatch("GET_ALL_USER_PROJECTS");
      }
    },
    async GET_ONE_PROJECT(context, project) {
      const res = await projectFetch.getOneprojectById(
        context.getters.RETURN_TOKEN,
        project
      );

      if (res.status === 200) {
        const json = await res.json();
        context.commit("UPDATE_ONE_PROJECT", json);
      }
    },
    async EDIT_PROJECT_TITLE(context, project) {
      const res = await projectFetch.editOneprojectById(
        context.getters.RETURN_TOKEN,
        project.projectId,
        project
      );

      if (res.status === 201) {
        context.commit("UPDATE_ONE_PROJECT", { title: project.title });
      }
    },
  },
  getters: {
    RETURN_PROJECTS(state) {
      return state.projectList;
    },
    RETURN_ONE_PROJECT(state) {
      return state.project;
    },
  },
};

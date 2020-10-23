const { default: fetch } = require("node-fetch");

module.exports = {
    state: {
        projectList: [],
        project: {},
        id: '',
    },
    mutations: {
        UPDATE_PROJECTS(state, newProject) {
            state.projectList = newProject;
        },
        UPDATE_ONE_PROJECT(state, newProject) {
            state.project = newProject;
        }
    },
    actions: {
        async GET_ALL_USER_PROJECTS(context) {
            const res = await fetch("http://localhost:3000/projects/get", {
                headers: {
                    'Authorization': `Bearer ${context.getters.RETURN_TOKEN}`,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/projects/get",
                }
            });
            if (res.status === (200 || 201)) {
                const json = await res.json();
                context.commit('UPDATE_PROJECTS', json);
            }
        },
        async CREATE_NEW_PROJECT(context, newProject) {
            const res = await fetch("http://localhost:3000/projects/create", {
                headers: {
                    'Authorization': `Bearer ${context.getters.RETURN_TOKEN}`,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/projects/create",
                },
                method: "POST",
                body: JSON.stringify({
                    title: newProject
                })
            });
            if (res.status === (200 || 201)) {
                await context.dispatch('GET_ALL_USER_PROJECTS');
            }
        },
        async GET_ONE_PROJECT(context, project) {
            const res = await fetch(`http://localhost:3000/projects/${project}`, {
                headers: {
                    'Authorization': `Bearer ${context.getters.RETURN_TOKEN}`,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": `http://localhost:3000/projects/${project}`,
                }
            });
            if (res.status === 200) {
                const json = await res.json();
                context.commit('UPDATE_ONE_PROJECT', json);
            }
        },
        async EDIT_PROJECT_TITLE(context, project) {
            const res = await fetch(`http://localhost:3000/projects/edit`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${context.getters.RETURN_TOKEN}`,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": `http://localhost:3000/projects/edit`,
                },
                body: JSON.stringify({
                    projectId: project.projectId,
                    title: project.title
                })
            })
            if (res.status === 201) {
                context.commit('UPDATE_ONE_PROJECT', { title: project.title });
            }
        },
    },
    getters: {
        RETURN_PROJECTS(state) {
            return state.projectList;
        },
        RETURN_ONE_PROJECT(state) {
            return state.project;
        }
    }
}
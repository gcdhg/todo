export default {
    state: {
        mode: {
            privateTasks: true,
            ownedTasks: false,
            partTasks: false
        },
        user: {
            id: "",
            username: ""
        }
    },
    getters: {
        RETURN_MODE(state) {
            return state.mode;
        },
        RETURN_USER_DATA(state) {
            return state.user
        }
    },
    mutations: {
        CHANGE_MODE(state, newMode) {
            state.mode = newMode;
        },
        CHANGE_USER_DATA(state, newUser) {
            state.user = newUser;
        }
    },
    actions: {
        async CHANGE_STATE_PRIVATE(context) {
            const mode = {
                privateTasks: true,
                ownedTasks: false,
                partTasks: false
            }

            context.commit("CHANGE_MODE", mode)
        },
        async CHANGE_STATE_OWNED(context) {
            const mode = {
                privateTasks: false,
                ownedTasks: true,
                partTasks: false
            }

            context.commit("CHANGE_MODE", mode)
        },
        async CHANGE_STATE_PART(context) {
            const mode = {
                privateTasks: false,
                ownedTasks: false,
                partTasks: true
            }

            context.commit("CHANGE_MODE", mode)
        },
        async CREATE_NEW_PROJECT(context, title) {
            await fetch("http://localhost:3000/projects/create", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/projects/create",
                },
                method: "POST",
                body: JSON.stringify({ title: title }),
            })
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        context.dispatch('GET_ALL_DATA');
                    }
                })
        },
        async FIND_USER_BY_USERNAME(context, user) {
            await fetch("http://localhost:3000/users/find", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/users/find",
                },
                method: "POST",
                body: JSON.stringify(user),
            })
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        context.commit("CHANGE_USER_DATA", json)
                    }
                })
        },
        async ADD_USER_TO_PROJECT(context, data) {
            const body = {
                newUser: data.newUser,
                projectId: data.projectId
            }
            await fetch("http://localhost:3000/projects/user/add", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/projects/user/adds",
                },
                method: "POST",
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        context.dispatch('GET_ALL_DATA');
                    }
                })
            },
        async DELETE_PROJECT(context, projectId) {
            await fetch("http://localhost:3000/projects/delete", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/projects/delete",
                },
                method: "DELETE",
                body: JSON.stringify({ projectId: projectId }),
            })
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        context.dispatch('GET_ALL_DATA');
                    }
                })
        }

    }
}
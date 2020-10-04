export default {
    state: {
        todos: [],
        data: {},
        loading: true,
        token: localStorage.token,
        auth: false,
    },
    mutations: {
        UPDATE_TODOS(state, todos) {
            state.todos = todos;
            state.loading = todos.loading;
        },
        USER_AUTHENTICATED(state, auth) {
            state.auth = auth;
        },
        UPDATE_DATA(state, data) {
            state.data = data;
        },
        UPDATE_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async UPDATE_PRIVATE_TASKS(context) {
            if (context.getters.RETURN_TOKEN !== undefined) {
                context.commit("USER_AUTHENTICATED", true)
            }
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                }
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 304) {
                        context.commit("USER_AUTHENTICATED", true)
                    }
                    else {
                        context.commit("USER_AUTHENTICATED", false)
                    }
                    return res.json()
                })
                .then(json => {
                    context.commit('UPDATE_TODOS', json)
                    context.commit('UPDATE_LOADING', false)
                }).catch(err => {
                    console.log(err);
                })
        },
        async REMOVE_TODO(context, task) {
            const body = {
                id: task._id,
                projectId: task.project
            }
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000",
                },
                method: "DELETE",
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((json) => {

                    if (json) {
                        json.loading = false
                        context.dispatch('GET_ALL_DATA');
                    }
                })
                .catch((err) => console.log(err));
        },
        async COMPLETE_TODO(context, task) {
            const body = {
                id: task._id,
                projectId: task.project
            }
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000",
                },
                method: "PUT",
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json) {
                        json.loading = false
                        context.dispatch('GET_ALL_DATA');
                    }
                })
                .catch((err) => console.log(err));
        },
        async GET_ALL_DATA(context) {
            try {
                await fetch("http://localhost:3000/data/all", {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/data/all",
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        context.commit('UPDATE_DATA', json);
                    })
            } catch (err) {
                console.log(err);
            }
        }
    },
    getters: {
        RETURN_TODOS(state) {
            return state.data.task;
        },
        RETURN_PROJECTS(state) {
            return state.data.owenedProjects;
        },
        RETURN_PART_OF(state) {
            return state.data.partOfProject
        },
        RETURN_LOADING(state) {
            return state.loading;
        },
        RETURN_TOKEN(state) {
            return String(state.token);
        },
        RETURN_USER_AUTHENTICATED(state) {
            return Boolean(state.auth);
        },
        RETURN_ALL_DATA(state) {
            return state.data;
        },
    }
}
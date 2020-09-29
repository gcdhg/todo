export default {
    state: {
        todos: [],
        loading: true,
        token: localStorage.token,
        auth: false,
    },
    mutations: {
        updateTodos(state, todos) {
            state.todos = todos;
            state.loading = todos.loading;
        },
        userAuthenticated(state, auth) {
            state.auth = auth;
        }
    },
    actions: {
        async updateData(context) {
            if (context.getters.returnToken !== undefined) {
                context.commit("userAuthenticated", true)
            }
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.returnToken,
                }
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 304) {
                        context.commit("userAuthenticated", true)
                    }
                    else {
                        context.commit("userAuthenticated", false)
                    }
                    return res.json()
                })
                .then(json => {
                    json.loading = false
                    context.commit('updateTodos', json)
                }).catch(err => {
                    console.log(err);
                })
        },
        async removeTodo(context, id) {
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.returnToken,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000",
                },
                method: "DELETE",
                body: JSON.stringify({
                    id,
                }),
            })
                .then((res) => res.json())
                .then((json) => {

                    if (json) {
                        json.loading = false
                        context.dispatch('updateData');
                    }
                })
                .catch((err) => console.log(err));
        },
        async completeTodo(context, id) {
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.returnToken,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000",
                },
                method: "PUT",
                body: JSON.stringify({
                    id,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json) {
                        json.loading = false
                        context.dispatch('updateData');
                    }
                })
                .catch((err) => console.log(err));
        },
    },
    getters: {
        returnTodos(state) {
            return state.todos;
        },
        returnLoading(state) {
            return state.loading;
        },
        returnToken(state) {
            return String(state.token);
        },
        returnUserAuthenticated(state) {
            return Boolean(state.auth);
        }
    }
}
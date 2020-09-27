export default {
    state: {
        todos: [],
        loading: true,
        token: localStorage.token
    },
    mutations: {
        updateTodos(state, todos) {
            state.todos = todos;
            state.loading = false;
        }
    },
    actions: {
        async updateData(context) {
            await fetch("http://localhost:3000", {
                headers: {
                    'Authorization': 'Bearer ' + context.getters.returnToken
                }
            })
                .then((res) => res.json())
                .then((json) => {
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
            return state.token;
        },
    }
}
export default {
    state: {
        todo: {
            id: '',
            title: '',
            body: ''
        },
        mode: 'Create'
    },
    mutations: {
        updateTodo(state, newData) {
            state.todo = newData;
        },
        updateMode(state, createOrEdit) {
            state.mode = createOrEdit;
        }
    },
    actions: {
        async fetchData(context, id) {
            try {
                const res = await fetch("http://localhost:3000/edit/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + context.getters.returnToken,
                        "Origin": "http://localhost:3000/edit/" + id
                    }
                });
                if (res) {
                    const json = await res.json();
                    context.commit('updateTodo', json.shift())
                }
                else console.log('fetch failed')
            } catch (err) {
                console.log(err);
            }
        },
        async updateOneToEditTodo(context, upadatedTodo) {
            context.commit('updateTodo', upadatedTodo)
            try {
                const res = await fetch("http://localhost:3000/edit", {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + context.getters.returnToken,
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/edit"
                    },
                    body: JSON.stringify(context.getters.returnOneTodoById),
                }).catch(err => console.log(err));
                if (res) {
                    const json = res.json();
                    context.commit('updateTodo', {
                        id: '',
                        title: '',
                        body: ''
                    })
                    console.log(json);
                }
                else console.log('fetch failed')
            } catch (err) {
                console.log(err);
            }
        },
        async createNewTodo(context, body) {
            try {
                const res = await fetch("http://localhost:3000/create", {
                    body: JSON.stringify(body),
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + context.getters.returnToken,
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/create",
                    },
                })
                if (res) {
                    const json = await res.json();
                    context.commit('updateTodo', {
                        id: '',
                        title: '',
                        body: ''
                    })
                    console.log(json);
                }
                else console.log('fetch failed')
            } catch (err) {
                console.log(err);
            }
        },
    },
    getters: {
        returnCreateEditMode(state) {
            return state.mod;
        },
        returnOneTodoById(state) {
            return state.todo
        }
    }
}
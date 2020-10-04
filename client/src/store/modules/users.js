export default {
    state: {
        username: 'UserName',
    },
    getters: {
        getUserName(state) {
            return state.username;
        }
    },
    mutations: {
        updateUserName(state, username) {
            state.username = username;
        }
    },
    actions: {
        async loginUser(context, user) {
            try {
                const res = await fetch("http://localhost:3000/users/login", {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/users/login",
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                if (res) {
                    const json = await res.json();
                    localStorage.token = String(json.token);
                    context.commit('updateUserName', String(json.username))
                    context.commit("USER_AUTHENTICATED", true)
                    window.location.href = '/'
                }
                else {
                    console.log("failed to fetch");
                }
            } catch (err) {
                console.log(err);
            }
        },

        async logoutUser(context) {
            try {
                const res = await fetch("http://localhost:3000/users/logout", {
                    headers: {
                        'Authorization': 'Bearer ' + context.getters.RETURN_TOKEN,
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/users/logout",
                    },
                    method: "POST",
                })
                if (!res) {
                    console.log("failed to fetch");
                }
                if (res.status === 201) {
                    localStorage.token = undefined;
                    context.commit("USER_AUTHENTICATED", false)
                    window.location.href = '/'
                }
                else {
                    console.log('failed to logout')
                }
            } catch (err) {
                console.log(err);
            }
        },
        async createUser(context, user) {
            try {
                const res = await fetch("http://localhost:3000/users/join", {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/users/join",
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                if (res) {
                    const json = await res.json();
                    user.token = json.token;
                    localStorage.token = String(json.token);
                    context.commit("USER_AUTHENTICATED", true)
                    window.location.href = '/login'
                }
                else {
                    console.log("failed to fetch");
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
}
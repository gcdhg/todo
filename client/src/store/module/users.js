const { default: fetch } = require("node-fetch")

module.exports = {
    state: {
        username: localStorage.username,
        token: localStorage.token,
        user: {},
        mode: 'personalData'
    },
    mutations: {
        UPDATE_USERNAME(state, newUserName) {
            localStorage.username = newUserName
            state.username = localStorage.username
        },
        UPDATE_TOKEN(state, newToken) {
            localStorage.token = newToken;
            state.token = localStorage.token;
        },
        UPDATE_USER_DATA(state, data) {
            state.user = data;
        },
        UPDATE_MODE(state, newMode) {
            state.mode = newMode
        }
    },
    actions: {
        async LOGIN_USER(context, user) {
            try {
                const res = await fetch("http://localhost:3000/users/login", {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Origin": "http://localhost:3000/users/login",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password
                    }),
                });
                if (res.status === (200 || 201)) {
                    const json = await res.json();
                    await context.commit('UPDATE_TOKEN', json.token)
                    await context.commit('UPDATE_USERNAME', json.username)
                    return true
                }
                else {
                    return false
                }
            } catch (err) {
                console.log(err);
            }
        },
        async GET_USER_DATA(context, userdata) {
            const res = await fetch(`http://localhost:3000/users/${userdata}`, {
                headers: {
                    'Authorization': `Bearer ${context.getters.RETURN_TOKEN}`,
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": `http://localhost:3000/users/${userdata}`,
                },
            });
            if (res.status === (200 || 201)) {
                const json = await res.json();
                context.commit('UPDATE_USER_DATA', json);
            }
        },
        async CHANGE_MODE (context, newMode) {
            context.commit('UPDATE_MODE', newMode);
        }
    },
    getters: {
        RETURN_TOKEN(state) {
            return state.token;
        },
        RETURN_USERNAME(state) {
            return state.username;
        },
        RETURN_USER_DATA(state) {
            return state.user
        },
        RETURN_MODE(state) {
            return state.mode
        }
    }
}
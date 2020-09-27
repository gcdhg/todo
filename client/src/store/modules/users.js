export default {
    state: {
        email: '',
        password: '',
        token: ''
    },
    mutations: {
        addUserData(state, user) {
            state.email = user.email;
            state.password = user.password;
            state.token = user.token;
        },
    },
    actions: {
        async loginUser(context, user) {
            await fetch("http://localhost:3000/users/login", {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "http://localhost:3000/users/login",
                },
                method: "POST",
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((json) => {
                    user.token = json.token
                })
                .catch((err) => {
                    console.log(err);
                });
            context.commit("addUserData", user);
        },
    },
    getters: {
        getToken(state) {
            return state.token
        }
    }
}
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
                    user.token = json.token;
                    console.log(json)
                    localStorage.token = String(json.token);
                    context.commit("addUserData", user);
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
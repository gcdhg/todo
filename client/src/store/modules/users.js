export default {
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
                    localStorage.token = String(json.token);
                    context.commit("userAuthenticated", true)
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
                        'Authorization': 'Bearer ' + context.getters.returnToken,
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
                    context.commit("userAuthenticated", false)
                    window.location.href = '/'
                }
                else {
                    console.log('failed to logout')
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
}
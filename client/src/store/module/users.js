// const { default: fetch } = require("node-fetch");
import userFetch from "./fetchers/user";
// import projectFetch from "./fetchers/project";
// import taskFetch from "./fetchers/task";

export default {
  state: {
    username: localStorage.username,
    token: localStorage.token,
    user: {},
    mode: "projects",
    isAuth: localStorage?.token ?? false,
  },
  mutations: {
    UPDATE_USERNAME(state, newUserName) {
      localStorage.username = newUserName;
      state.username = localStorage.username;
    },
    UPDATE_TOKEN(state, newToken) {
      localStorage.token = newToken;
      state.token = localStorage.token;
    },
    UPDATE_USER_DATA(state, data) {
      state.user = data;
    },
    UPDATE_MODE(state, newMode) {
      state.mode = newMode;
    },
    UPDATE_AUTH(state) {
      state.isAuth = localStorage?.token ?? false;
    },
  },
  actions: {
    async CREATE_USER(context, user) {
      const res = userFetch.createUser(user);
      // const res = await fetch("http://localhost:3000/users/create", {
      //   headers: {
      //     "Content-Type": "application/json;charset=utf-8",
      //     Origin: "http://localhost:3000/users/create",
      //   },
      //   method: "POST",
      //   body: JSON.stringify(user),
      // });
      if (res.status === (200 || 201)) {
        const json = await res.json();
        await context.commit("UPDATE_TOKEN", json.token);
        await context.commit("UPDATE_USERNAME", json.username);
        await context.commit("UPDATE_AUTH");
        return true;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        return false;
      }
    },
    async LOGIN_USER(context, user) {
      try {
        const res = await userFetch.loginUser(user);
        // const res = await fetch("http://localhost:3000/users/login", {
        //   headers: {
        //     "Content-Type": "application/json;charset=utf-8",
        //     Origin: "http://localhost:3000/users/login",
        //   },
        //   method: "POST",
        //   body: JSON.stringify({
        //     email: user.email,
        //     password: user.password,
        //   }),
        // });
        if (res.status === (200 || 201)) {
          const json = await res.json();
          await context.commit("UPDATE_TOKEN", json.token);
          await context.commit("UPDATE_USERNAME", json.username);
          await context.commit("UPDATE_AUTH");
          return true;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async LOGOUT_USER_ONCE(context, token) {
      const res = await userFetch.logoutUserOnce(
        context.getters.RETURN_TOKEN,
        token
      );
      // const res = await fetch(`http://localhost:3000/users/logout`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${context.getters.RETURN_TOKEN}`,
      //     "Content-Type": "application/json;charset=utf-8",
      //     Origin: `http://localhost:3000/users/logout`,
      //   },
      //   body: JSON.stringify({
      //     token: token ?? context.getters.RETURN_TOKEN,
      //   }),
      // });
      if (res.status == 201) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        await context.commit("UPDATE_AUTH");
      }
    },
    async GET_USER_DATA(context, userdata) {
      const res = await userFetch.getUser(
        userdata,
        context.getters.RETURN_TOKEN
      );
      // const res = await fetch(`http://localhost:3000/users/${userdata}`, {
      //   headers: {
      //     Authorization: `Bearer ${context.getters.RETURN_TOKEN}`,
      //     "Content-Type": "application/json;charset=utf-8",
      //     Origin: `http://localhost:3000/users/${userdata}`,
      //   },
      // });
      if (res.status === (200 || 201)) {
        const json = await res.json();
        context.commit("UPDATE_USER_DATA", json);
      }
    },
    async CHANGE_MODE(context, newMode) {
      context.commit("UPDATE_MODE", newMode);
    },
  },
  getters: {
    RETURN_TOKEN(state) {
      return state.token;
    },
    RETURN_USERNAME(state) {
      return state.username;
    },
    RETURN_USER_DATA(state) {
      return state.user;
    },
    RETURN_MODE(state) {
      return state.mode;
    },
    RETURN_USER_AUTHENTICATED(state) {
      return state.isAuth;
    },
  },
};

import userFetch from "./fetchers/user";

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
      const res = await userFetch.createUser(user);
      console.log(res.status);
      if (res.status === 201) {
        // const json = await res.json();
        context.actions("LOGIN_USER", user);
        return true;
      } else {
        return false;
      }
    },
    async LOGIN_USER(context, user) {
      try {
        const res = await userFetch.loginUser(user);
        if (res.status === (200 || 201)) {
          const json = await res.json();
          context.commit("UPDATE_TOKEN", json.token);
          context.commit("UPDATE_USERNAME", user.username);
          context.commit("UPDATE_AUTH");
          return true;
        } else {
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
      if (res.status == 201) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        context.commit("UPDATE_AUTH");
      }
    },
    async GET_USER_DATA(context, userdata) {
      const res = await userFetch.getUser(
        userdata,
        context.getters.RETURN_TOKEN
      );
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

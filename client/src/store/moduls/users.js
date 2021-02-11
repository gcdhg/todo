import userFetch from "./fetchers/user";

export default {
  state: {
    token: localStorage.token,
    user: {},
  },
  mutations: {
    UPDATE_TOKEN(state, newToken) {
      localStorage.token = newToken;
      state.token = localStorage.token;
    },
    UPDATE_USER_DATA(state, data) {
      state.user = data;
    },
  },
  actions: {
    async CREATE_USER(context, user) {
      const res = await userFetch.createUser(user);
      console.log(res.status);
      if (res.status === 201) {
        await context.dispatch("LOGIN_USER", user);
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
          await context.dispatch("GET_USER_DATA");
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async GET_USER_DATA(context) {
      const res = await userFetch.getUserByToken({
        token: context.getters.RETURN_TOKEN,
      });
      if (res.status === (200 || 201)) {
        const json = await res.json();
        console.log(json);
        context.commit("UPDATE_USER_DATA", json);
        return true;
      }
      return false;
    },

    async LOGOUT_USER_ONCE(context, token) {
      const res = await userFetch.logoutUserOnce(
        context.getters.RETURN_TOKEN,
        token
      );
      if (res.status == 201) {
        localStorage.removeItem("token");
        context.commit("UPDATE_AUTH");
      }
    },

    async LOGOUT_FULLY(context) {
      const res = await userFetch.logoutUserOnAllDevices(
        context.getters.RETURN_TOKEN
      );
      if (res.status == 201) {
        localStorage.removeItem("token");
      }
    },
  },
  getters: {
    RETURN_TOKEN(state) {
      return state.token;
    },
    RETURN_USER_DATA(state) {
      return state.user;
    },
  },
};

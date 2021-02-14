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
    DROP_TOKEN(state) {
      localStorage.removeItem("token");
      state.token = localStorage.token;
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
          console.log(res.Session);
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
      const res = await userFetch.getUser({
        token: context.getters.RETURN_TOKEN,
      });
      if (res.status === 200) {
        const json = await res.json();
        context.commit("UPDATE_USER_DATA", json);
        return true;
      } else {
        context.commit("DROP_TOKEN");
      }
      return false;
    },

    async LOGOUT_USER_ONCE(context, tokenToDelete) {
      const token = tokenToDelete ?? context.getters.RETURN_TOKEN;
      const res = await userFetch.logoutUserOnce(
        { token: context.getters.RETURN_TOKEN },
        token
      );
      if (res.status == 201) {
        // localStorage.removeItem("token");
        await context.dispatch("GET_USER_DATA");
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

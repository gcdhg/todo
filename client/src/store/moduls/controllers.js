export default {
  state: {
    // menuState: "tasks",
    mode: "tasks",
  },
  mutations: {
    UPDATE_MODE(state, mode) {
      state.mode = mode;
    },
  },
  actions: {
    async CHANGE_MODE(context, newMode) {
      context.commit("UPDATE_MODE", newMode);
    },
  },
  getters: {
    RETURN_MODE(state) {
      return state.mode;
    },
  },
};

export default {
  state: {
    history: [],
    settings: {},
    error: ""
  },
  mutations: {
    addSettings(state, res) {
      state.settings = res;
    },
    addHistory(state, res) {
      state.history = res;
    },
    updateHistory(state, message) {
      state.history.push(message);
    },
    setError(state, e) {
      state.error = e;
    }
  },
  actions: {
    async fetchSettings({ commit }) {
      try {
        let promise = await fetch(`https://nane.tada.team/api/settings`);
        let res = await promise.json();

        commit("addSettings", res.result);
        // commit("setError", "");
      } catch (e) {
        throw new Error(`Что-то пошло не так`);
      }
    },
    async fetchHistory({ commit }, name) {
      let fetchData = null;
      let res = null;

      try {
        fetchData = await fetch(`https://nane.tada.team/api/rooms/${name}/history`);
        res = await fetchData.json();

        if (Array.isArray(res.result)) {
          commit("addHistory", res.result);
        }
      } catch (error) {
        if (!fetchData) {
          commit("addHistory", []);
        }
      }
      // commit("setError", "");
    },
    updateHistory({ commit }, obj) {
      commit("updateHistory", obj);
      // commit("setError", "");
    }
  },
  getters: {
    getHistory: s => s.history.slice(),
    getSettings: s => ({
      ...s.settings
    }),
    getError: s => s.error
  }
};
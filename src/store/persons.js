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
        commit("setError", "");
      } catch (e) {
        throw new Error(`Что-то пошло не так`);
      }
    },
    async fetchHistory({ commit }, name) {
      try {
        let promise = await fetch(`https://nane.tada.team/api/rooms/${name}/history`);
        let res = await promise.json();

        if (Array.isArray(res.result)) {
          commit("addHistory", res.result);
        } else {
          console.error(`Error: ${name} не массив`);
        }
        commit("setError", "");
      } catch (e) {
        commit("setError", "Нет историй или нет такого юзера");
        throw new Error(`Что-то пошло не так`, e);
      }
    },
    updateHistory({ commit }, obj) {
      commit("updateHistory", obj);
      commit("setError", "");
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
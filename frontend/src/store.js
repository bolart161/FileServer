import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: null,
  },
  mutations: {
    setID(state, payload) {
      state.id = payload;
    },
  },
  actions: {
    setID({ commit }, id) {
      commit('setID', id);
    },
  },
  getters: {
    ID(state) {
      return state.id;
    },
  },
});

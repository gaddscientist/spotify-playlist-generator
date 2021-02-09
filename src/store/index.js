import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      tracks: [],
    };
  },
  mutations: {
    setTracks(state, payload) {
      state.tracks = payload;
    },
  },
  actions: {
    updateTracks(context, payload) {
      context.commit('setTracks', payload);
    },
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
  modules: {},
});

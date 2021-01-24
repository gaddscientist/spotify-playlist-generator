import { createStore } from 'vuex';
import * as reddit from '../api/reddit.js';

export default createStore({
  state() {
    return {
      submissions: {},
    };
  },
  mutations: {
    addSubmission(state, payload) {
      state.submissions.push(payload);
    },
  },
  actions: {
    async addFilteredSubmissions(context, payload) {
      const results = await reddit.getSpotifySubmissionsFromMulti(
        payload.username,
        payload.multireddit,
        payload.sort,
        payload.top
      );

      // const submissions = {};

      for (let i = 0; i < results.length; i++) {
        if (results[i].length > 0) {
          console.log(results[i]);
        }
        setTimeout(() => {
          console.log(results[i][0]._hasFetched);
        }, 3000);
      }
    },
  },
  getters: {},
  modules: {},
});

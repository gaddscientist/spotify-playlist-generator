import { createStore } from 'vuex';
import * as reddit from '../api/reddit.js';

export default createStore({
  state() {
    return {
      submissions: {},
      ids: [],
      tracks: [],
      // tracks: [
      //   {
      //     title: 'Work',
      //     artist: 'Gang Starr',
      //     album: 'Moment Of Truth',
      //     duration: '2:58',
      //   },
      //   {
      //     title: 'Deadly Combination',
      //     artist: 'Big L, Tupac',
      //     album: 'The Big Picture',
      //     duration: '2:32',
      //   },
      //   {
      //     title: 'Still',
      //     artist: 'Geto Boys',
      //     album: 'The Resurrection',
      //     duration: '4:00',
      //   },
      //   {
      //     title: 'Drop',
      //     artist: 'The Pharcyde',
      //     album: 'Labcabincalifornia',
      //     duration: '5:34',
      //   },
      //   {
      //     title: 'Grown Man Sport',
      //     artist: 'Pete Rock, Inl',
      //     album: 'Center of Attention',
      //     duration: '4:36',
      //   },
      //   {
      //     title: 'There He Go',
      //     artist: 'ScHoolboy Q',
      //     album: 'Habits & Contradictions',
      //     duration: '3:20',
      //   },
      //   {
      //     title: 'The Light',
      //     artist: 'Common',
      //     album: 'Go! Common Classics',
      //     duration: '4:04',
      //   },
      //   {
      //     title: 'Survival Tactics',
      //     artist: 'Joey Bada$$, Capital Steez',
      //     album: '1999',
      //     duration: '3:23',
      //   },
      //   {
      //     title: 'Cherry WIne',
      //     artist: 'Nas, Amy Winehouse',
      //     album: 'Life Is Good(Deluxe)',
      //     duration: '5:56',
      //   },
      // ],
    };
  },
  mutations: {
    addSubmission(state, payload) {
      state.submissions.push(payload);
    },
    updateIds(state, payload) {
      state.ids = payload;
    },
    updateTracks(state, payload) {
      state.tracks = payload;
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
      results;
    },
    // switch set and update for mutations and actions
    setSubmissionIds(context, payload) {
      context.commit('updateIds', payload);
    },
    setTracks(context, payload) {
      context.commit('updateTracks', payload);
    },
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
    getIds(state) {
      return state.ids;
    },
  },
  modules: {},
});

import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      tracks: [],
    };
  },
  mutations: {
    setTracks(state, payload) {
      // state.tracks = payload;
      state.tracks = [...state.tracks, ...payload];
    },
  },
  actions: {
    processTracks(context, payload) {
      const processedTracks = [];
      payload.forEach(track => {
        processedTracks.push({
          name: track.data.name,
          artist: track.data.artists[0].name,
          album: track.data.album.name,
          duration: track.data.duration_ms / 1000,
        });
      });
      context.commit('setTracks', processedTracks);
    },
    processAlbums(context, payload) {
      const processedTracks = [];
      payload.forEach(album => {
        const albumName = album.data.name;
        album.data.tracks.items.forEach(track => {
          processedTracks.push({
            name: track.name,
            artist: track.artists[0].name,
            album: albumName,
            duration: track.duration_ms / 1000,
          });
        });
      });
      context.commit('setTracks', processedTracks);
    },
    processPlaylists(context, payload) {
      const processedTracks = [];
      payload.forEach(playlist => {
        playlist.data.tracks.items.forEach(item => {
          processedTracks.push({
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            duration: item.track.duration_ms / 1000,
          });
        });
      });
      context.commit('setTracks', processedTracks);
    },
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
  modules: {},
});

import { createStore } from 'vuex';

function getDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed();
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default createStore({
  state() {
    return {
      tracks: JSON.parse(sessionStorage.getItem('tracks')) || [],
      numTracks: null,
    };
  },
  mutations: {
    setTracks(state, payload) {
      if (state.tracks.length < state.numTracks) {
        state.tracks = [...state.tracks, ...payload].splice(0, state.numTracks);
        sessionStorage.setItem('tracks', JSON.stringify(state.tracks));
      }
    },
    clearTracks(state) {
      state.tracks = [];
      sessionStorage.clear('tracks');
    },
    setNumTracks(state, payload) {
      state.numTracks = payload;
    },
  },
  actions: {
    processTracks(context, payload) {
      const processedTracks = [];
      payload.forEach(track => {
        processedTracks.push({
          uri: 'spotify:track:' + track.data.id,
          name: track.data.name,
          artists: track.data.artists,
          album: track.data.album.name,
          duration: getDuration(track.data.duration_ms),
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
            uri: 'spotify:track:' + track.id,
            name: track.name,
            artists: track.artists,
            album: albumName,
            duration: getDuration(track.duration_ms),
          });
        });
      });
      context.commit('setTracks', processedTracks);
    },
    processPlaylists(context, payload) {
      const processedTracks = [];
      payload.forEach(playlist => {
        playlist.data.tracks.items.forEach(item => {
          if (item.track) {
            processedTracks.push({
              uri: 'spotify:track:' + item.track.id,
              name: item.track.name,
              artists: item.track.artists,
              album: item.track.album.name,
              duration: getDuration(item.track.duration_ms),
            });
          }
        });
      });
      context.commit('setTracks', processedTracks);
    },
    resetTracks(context) {
      context.commit('clearTracks');
    },
    updateNumTracks(context, payload) {
      context.commit('setNumTracks', payload);
    },
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
    getNumTracks(state) {
      return state.numTracks;
    },
  },
  modules: {},
});

import { createStore } from 'vuex';

function getDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed();
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default createStore({
  state() {
    return {
      // tracks: [],
      tracks: JSON.parse(sessionStorage.getItem('tracks')) || [],
    };
  },
  mutations: {
    setTracks(state, payload) {
      // state.tracks = payload;
      state.tracks = [...state.tracks, ...payload];
      sessionStorage.setItem('tracks', JSON.stringify(state.tracks));
    },
  },
  actions: {
    processTracks(context, payload) {
      const processedTracks = [];
      payload.forEach(track => {
        processedTracks.push({
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
      console.log(payload);
      payload.forEach(playlist => {
        playlist.data.tracks.items.forEach(item => {
          if (item.track) {
            processedTracks.push({
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
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
  modules: {},
});

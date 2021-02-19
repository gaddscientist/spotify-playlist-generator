<template>
  <div id="main">
    <div class="main-content">
      <playlist-form :loading="isLoading" @submission="getSubmissions" />
    </div>
  </div>
</template>

<script>
import PlaylistForm from '../components/layout/PlaylistForm.vue';
import * as reddit from '../api/reddit.js';
import * as spotify from '../api/spotify.js';

export default {
  components: {
    PlaylistForm,
  },
  data() {
    return {
      results: null,
      redditType: '',
      isLoading: false,
    };
  },
  mounted() {
    this.results = null;
    this.$store.dispatch('resetTracks');
  },
  methods: {
    // Gets reddit submissions based on user specified form input
    async getSubmissions(values) {
      this.isLoading = true;
      this.redditType = values.redditType;

      if (this.redditType === 'multireddit') {
        const results = await reddit.getSpotifySubmissionsFromMulti(
          values.username,
          values.multireddit,
          values.sort,
          values.top
        );

        this.results = results;
      } else {
        // Subreddit
        const results = await reddit.getSpotifySubmissionsFromSub(
          values.subreddit,
          4,
          values.sort,
          values.top
        );

        this.results = results;
      }

      // Gets spotify single tracks and sends them to Vuex to get processed
      this.$store.dispatch(
        'processTracks',
        await spotify.getSingleTracks(this.results.tracks)
      );

      // Gets spotify albums and sends them to Vuex to get processed
      if (values.albums) {
        this.$store.dispatch(
          'processAlbums',
          await spotify.getAlbums(this.results.albums)
        );
      }

      // Gets spotify playlists and sends them to Vuex to get processed
      if (values.playlists) {
        this.$store.dispatch(
          'processPlaylists',
          await spotify.getPlaylists(this.results.playlists)
        );
      }
      this.isLoading = false;

      // // Changes view to playlist
      this.$router.push({
        name: 'PlaylistPage',
      });
    },
  },
};
</script>

<style scoped>
#main {
  color: #fff;
  min-height: 93vh;
}

#main .main-content {
  padding-top: 4rem;
  display: flex;
  text-align: center;
}
</style>

<template>
  <div id="showcase">
    <div class="showcase-content">
      <playlist-form @submission="getSubmissions" />
    </div>
  </div>
</template>

<script>
import PlaylistForm from '../components/layout/PlaylistForm.vue';
import * as reddit from '../api/reddit.js';

export default {
  components: {
    PlaylistForm,
  },
  data() {
    return {
      results: null,
    };
  },
  methods: {
    async getSubmissions(values) {
      const results = await reddit.getSpotifySubmissionsFromMulti(
        values.username,
        values.multireddit,
        values.sort,
        values.top
      );
      results.forEach(result => console.log(result));
      // this.results = this.organizeResults(results);
    },
    organizeResults(results) {
      let organizedResults = {};
      results.forEach(result => {
        organizedResults = { ...organizedResults, ...result };
      });

      return organizedResults;
    },
  },
  watch: {
    results() {},
  },
};
</script>

<style scoped>
#showcase {
  background: #333 url('../assets/spotify_background_logo.jpeg') no-repeat fixed
    center/cover;
  min-height: 93vh;
  color: #fff;
}

#showcase .showcase-content {
  padding-top: 4rem;
  display: flex;
  text-align: center;
}
</style>

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
    getSubmissions(values) {
      reddit
        .getSpotifySubmissionsFromMulti(
          values.username,
          values.multireddit,
          values.sort,
          values.top
        )
        .then(results => {
          setTimeout(() => {
            this.results = reddit.organizeResults(results);
            console.log(this.results);
          }, 2000);
        });
    },
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

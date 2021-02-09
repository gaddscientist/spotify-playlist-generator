<template>
  <div id="showcase">
    <div class="showcase-content">
      <playlist-form :tracks="tracks" @submission="getSubmissions" />
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
      redditType: null,
      tracks: null,
    };
  },
  methods: {
    async getSubmissions(values) {
      if (values.redditType === 'multireddit') {
        this.redditType = values.redditType;
        const results = await reddit.getSpotifySubmissionsFromMulti(
          values.username,
          values.multireddit,
          values.sort,
          values.top
        );
        this.results = this.processResults(results);
      } else {
        this.redditType = values.redditType;
        const results = await reddit.getSpotifySubmissionsFromSub(
          values.subreddit,
          4,
          values.sort,
          values.top
        );
        this.results = this.processResults(results);
      }
      this.$store.dispatch('setSubmissionIds', this.results);
      const trackObjs = await spotify.getSingleTracks(this.results.tracks);
      this.$store.dispatch('setTracks', trackObjs);
      // console.log(this.results);
      this.$router.push({
        name: 'PlaylistPage',
      });
    },
    processResults(results) {
      let resultsArr = [];
      if (this.redditType === 'multireddit') {
        results.forEach(result => {
          resultsArr.push(...result);
        });
      } else {
        resultsArr = results;
      }

      const urls = resultsArr
        .filter(
          (item, index, self) =>
            index === self.findIndex(t => t.url === item.url)
        )
        .map(item => item.url);

      const links = { tracks: [], albums: [], playlists: [] };
      urls.forEach(url => {
        const submissionType = url.split('/')[3];
        const submissionId = url.split('/')[4].split('?')[0];
        if (submissionType === 'track') {
          links.tracks.push(submissionId);
        } else if (submissionType === 'album') {
          links.albums.push(submissionId);
        } else if (submissionType === 'playlist') {
          links.playlists.push(submissionId);
        } else {
          // Print error?
        }
      });

      return links;
    },
    async getSpotifyTracks(ids) {
      const results = await spotify.getSingleTracks(ids);
      this.tracks = results;
    },
  },
};
</script>

<style scoped>
#showcase {
  color: #fff;
  min-height: 93vh;
}

#showcase .showcase-content {
  padding-top: 4rem;
  display: flex;
  text-align: center;
}
</style>

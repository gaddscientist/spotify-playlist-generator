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
      redditType: null,
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

        setTimeout(() => {
          this.results = this.processResults(results);
          console.log(this.results);
        }, 2000);
      } else {
        this.redditType = values.redditType;
        const results = await reddit.getSpotifySubmissionsFromSub(
          values.subreddit,
          4,
          values.sort,
          values.top
        );

        setTimeout(() => {
          // this.results = results;
          this.results = this.processResults(results);
          console.log(this.results);
        }, 2000);
      }
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

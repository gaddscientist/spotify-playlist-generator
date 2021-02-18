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
import * as spotify from '../api/spotify.js';

export default {
  components: {
    PlaylistForm,
  },
  data() {
    return {
      results: null,
      redditType: '',
    };
  },
  created() {
    this.results = null;
  },
  methods: {
    // Gets reddit submissions based on user specified form input
    async getSubmissions(values) {
      this.redditType = values.redditType;

      if (this.redditType === 'multireddit') {
        const results = await reddit.getSpotifySubmissionsFromMulti(
          values.username,
          values.multireddit,
          values.sort,
          values.top
        );

        this.results = this.processResults(results);
      } else {
        // Subreddit
        const results = await reddit.getSpotifySubmissionsFromSub(
          values.subreddit,
          4,
          values.sort,
          values.top
        );

        this.results = this.processResults(results);
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

      // // Changes view to playlist
      this.$router.push({
        name: 'PlaylistPage',
      });
    },
    // Organizes reddit submissions into lists for each type(track/album/playlist)
    processResults(results) {
      let resultsArr = [];
      if (this.redditType === 'multireddit') {
        // Flattens objects from each subreddit into one array
        results.forEach(result => {
          resultsArr.push(...result);
        });
      } else {
        resultsArr = results;
      }

      const urls = resultsArr
        // Filters out any submissions that may have been repeated
        .filter(
          (item, index, self) =>
            index === self.findIndex(t => t.url === item.url)
        )
        // Returns array of urls from each submission
        .map(item => item.url);

      const links = { tracks: [], albums: [], playlists: [] };

      // Extracts the ID from each url and stores in corresponding array
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
          // Print error
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

<template>
  <div id="showcase">
    <div class="showcase-content">
      <playlist-form @submission="logSubmission" />
    </div>
  </div>
</template>

<script>
import PlaylistForm from '../components/layout/PlaylistForm.vue';

export default {
  components: {
    PlaylistForm,
  },
  methods: {
    logSubmission(values) {
      console.log(values);
    },
  },
};
</script>

<style scoped>
#showcase {
  background: #333 url('../assets/spotify_background_logo.jpeg') no-repeat fixed
    center/cover;
  height: 93vh;
  color: #fff;
}

#showcase .showcase-content {
  padding-top: 4rem;
  display: flex;
  text-align: center;
}
</style>

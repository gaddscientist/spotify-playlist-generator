<template>
  <div class="showcase">
    <div class="showcase-content">
      <h1 id="title">Spotify Playlist Generator</h1>
      <p class="lead">
        Create playlists based on submissions to subreddits or a multireddit
      </p>
      <span id="btn-links">
        <base-button link to="/github" class="flat-green"
          >Learn More</base-button
        >
        <base-button link to="/form" class="flat-green"
          >Get Started</base-button
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.showcase {
  background: #333 url('../assets/spotify-macbook.jpg') no-repeat fixed
    center/cover;
  height: 93vh;
  color: white;
}
.showcase-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15rem;
  text-align: center;

  /* Overlay */
  z-index: 1;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.lead {
  font-weight: bold;
  margin-top: 2rem;
  font-size: 1.7rem;
}
#title {
  font-size: 4.5rem;
}
#btn-links {
  margin-top: 2rem;
}
</style>

<template>
  <div id="showcase">
    <div class="showcase-content">
      <h1></h1>
      <base-card>
        <base-button mode="flat-dark">Create Playlist</base-button>
      </base-card>
    </div>
  </div>
</template>

<style scoped>
#showcase {
  background: #333 url('../assets/spotify_background_logo.jpeg') no-repeat fixed
    center/cover;
  height: 93vh;
  color: #fff;
}

#showcase .showcase-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 0 2rem;

  /* Overlay */
  /* position: absolute;
  top: 65px;
  left: 0;
  right: 0;
  background-color: rgba(39, 39, 39, 0.3); */
}
</style>

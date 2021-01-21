<template>
  <!-- Header Showcase -->
  <div id="showcase">
    <div class="showcase-content">
      <div style="display: flex; flex-direction: row;">
        <base-button mode="flat-dark">Green Example</base-button>
        <base-button mode="flat-dark">Dark Example</base-button>
        <base-button mode="flat-dark">Light Example</base-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Showcase */
#showcase {
  /* background: #333; */
  background: #333 url('../assets/spotify_background_logo.jpeg') no-repeat fixed
    center/cover;
  height: 100vh;
  color: #fff;
}

#showcase .showcase-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;

  /* Overlay */
  position: absolute;
  top: 65px;
  left: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.4); */
  background-color: rgba(39, 39, 39, 0.3);
}
</style>

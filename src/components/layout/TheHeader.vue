<template>
  <nav id="navbar">
    <div class="title">
      <img id="logo" alt="Spotify logo" src="@/assets/spotify_logo_green.png" />
      <h2>Playlist Generator</h2>
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><a href="#popular">Popular</a></li>
      <li><a href="#help">Help</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</template>

<style scoped>
#logo {
  height: 35px;
  margin-right: 0.25rem;
}

#navbar {
  display: flex;
  /* position: sticky; */
  /* z-index: 1; */
  top: 0;
  background: #222327;
  color: #fff;
  justify-content: space-around;
  padding: 1rem;
  height: 7vh;
}

#navbar ul {
  display: flex;
  align-items: center;
  list-style: none;
}

#navbar ul li a {
  font-weight: bold;
  color: #1ed760;
  padding: 0.5rem;
  margin: 0 0.25rem;
}

#navbar ul li a:hover {
  background: #1ed760;
  color: white;
  border-radius: 5px;
}

.title {
  display: flex;
  align-items: center;
}
</style>

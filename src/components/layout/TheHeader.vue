<template>
  <!-- Navbar -->
  <nav id="navbar">
    <div style="display: flex; align-items: center;">
      <img id="logo" alt="Spotify logo" src="@/assets/spotify_logo_green.png" />
      <h2>Playlist Generator</h2>
    </div>
    <ul>
      <!-- #home links to home id tag on body -->
      <li><a href="#home">Home</a></li>
      <li><a href="#what">What</a></li>
      <li><a href="#who">Who</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</template>

<style scoped>
#logo {
  height: 35px;
  /* width: 28px; */
  margin-right: 0.25rem;
}
/* Navbar */
#navbar {
  display: flex;
  position: sticky;
  top: 0;
  /* background: #333; */
  /* background: #191414; */
  background: #222327;
  color: #fff;
  justify-content: space-around;
  z-index: 1;
  padding: 1rem;
}

#navbar ul {
  display: flex;
  align-items: center;
  list-style: none;
}

#navbar ul li a {
  font-weight: bold;
  color: #32cd32;
  /* color: #1db954; */
  padding: 0.5rem;
  margin: 0 0.25rem;
}

#navbar ul li a:hover {
  background: #32cd32;
  /* background: #1db954; */
  color: white;
  border-radius: 5px;
}
</style>

<template>
  <!-- Navbar -->
  <nav id="navbar">
    <div style="display: flex; align-items: center;">
      <img id="logo" alt="Spotify logo" src="@/assets/spotify_logo_green.png" />
      <h1><span class="text-primary"> Playlist </span>Generator</h1>
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
  height: 28px;
  width: 28px;
  margin-right: 0.25rem;
}
/* Navbar */
#navbar {
  display: flex;
  position: sticky;
  top: 0;
  background: #333;
  background: #191414;
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
  color: white;
  padding: 0.75rem;
  margin: 0 0.25;
}

#navbar ul li a:hover {
  background: #32cd32;
  /* background: #1db954; */
  border-radius: 5px;
}

.text-primary {
  color: #32cd32;
  /* color: #1db954; */
}
</style>

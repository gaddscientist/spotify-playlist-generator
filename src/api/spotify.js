/**
 * Spotify API functionality for back end
 */

'use strict';
// const fs = require('fs');
const credentials = require('../../spotifyCredentials.json');
const axios = require('axios');
// Query string needed so payload is in correct format
const querystring = require('querystring');

// Checks to see if last auth token was fetched more than 50 minutes ago
// Uses refresh token to get new auth token and updates time stamp
if (credentials.lastTimeStamp <= Date.now() - 3000000) {
  getNewAuthToken();
}

function getNewAuthToken() {
  const url = 'https://accounts.spotify.com/api/token';

  const data = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: credentials.refresh_token,
  });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: credentials.Authorization,
    },
  };

  axios.post(url, data, config).then(res => {
    credentials.authorization_code = res.data.access_token;
    credentials.lastTimeStamp = Date.now();
    // fs.writeFileSync(
    //   'spotifyCredentials.json',
    //   JSON.stringify(credentials, null, 4)
    // );
  });
}

async function getSingleTracks(trackIds) {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + credentials.authorization_code,
    },
  };

  return Promise.all(
    trackIds.map(
      async id =>
        await axios.get(`https://api.spotify.com/v1/tracks/${id}`, config)
    )
  );
}

async function getAlbums(albumIds) {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + credentials.authorization_code,
    },
  };

  return Promise.all(
    albumIds.map(
      async id =>
        await axios.get(`https://api.spotify.com/v1/albums/${id}`, config)
    )
  );
}

// TESTING
// const testTracks = ['2G90KzHn8ynh7Ai48hPJoR', '5OkLfBehmMPQXnCK9tNRd8'];
// getSingleTracks(testTracks).then(results =>
//   results.forEach(result => {
//     console.log(result.data.name);
//     console.log(result.data.artists[0].name);
//   })
// );

// function getTracksFromAlbums() {}

// Tracks
//-------------
// Name:   res.data.name
// Artist: res.data.artists[0].name  --> One index per artist
// Album:  res.data.album.album_type === 'album', res.data.album.name
// Album:  res.data.album.album_type === 'single', single
// Length: res.data.duration_ms --> Convert to min:sec

// Albums
//----------
// Some albums have only one song
// Some track links are linked by album
// album_type can be labeled 'single'
// Get all album links with one song and add them to tracks playlist
// If album link, res.data.type === 'album', res.data.total_tracks >= 1, get res.data.tracks.items[]

// Playlists
//-------------

// getTracks() {}

export { getSingleTracks, getAlbums };

/**
 * Spotify API functionality for back end
 */

'use strict';
const fs = require('fs');
const credentials = require('../../spotifyCredentials.json');
const request = require('request');
const querystring = require('querystring');
const axios = require('axios');

// Checks to see if last auth token was fetched more than 50 minutes ago
// Uses refresh token to get new auth token and updates time stamp
if (credentials.lastTimeStamp >= Date.now() - 3000000) {
  getNewAuthToken();
}

function getNewAuthToken() {
  let url = 'https://accounts.spotify.com/api/token';
  let data = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: credentials.refresh_token,
  });
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: credentials.Authorization,
    },
  };

  axios.post(url, data, config).then(res => {
    credentials.authorization_code = res.data.access_token;
    credentials.lastTimeStamp = Date.now();
    fs.writeFileSync(
      'spotifyCredentials.json',
      JSON.stringify(credentials, null, 4)
    );
  });
}

// async function getSingleTracks(trackIds) {
//   trackIds.forEach(id => {
//     // Query spotify for track
//     const track = await app.get(`https://api.spotify.com/v1/tracks/${id}`);
//   });
// }

function getTracksFromAlbums() {}

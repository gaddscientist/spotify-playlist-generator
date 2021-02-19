/**
 * Reddit API functionality
 */

'use strict';
const credentials = require('../../redditCredentials.json');
const snoowrap = require('snoowrap');
const reddit = new snoowrap(credentials);

// Returns array of subreddits in a given multireddit
async function getSubsFromMulti(user, multireddit) {
  const subs = []; // Subreddits
  await reddit
    .getUser(user)
    .getMultireddits() // Gets all multireddits from a given user
    .then(multis => {
      // Gets specified multireddit
      const multi = multis.filter(
        multi => multi.display_name === multireddit
      )[0];

      multi.subreddits.forEach(sub => subs.push(sub.display_name));
    });

  return subs;
}

// Returns array of JSON objects for spotify submissions
async function getSpotifySubmissionsFromSub(
  subreddit,
  pages,
  sort,
  time,
  upvotes
) {
  const pageSize = 25;
  const numPages = pages * pageSize;
  let results;

  // Gets all submissions based on sort type
  if (sort === 'hot') {
    results = await reddit
      .getSubreddit(subreddit)
      .getHot({ limit: numPages, count: numPages });
  } else if (sort === 'top') {
    results = await reddit
      .getSubreddit(subreddit)
      .getTop({ limit: numPages, count: numPages, time: time });
  } else if (sort === 'new') {
    results = await reddit
      .getSubreddit(subreddit)
      .getNew({ limit: numPages, count: numPages });
  } else if (sort === 'rising') {
    results = await reddit
      .getSubreddit(subreddit)
      .getRising({ limit: numPages, count: numPages });
  }

  // Filters out non-spotify submissions
  const filteredResults = results.filter(
    result => result.domain === 'open.spotify.com' && result.ups >= upvotes
  );
  // filteredResults.forEach(result => console.log(result.title, result.ups));

  // Sorts reddit posts based on upvote count(descending)
  const sortedResults = filteredResults.sort((a, b) =>
    a.ups < b.ups ? 1 : -1
  );
  sortedResults.forEach(result => console.log(result.title, result.ups));

  return processResults(sortedResults);
}

// Returns array of reddit submissions to a given multireddit
async function getSpotifySubmissionsFromMulti(user, multi, sort, top, upvotes) {
  // List of subreddits in a multireddit
  const subs = await getSubsFromMulti(user, multi);

  // Returns an array of submissions for each subreddit when all promises resolve
  const results = await Promise.all(
    subs.map(
      async sub =>
        await getSpotifySubmissionsFromSub(sub, 4, sort, top, upvotes)
    )
  );

  return processResults(results, 'multireddit');
}

// Organizes reddit submissions into lists for each type(track/album/playlist)
function processResults(results, redditType = 'subreddit') {
  const links = { tracks: [], albums: [], playlists: [] };

  if (redditType === 'multireddit') {
    // Flattens objects from each subreddit into one object
    results.forEach(result => {
      links.tracks = [...links.tracks, ...result.tracks];
      links.albums = [...links.albums, ...result.albums];
      links.playlists = [...links.playlists, ...result.playlists];
    });
  } else {
    // Returns array of urls from each submission
    const urls = results.map(item => item.url);

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
  }

  // Filters out possible duplicates
  links.tracks = [...new Set(links.tracks)];
  links.albums = [...new Set(links.albums)];
  links.playlists = [...new Set(links.playlists)];

  return links;
}

export { getSpotifySubmissionsFromSub, getSpotifySubmissionsFromMulti };

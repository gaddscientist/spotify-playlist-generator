/**
 * Reddit API functionality for back end
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
async function getSpotifySubmissionsFromSub(subreddit, pages, sort, time) {
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
  return results.filter(
    result =>
      result.secure_media !== null &&
      result.secure_media.type === 'open.spotify.com'
  );
}

// Returns array of reddit submissions to a given multireddit
async function getSpotifySubmissionsFromMulti(user, multi, sort, top) {
  // List of subreddits in a multireddit
  const subs = await getSubsFromMulti(user, multi);

  // Returns an array of submissions for each subreddit when all promises resolve
  return Promise.all(
    subs.map(async sub => await getSpotifySubmissionsFromSub(sub, 4, sort, top))
  );
}

// SAME FUNCTION ON FRONT END
// Merges objects of submissions from each subreddit into one object
function organizeResults(results) {
  let organizedResults = {};
  results.forEach(result => {
    organizedResults = { ...organizedResults, ...result };
  });
  return organizedResults;
}

export {
  getSpotifySubmissionsFromSub,
  getSpotifySubmissionsFromMulti,
  organizeResults,
};

'use strict';
const credentials = require('../../credentials.json');
const snoowrap = require('snoowrap');
const reddit = new snoowrap(credentials);

// Returns array of subreddits in a given multireddit
async function getSubsFromMulti(user, multireddit) {
  const subs = [];
  await reddit
    .getUser(user)
    .getMultireddits()
    .then(multis => {
      const multi = multis.filter(
        multi => multi.display_name === multireddit
      )[0];

      multi.subreddits.forEach(sub => subs.push(sub.display_name));
    });
  return subs;
}

// Returns object of (key)post title => (value)spotify url
async function getSpotifySubmissionsFromSub(subreddit, pages, sort, time) {
  const pageSize = 25;
  const numPages = pages * pageSize;
  const submissions = {};
  let results;

  if (sort === 'hot') {
    results = reddit
      .getSubreddit(subreddit)
      .getHot({ limit: numPages, count: numPages });
  } else if (sort === 'top') {
    results = reddit
      .getSubreddit(subreddit)
      .getTop({ limit: numPages, count: numPages, time: time });
  } else if (sort === 'new') {
    results = reddit
      .getSubreddit(subreddit)
      .getNew({ limit: numPages, count: numPages });
  } else if (sort === 'rising') {
    results = reddit
      .getSubreddit(subreddit)
      .getRising({ limit: numPages, count: numPages });
  }

  results
    .then(listing => {
      listing.forEach(submission => {
        if (
          submission.secure_media !== null &&
          submission.secure_media.type === 'open.spotify.com'
        ) {
          submissions[submission.title] = submission.url;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });

  return submissions;
}

async function getSpotifySubmissionsFromMulti(user, multi, sort, top) {
  let submissions = [];
  const subs = await getSubsFromMulti(user, multi);

  await Promise.allSettled(
    subs.map(async sub => {
      const subms = await getSpotifySubmissionsFromSub(sub, 4, sort, top);
      submissions.push(subms);
    })
  );

  return submissions;
}

// Merges objects of submissions from each subreddit into one object
function organizeResults(results) {
  let organizedResults = {};
  results.forEach(result => {
    organizedResults = { ...organizedResults, ...result };
  });
  return organizedResults;
}

// Testing

export { getSpotifySubmissionsFromMulti, organizeResults };

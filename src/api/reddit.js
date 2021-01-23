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
async function getSpotifySubmissionsFromSub(subreddit, pages) {
  const pageSize = 25;
  const numPages = pages * pageSize;
  const submissions = {};

  reddit
    .getSubreddit(subreddit)
    .getHot({ limit: numPages, count: numPages })
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

async function getSpotifySubmissionsFromMulti(user, multi) {
  let submissions = [];
  const subs = await getSubsFromMulti(user, multi);

  await Promise.allSettled(
    subs.map(async sub => {
      const subms = await getSpotifySubmissionsFromSub(sub, 4);
      submissions.push(subms);
    })
  );

  return submissions;
}

let results;
getSpotifySubmissionsFromMulti('N0_FREE_REFILLS', 'hiphop').then(
  subms => (results = subms)
);
setTimeout(() => {
  console.log(results);
}, 3000);

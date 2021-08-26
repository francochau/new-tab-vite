import axios from 'axios';

export const getRedditPosts = async (subreddit, sorting) => {
  const url =
    subreddit && sorting
      ? `https://www.reddit.com/r/${subreddit}/${sorting}/.json`
      : 'https://www.reddit.com/.json';

  const { data } = await axios.get(url);
  return data.data.children;
};

export const getSubredditSearch = async (subreddit) => {
  const { data } = await axios.get(
    `https://www.reddit.com/subreddits/search.json?q=${subreddit}`
  );
  return data.data.children;
};

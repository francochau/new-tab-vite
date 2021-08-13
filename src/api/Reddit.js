import axios from 'axios';

export const getRedditPosts = async (subreddit, sorting) => {
  const url =
    subreddit && sorting
      ? `https://www.reddit.com/r/${subreddit}/${sorting}/.json`
      : 'https://www.reddit.com/.json';

  const { data } = await axios.get(url);
  return data.data.children;
};
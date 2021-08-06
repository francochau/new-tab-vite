import axios from 'axios';
import { useQuery } from 'react-query';

const getRedditPosts = async (subreddit, sorting) => {
  const url =
    subreddit && sorting
      ? `https://www.reddit.com/r/${subreddit}/${sorting}/.json`
      : 'https://www.reddit.com/.json';

  const { data } = await axios.get(url);
  return data.data.children;
};

export const useRedditPosts = (subreddit, sorting) => {
  // isPreviousData ??= true;
  return useQuery(
    ['redditPosts', subreddit, sorting],
    () => getRedditPosts(subreddit, sorting),
    {
      // initialData: getRedditPosts(subreddit, sorting),
      // keepPreviousData: isPreviousData ? true : false,
      keepPreviousData: true,
      // placeholderData:[{ data: {title:'asd',permalink:''}}],
      refetchOnReconnect: 'always',
      // refetchOnMount: 'always',
    }
  );
};

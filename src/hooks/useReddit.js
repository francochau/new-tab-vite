import { useQuery } from 'react-query';
import * as reddit from '../api/Reddit';

export const useRedditPosts = (subreddit, sorting) => {
  // isPreviousData ??= true;
  return useQuery(
    ['redditPosts', subreddit, sorting],
    () => reddit.getRedditPosts(subreddit, sorting),
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

export const useSubredditSearch = (subreddit) => {
  return useQuery(
    ['subredditSearch', subreddit],
    () => reddit.getSubredditSearch(subreddit),
    {
      enabled: !!subreddit,
      cacheTime: 0
    }
  );
};

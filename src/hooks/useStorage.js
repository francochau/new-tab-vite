import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../utils/ReactQuery';
import * as storage from '../api/Storage';

export const useWidgets = (position) => {
    return useQuery(`widgets`, () => storage.getWidgets(position), {
      placeholderData: storage.defaultWidgetsList,
    });
  };
  
  export const useSetWidgets = () => {
    return useMutation({
      mutationFn: ({ position, settings }) => storage.setWidgets(position, settings),
      // onMutate: () => {
      //   queryClient.setQueryData('subRedditList');
      // },
      onSettled: () => queryClient.invalidateQueries('widgets'),
    });
  };
  
  
  export const useConfigs = (key) => {
    return useQuery(`configs`, () => storage.getConfigs(key), {
      // ...queryConfig,
      keepPreviousData: true,
    });
  };
  
  export const useSetConfigs = () => {
    return useMutation({
      mutationFn: ({ key, settings }) => storage.setConfigs(key, settings),
      // onMutate: () => {
      //   if (key=='1') { }
      // },
      onSuccess: () => queryClient.invalidateQueries('configs'),
    });
  };
  
  export const useSubredditList = () => {
    return useQuery('subredditList', () => storage.getSubredditList(), {
      placeholderData: storage.defaultSubredditList,
    //   ...queryConfig,
    });
  };
  
  export const useAddSubreddit = () => {
    return useMutation({
      mutationFn: (subreddit) => storage.addSubreddit(subreddit),
      // onMutate: () => {
      //   queryClient.setQueryData('subRedditList');
      // },
      onSuccess: () => queryClient.invalidateQueries('subredditList'),
    });
  };
  
  export const useRemoveSubreddit = () => {
    return useMutation({
      mutationFn: (subreddit) => storage.removeSubreddit(subreddit),
      // onMutate: () => {r
      //   queryClient.setQueryData('subRedditList');
      // },
      onSuccess: () => queryClient.invalidateQueries('subredditList'),
    });
  };
  
  export const useFavSubreddit = () => {
    return useMutation({
      mutationFn: (subreddit) => storage.favSubreddit(subreddit),
      // onMutate: () => {
      //   queryClient.setQueryData('subRedditList');
      // },
      onSuccess: () => queryClient.invalidateQueries('subredditList'),
    });
  };
  
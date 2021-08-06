import browser from 'webextension-polyfill';
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../utils/ReactQuery';

const queryConfig = { cacheTime: 1 };

const defaultSubredditList = [
  { subreddit: 'Cryptocurrency', fav: true },
  { subreddit: 'News', fav: false },
  { subreddit: 'Tree', fav: false },
  { subreddit: 'Reactjs', fav: false },
];

const defaultConfigs = {
  theme: 'theme4',
  location: '',
  'location-en': '',
  'location-lat': '',
  'location-long': '',
};

const defaultWidgetsList = {
  left: { sorting: 'hot', src: 'News', type: 'reddit' },
  right: { sorting: 'rising', src: 'Cryptocurrency', type: 'reddit' },
};


export const getSubredditList = async () => {
  const { subredditList } = await browser.storage.sync.get('subredditList');

  if (subredditList == undefined) {
    await browser.storage.sync.set({
      subredditList: defaultSubredditList,
    });
    return defaultSubredditList;
    // queryClient.invalidateQueries('subredditList');
  }

  return subredditList;
};

export const favSubreddit = async (index) => {
  var subredditList = queryClient.getQueryData('subredditList');

  // subredditList.map((e) => {
  //   e.subreddit === subredditName ? (e.fav = !e.fav) : '';
  // });
  subredditList[index].fav = !subredditList[index].fav;

  if (subredditList[index].fav === true) {
    subredditList.unshift(subredditList.splice(index, 1)[0]);
  } else {
    subredditList.push(subredditList.splice(index, 1)[0]);
  }

  // subredditList.unshift(subredditList.splice(index, 1)[0]);

  await browser.storage.sync.set({
    subredditList: subredditList,
  });
};

export const addSubreddit = async (subredditName) => {
  var subredditList = queryClient.getQueryData('subredditList');
  const subredditItem = { subreddit: subredditName, fav: false };
  subredditList.push(subredditItem);

  await browser.storage.sync.set({
    subredditList: subredditList,
  });
};

export const removeSubreddit = async (index) => {
  var subredditList = queryClient.getQueryData('subredditList');
  subredditList.splice(index, 1);
  // subredditList = subredditList.filter((e) => e.subreddit !== subredditName);

  await browser.storage.sync.set({
    subredditList: subredditList,
  });
};

export const getWidgets = async (position) => {
  const { widgets } = await browser.storage.sync.get('widgets');

  if (widgets == undefined) {
    await browser.storage.sync.set({
      widgets: defaultWidgetsList,
    });
    return position ? defaultWidgetsList[position] : defaultWidgetsList;
    // queryClient.invalidateQueries('widgets');
  }

  return position ? widgets[position] : widgets;
};

export const setWidgets = async (position, settings) => {
  var widgets = await getWidgets();
  widgets[position] = { ...widgets[position], ...settings };
  console.log(widgets, position, settings);
  await browser.storage.sync.set({ widgets: widgets });
};

export const useWidgets = (position) => {
  return useQuery(`widgets`, () => getWidgets(position), {
    placeholderData: defaultWidgetsList,
    ...queryConfig,
  });
};

export const useSetWidgets = () => {
  return useMutation({
    mutationFn: ({ position, settings }) => setWidgets(position, settings),
    // onMutate: () => {
    //   queryClient.setQueryData('subRedditList');
    // },
    onSettled: () => queryClient.invalidateQueries('widgets'),
  });
};

export const getConfigs = async (key) => {
  const { configs } = await browser.storage.sync.get('configs');

  if (configs == undefined) {
    await browser.storage.sync.set({
      configs: defaultConfigs,
    });
    return key ? defaultConfigs[key] : defaultConfigs;
  }
  // queryClient.invalidateQueries('widgets');
  return key ? configs[key] : configs;
};

export const setConfigs = async (key, settings) => {
  console.log(settings)
  var configs = await getConfigs();
  configs[key] = settings;
  console.log(configs)
  await browser.storage.sync.set({ configs: configs });
};

export const useConfigs = (key) => {
  return useQuery(`configs`, () => getConfigs(key), {
    // ...queryConfig,
  });
};

export const useSetConfigs = () => {
  return useMutation({
    mutationFn: ({key, settings}) => setConfigs(key, settings),
    // onMutate: () => {
    //   queryClient.setQueryData('subRedditList');
    // },
    onSuccess: () => queryClient.invalidateQueries('configs'),
  });
};

export const useSubredditList = () => {
  return useQuery('subredditList', () => getSubredditList(), {
    placeholderData: defaultSubredditList,
    ...queryConfig,
  });
};

export const useAddSubreddit = () => {
  return useMutation({
    mutationFn: (subreddit) => addSubreddit(subreddit),
    // onMutate: () => {
    //   queryClient.setQueryData('subRedditList');
    // },
    onSuccess: () => queryClient.invalidateQueries('subredditList'),
  });
};

export const useRemoveSubreddit = () => {
  return useMutation({
    mutationFn: (subreddit) => removeSubreddit(subreddit),
    // onMutate: () => {r
    //   queryClient.setQueryData('subRedditList');
    // },
    onSuccess: () => queryClient.invalidateQueries('subredditList'),
  });
};

export const useFavSubreddit = () => {
  return useMutation({
    mutationFn: (subreddit) => favSubreddit(subreddit),
    // onMutate: () => {
    //   queryClient.setQueryData('subRedditList');
    // },
    onSuccess: () => queryClient.invalidateQueries('subredditList'),
  });
};

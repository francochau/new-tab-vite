import browser from 'webextension-polyfill';
import { queryClient } from '../utils/ReactQuery';

export const defaultSubredditList = [
  { subreddit: 'GlobalNews', fav: false },
  { subreddit: 'selfimprovement', fav: false },
  { subreddit: 'CryptoCurrency', fav: false },
  { subreddit: 'Books', fav: false },

];

export const defaultConfigs = {
  theme: 'theme1',
  apiKey: '',
  showSeconds: false,
  timeFormat: '12hr',
  temperatureUnit: 'C',
  welcome: true
};

export const defaultWidgetsList = {
  left: { sorting: 'hot', src: '', type: 'reddit' },
  right: { sorting: 'hot', src: 'GlobalNews', type: 'reddit' },
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

  subredditList[index].fav = !subredditList[index].fav;

  if (subredditList[index].fav === true) {
    subredditList.unshift(subredditList.splice(index, 1)[0]);
  } else {
    subredditList.push(subredditList.splice(index, 1)[0]);
  }
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
  }

  return position ? widgets[position] : widgets;
};

export const setWidgets = async (position, settings) => {
  var widgets = await getWidgets();
  widgets[position] = { ...widgets[position], ...settings };
  await browser.storage.sync.set({ widgets: widgets });
};

export const getConfigs = async (key) => {
  const { configs } = await browser.storage.sync.get('configs');

  if (configs == undefined) {
    await browser.storage.sync.set({
      configs: defaultConfigs,
    });
    return key ? defaultConfigs[key] : defaultConfigs;
  }
  return key ? configs[key] : configs;
};

export const setConfigs = async (key, settings) => {
  var configs = await getConfigs();
  configs[key] = settings;
  await browser.storage.sync.set({ configs: configs });
};

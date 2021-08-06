import axios from 'axios';
import { useQuery } from 'react-query';
// import { queryClient } from '../../main';

const key = 'aeee45d8d84c5345e753714ba560babe';
const location = 'Hong Kong';

export const getLocationKey = async (location) => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`
  );
  location = data[0];
  return location;
};

export const getCurrentCondition = async (location) => {
  // .local_names.en
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
  );
  return data;
};

export const getWeatherForecasts = async (location) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${key}&units=standard`
  );
  return data.daily;
};

export const useCurrentCondition = (location) => {
  // console.log(queryClient.getQueryData('currentCondition'));

  return useQuery('currentCondition', () => getCurrentCondition(location), {
    keepPreviousData: true,
    refetchOnReconnect: 'always',
    // initialData:
    // () => {
    //   return queryClient.getQueryData('currentCondition');
    // },
    // initialDataUpdatedAt: () =>
    //   queryClient.getQueryState('currentCondition')?.dataUpdatedAt,
    // refetchOnReconnect: true,
  });
};

export const useWeatherForecasts = (location) => {
  return useQuery('weatherForecasts', () => getWeatherForecasts(location), {
    keepPreviousData: true,
    refetchOnReconnect: 'always',
    // initialData: () => {
    //   return queryClient.getQueryData('weatherForecasts');
    // },
    // initialDataUpdatedAt: () =>
    //   queryClient.getQueryState('weatherForecasts')?.dataUpdatedAt,
    // refetchOnReconnect: true,
  });
};

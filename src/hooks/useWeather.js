import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../utils/ReactQuery';
import * as weather from '../api/Weather';

export const useGeolocation = () => {
  return useQuery('geolocation', () => weather.getGeolocation(), {});
};

export const useSetGeolocation = () => {
  return useMutation({
    mutationFn: ({ location = "", reverse = false, lat = 0, lon = 0 } = {}) =>
      weather.setGeolocation({
        location: location,
        reverse: reverse,
        lat: lat,
        lon: lon,
      }),
    // onMutate: () => {
    //   if (key=='1') { }
    // },
    onSuccess: () => {
      queryClient.invalidateQueries('geolocation');
      queryClient.invalidateQueries('currentCondition');
      queryClient.invalidateQueries('weatherForecasts');
    },
  });
};

export const useCurrentCondition = (location) => {
  return useQuery(
    ['currentCondition',location],
    () => weather.getCurrentCondition(location),
    {
      keepPreviousData: true,
      refetchOnReconnect: 'always',
      enabled:!!location
    }
  );
};

export const useWeatherForecasts = (location) => {
  return useQuery(
    ['weatherForecasts',location],
    () => weather.getWeatherForecasts(location),
    {
      keepPreviousData: true,
      refetchOnReconnect: 'always',
      enabled:!!location
    }
  );
};

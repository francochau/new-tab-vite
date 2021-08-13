import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../utils/ReactQuery';
import * as weather from '../api/Weather';

export const useGeolocation = () => {
  return useQuery('geolocation', () => weather.getGeolocation(), {});
};

export const useSetGeolocation = () => {
  return useMutation({
    mutationFn: (location) => weather.setGeolocation(location),
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
    ['currentCondition'],
    () => weather.getCurrentCondition(location),
    {
      keepPreviousData: true,
      refetchOnReconnect: 'always',
    }
  );
};

export const useWeatherForecasts = (location) => {
  return useQuery(
    ['weatherForecasts'],
    () => weather.getWeatherForecasts(location),
    {
      keepPreviousData: true,
      refetchOnReconnect: 'always',
    }
  );
};

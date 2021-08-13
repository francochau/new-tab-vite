import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import {
  useCurrentCondition,
  useGeolocation,
  useWeatherForecasts,
} from '../../hooks/useWeather';

const Weather = () => {
  // var res;
  // var forecastRes;

  // const geolocationRes = useGeolocation();
  // if (geolocationRes.data) {
  const res = useCurrentCondition(
    // geolocationRes.data?.name
  );
  const forecastRes = useWeatherForecasts(
    // {
    // lon: geolocationRes.data?.lon,
    // lat: geolocationRes.data?.lat,
    // }
  );
  // }

  if (res.isLoading || forecastRes.isLoading) return 'Loading...';
  if (res.error || forecastRes.error)
    return 'An error has occurred: ' + res.error + forecastRes.error;
  // useEffect(() => {
  // const location = 'Hong Kong';
  // getLocationKey(location).then((location) => {
  //   getCurrentCondition(location);
  //   getWeatherForecasts(location);
  // });
  // }, []);

  return (
    <div className='inline-flex'>
      <WeatherIcon forecast={res.data} now={true} />
      {forecastRes &&
        forecastRes.data
          .slice(1, 5)
          .map((e, index) => (
            <WeatherIcon forecast={e} now={false} key={index} />
          ))}
    </div>
  );
};

export default Weather;

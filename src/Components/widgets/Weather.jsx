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
  // useEffect(async() => {
  //   const location = await getGeolocation();
  // }, []);
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   console.log("Latitude is :", position.coords.latitude);
  //   console.log("Longitude is :", position.coords.longitude);
  //   });

  // }, []);
  const geolocationRes = useGeolocation();
  // if (geolocationRes.data) {

  const res = useCurrentCondition(geolocationRes.data);
  // geolocationRes.data?.name
  const forecastRes = useWeatherForecasts(geolocationRes.data);
  // {
  // lon: geolocationRes.data?.lon,
  // lat: geolocationRes.data?.lat,
  // }
  // }

  if (res.isLoading || forecastRes.isLoading || !res.data || !forecastRes.data) return 'Loading...';
  if (res.error || forecastRes.error)
    return 'An error has occurred: ' + res.error + forecastRes.error;

  return (
    <div className='inline-flex'>
      <WeatherIcon forecast={res.data} now={true} />
      {forecastRes.data &&
        forecastRes.data
          ?.slice(1, 5)
          .map((e, index) => (
            <WeatherIcon forecast={e} now={false} key={index} />
          ))}
    </div>
  );
};

export default Weather;

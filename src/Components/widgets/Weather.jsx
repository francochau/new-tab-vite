import React, { useState, useEffect, useRef } from 'react';
import WeatherIcon from './WeatherIcon';
import {
  useSetGeolocation,
  useCurrentCondition,
  useGeolocation,
  useWeatherForecasts,
} from '../../hooks/useWeather';

import { SearchIcon } from '@heroicons/react/outline';

const Weather = () => {
  const locationRef = useRef(null);
  const geolocationRes = useGeolocation();
  const res = useCurrentCondition(geolocationRes.data);
  const forecastRes = useWeatherForecasts(geolocationRes.data);
  const setGeolocation = useSetGeolocation();

  if (res.isLoading || forecastRes.isLoading || geolocationRes.isLoading)
    return <div></div>;
  if (!geolocationRes.data)
    return (
      <div className='text-lg mt-5  backdrop-filter backdrop-blur-xl rounded-lg px-14 py-10'>
        Enter the name of your city
        <input
          ref={locationRef}
          type='text'
          name='location'
          id='location'
          className='inline-block w-32 px-0 border-0 border-b h-5 border-white bg-transparent ml-2 mr-3 focus:border-white focus:ring-0 text-base'
          placeholder='here'
          autoComplete='off'
        />
        <SearchIcon
          className='w-5 h-5 inline-block mb-1 cursor-pointer'
          onClick={() =>
            setGeolocation.mutate({
              location: locationRef?.current?.value,
            })
          }
        />
        <p>
          <span>or </span>
          <span
            className='text-indigo-200 cursor-pointer'
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setGeolocation.mutate({
                    reverse: true,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                  });
                },
                (e) => console.log(e)
              );
            }}
          >
            enable auto geolocation
          </span>{' '}
          for the weather widget.
        </p>
      </div>
    );
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

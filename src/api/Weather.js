import axios from 'axios';
import browser from 'webextension-polyfill';

const key = 'aeee45d8d84c5345e753714ba560babe';
const location = 'Hong Kong';

export const defaultGeolocation = {
  name: 'Hong Kong',
  lat: 22.2855,
  lon: 114.1577,
};

export const getGeolocation = async () => {
  const { geolocation } = await browser.storage.sync.get('geolocation');
  return geolocation;
};

export const setGeolocation = async ({
  location = '',
  reverse = false,
  lat = 0,
  lon = 0,
} = {}) => {
  const query = reverse ? `lat=${lat}&lon=${lon}` : `q=${location}`;

  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/${
      reverse ? 'reverse' : 'direct'
    }?${query}&limit=1&appid=${key}`
  );
  const geolocation = data[0];
  if (!geolocation) throw new Error( 'Location not found' );
  geolocation && (await browser.storage.sync.set({ geolocation: geolocation }));
};

export const getCurrentCondition = async (location) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=${key}`
  );
  return data;
};

export const getWeatherForecasts = async (location) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${key}&units=standard`
  );
  return data.daily;
};

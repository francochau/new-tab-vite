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

  if (geolocation == undefined) {
    await browser.storage.sync.set({
      geolocation: defaultGeolocation,
    });
    return defaultGeolocation;
  }

  // if (!geolocation.name) {
  // }

  return geolocation;
};

export const setGeolocation = async (location) => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`
  );
  const geolocation = data[0];
  if (!geolocation) throw 'Location not found';
  geolocation && (await browser.storage.sync.set({ geolocation: geolocation }));
};

// export const getLocationKey = async (location) => {
//   const { data } = await axios.get(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`
//   );
//   location = data[0];
//   return location;
// };

export const getCurrentCondition = async () => {
  const location = await getGeolocation();
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=${key}`
  );
  return data;
};

export const getWeatherForecasts = async () => {
  const location = await getGeolocation();
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${key}&units=standard`
  );
  return data.daily;
};

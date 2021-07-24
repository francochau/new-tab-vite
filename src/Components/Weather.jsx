import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';

const Weather = () => {
  // const [location, setLocation] = useState({});
  const [forecasts, setForcasts] = useState([]);
  const [condition, setCondition] = useState({});

  // const key = '8mOlWPCfcLKzwgpAMHXuZCX9IGXbpX7n';
  const key = 'aeee45d8d84c5345e753714ba560babe';

  const getLocationKey = async (location) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`
    );
    location = data[0];
    return location;
  };

  const getCurrentCondition = async (location) => {
    const { data } = await axios.get(
      // `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=${key}`
      `https://api.openweathermap.org/data/2.5/weather?q=${location.local_names.en}&appid=${key}`
    );
    console.log(data);
    setCondition(data);
  };

  const getWeatherForecasts = async (location) => {
    const { data } = await axios.get(
      // `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.Key}?apikey=${key}`
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${key}&units=standard`
    );

    // data.list.map((e) =>
    //   // var key = mappedDay[dayjs.unix(e.dt).format('DDMMYYYY')]
    //   {
    //     if (!mappedDay[dayjs.unix(e.dt).format('DDMMYYYY')]) {
    //       mappedDay[dayjs.unix(e.dt).format('DDMMYYYY')] = [];
    //     }
    //     return mappedDay[dayjs.unix(e.dt).format('DDMMYYYY')].push(e);
    //   }
    // );
    // // console.log(mappedDay);

    // for (let [key, value] of Object.entries(mappedDay)) {
    //   console.log(value);
    //   var minTemp =
    //     value.map((e) => e.main.temp_min).reduce((a, b) => a + b, 0) /
    //     value.length;
    //   var maxTemp =
    //     value.map((e) => e.main.temp_max).reduce((a, b) => a + b, 0) /
    //     value.length;
    //   var dt = value[0].dt;
    //   var weather = value[0].weather;
    //   // var minTemp = value.map((e) => e.main.temp_min).sum() / value.length;
    //   // console.log(dailyForecasts.push(value.map((e) => e.main.temp_min)));
    //   // value.map((e) => dailyForecasts.push({ minTemp: e.main.temp_min }))
    //   dailyForecasts.push({ minTemp, maxTemp, weather, dt });
    // }
    console.log(data.daily);
    // dailyForecasts = dailyForecasts.slice(1);
    setForcasts(data.daily.slice(1, 5));
  };

  useEffect(() => {
    const location = 'Hong Kong';
    getLocationKey(location).then((location) => {
      getCurrentCondition(location);
      getWeatherForecasts(location);
    });
  }, []);

  return (
    <div style={{ display: 'inline-flex' }}>
      <WeatherWidget forecast={condition} now={true} />
      {forecasts.map((e, index) => (
        <WeatherWidget forecast={e} now={false} key={index} />
      ))}
      {/* {JSON.stringify(forecasts)} */}
    </div>
  );
};

export default Weather;

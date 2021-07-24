import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiShowers,
  WiThunderstorm,
  WiRain,
  WiSnowflakeCold,
} from 'weather-icons-react';

const WeatherWidget = (props) => {
  function getIcon(now) {
    const icon = props.forecast.weather ? props.forecast.weather[0].id : 0;
    switch (true) {
      case icon === 800:
        return <WiDaySunny size={100} />;

      case icon > 800:
        return <WiCloudy size={100} />;

      case icon > 700:
        return <WiFog size={100} />;

      case icon > 600:
        return <WiSnowflakeCold size={100} />;

      case icon > 500:
        return <WiRain size={100} />;
      case icon > 300:
        return <WiShowers size={100} />;
      case icon > 200:
        return <WiThunderstorm size={100} />;

      default:
        return <WiCloudy size={100} />;
    }
  }

  // function getDate() {
  //   return props.forecast.dt.split('T')[0];
  // }
  function convertStandardTemp(temperature) {
    return Math.round(temperature - 273.15);
  }

  return (
    <div style={{ margin: '1.5em', textAlign: 'center', fontSize: '1rem' }}>
      <div>{getIcon(props.now)}</div>
      {props.forecast.main && props.now === true ? (
        <div>
          <span style={{ fontWeight: '600' }}>
            {convertStandardTemp(props.forecast.main.temp)}
          </span>
        </div>
      ) : null}
      {props.now === false ? (
        <div>
          <span style={{ fontWeight: '600' }}>
            {convertStandardTemp(props.forecast.temp.max)}
          </span>
          <span
            style={{ marginLeft: '0.5em', fontWeight: '300', opacity: '0.8' }}
          >
            {convertStandardTemp(props.forecast.temp.min)}
          </span>
        </div>
      ) : null}
      <div>
        {props.now ? 'Now' : dayjs.unix(props.forecast.dt).format('dddd')}
      </div>

      {/* 3||4 WiDaySunnyOvercast 5 WiDayHaze 6||20||21 WiDayCloudy 7||8||19
      WiCloudy 8 WiCloudy 11 WiFog 12 WiShowers 13||14 WiDayShowers 15
      WiThunderstorm 16||17 WiDayThunderstorm 18 WiRain 22||23||26||29 WiSnow
      24||25||31 WiSnowflakeCold 30 WiHot 32 WiStrongWind 33||34 WiNightClear
      35||36||37||38 WiNightCloudy 39||40 WiNightShowers 41||42
      WiNightAltStormShowers 43||44 WiNightSnow */}
    </div>
  );
};

WeatherWidget.propTypes = {
  forecast: PropTypes.object.isRequired,
  now: PropTypes.bool.isRequired,
};

export default WeatherWidget;

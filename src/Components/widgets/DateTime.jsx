import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useConfigs } from '../../hooks/useStorage';

const DateTime = () => {
  const configs = useConfigs();
  const [date, setDate] = useState(dayjs(new Date()));
  useEffect(() => {
    window.setInterval(function () {
      setDate(dayjs(new Date()));
    }, 100);
  }, []);

  if (!configs.data) return <div></div>;

  return (
    <div className='text-center'>
      <div>
        <span className='xl:text-9xl md:text-8xl h-sm:text-7xl text-7xl font-extralight whitespace-nowrap'>
          {date.format(
            `${configs.data.timeFormat === '12hr' ? 'hh' : 'HH'} mm ${
              configs.data.showSeconds ? 'ss' : ''
            } `
          )}
        </span>
        {configs.data.timeFormat === '12hr' && (
          <span className='xl:text-7xl md:text-6xl h-sm:text-5xl text-5xl font-extralight whitespace-nowrap'>
            {date.format('A')}
          </span>
        )}
      </div>
      <div>
        <span className='text-opacity-60 text-gray-50 text-base'>
          {date.format('dddd, MMMM DD')}
        </span>
      </div>
    </div>
  );
};

export default DateTime;

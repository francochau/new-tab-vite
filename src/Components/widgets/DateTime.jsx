import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const DateTime = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  useEffect(() => {
    window.setInterval(function () {
      setDate(dayjs(new Date()));
    }, 100);
  },[]);

  return (
    <div className='text-center' >
      <div>
        <span className="xl:text-9xl md:text-8xl h-sm:text-7xl text-7xl font-extralight whitespace-nowrap">{date.format('HH mm ss')}</span>
      </div>
      <div>
        <span className='text-opacity-60 text-gray-50 text-base'>{date.format('dddd, MMMM DD')}</span>
      </div>
    </div>
  );
};

export default DateTime;

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const DateTime = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  useEffect(() => {
    window.setInterval(function () {
      setDate(dayjs(new Date()));
    }, 100);
  },[]);

  const timeStyle = {
    fontSize: '8rem',
    fontWeight: '200',
  };

  const dateStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 250, 250, 0.5)',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <span style={timeStyle}>{date.format('HH mm ss')}</span>
      </div>
      <div>
        <span style={dateStyle}>{date.format('dddd, MMMM DD')}</span>
      </div>
    </div>
  );
};

export default DateTime;

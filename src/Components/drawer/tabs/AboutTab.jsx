import React, { useState } from 'react';
import ProfilePic from '../../../assets/profilepic.png';
import Github from '../../../assets/Github.svg';
import Instagram from '../../../assets/Instagram.svg';

function AboutTab() {
  const [showAddresses, setShowAddresses] = useState(false);
  return (
    <div>
      <div className='flex items-center'>
        <div>
          <img
            className='inline-block h-16 w-16 rounded-full'
            src={ProfilePic}
            alt=''
          />
        </div>
        <div className='ml-3'>
          <p className='text-base font-medium text-gray-700 group-hover:text-gray-900 flex items-center space-x-2'>
            <span>Franco Chau</span>
            <img
              className='inline-block h-5 w-5 rounded-full cursor-pointer'
              src={Github}
              alt=''
              onClick={() => {
                window.open(`https://github.com/francochau`, '_blank');
              }}
            />
            <img
              className='inline-block h-5 w-5 rounded-full cursor-pointer'
              src={Instagram}
              alt=''
              onClick={() => {
                window.open(`https://www.instagram.com/fukochau/`, '_blank');
              }}
            />
          </p>
          <p className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
            Frontend Developer, Hong Kong
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <p
          className='cursor-pointer text-indigo-600'
          onClick={() => {
            window.open(`mailto:asaextension@gmail.com`, '_blank');
          }}
        >
          Report an issue
        </p>
        <p
          className='cursor-pointer text-indigo-600'
          onClick={() => {
            setShowAddresses(!showAddresses);
          }}
        >
          Like this extension? Support me with crypto {':)'}
        </p>
        {showAddresses && (
          <div className='flex flex-col max-w-2xl break-words space-y-2 mt-2'>
            <span>ETH: 0x7E19Ed64CEAB153E609F67313Ac9A9103c7fDfa5</span>
            <span>
              ADA:
              addr1qy8h98ycj9xewxgxp8mf692h4ldaewn5ufw30hh0mu3p85sgerwmxygy7q0parer0mpyr20qgde37zsu0etrxmpzgzes9u655c
            </span>
            <span>
              XMR:
              46yYzra7Pp3KzGYVu6Ssqg6dgAr53yTiUg8ug1f8tRdHcqyUmeCkZZQ1q91dsA3yf9ZFC8L3AWBFPhTcvBGJBZMtP8KdBYW
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutTab;

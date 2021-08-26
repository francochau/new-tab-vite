import React from 'react';
import ProfilePic from '../../../assets/profilepic.png';

function AboutTab() {
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
          <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
            Franco Chau
          </p>
          <p className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
            Frontend Developer, Hong Kong
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutTab;

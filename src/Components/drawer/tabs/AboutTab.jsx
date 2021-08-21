import React from 'react';

function AboutTab() {
  return (
    <div>
      <div className='flex items-center'>
        <div>
          <img
            className='inline-block h-16 w-16 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
        </div>
        <div className='ml-3'>
          <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
            Tom Cook
          </p>
          <p className='text font-medium text-gray-500 group-hover:text-gray-700'>
            View profile
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutTab;

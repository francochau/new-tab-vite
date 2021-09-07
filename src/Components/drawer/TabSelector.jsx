import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/Logo.svg';

function TabSelector(props) {
  return (
    <div className=''>
      <div className='border-b border-gray-200 mb-5 flex'>
        <img src={Logo} alt='' className='h-10 w-10 inline-block mr-5' />
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {props.tabs.map((tab, index) => (
            <div
              key={tab.name}
              className={`${
                props.currentTab === index
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
                'group cursor-pointer inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm'
              `}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => {
                props.setCurrentTab(index);
              }}
            >
              <tab.icon
                className={`
                  ${
                    props.currentTab == index
                      ? 'text-indigo-500 '
                      : 'text-gray-400 group-hover:text-gray-500 '
                  }'-ml-0.5 mr-2 h-5 w-5'
                `}
                aria-hidden='true'
              />
              <span>{tab.name}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

TabSelector.propTypes = {
  tabs: PropTypes.array.isRequired,
  currentTab: PropTypes.bool.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};

export default TabSelector;

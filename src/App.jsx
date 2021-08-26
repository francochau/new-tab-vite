import React, { useState, useEffect } from 'react';
import R from 'react-scroll-wheel-handler';
import DateTime from './components/widgets/DateTime';
import Weather from './components/widgets/Weather';
import Reddit from './components/widgets/Reddit';
import SettingDrawer from './components/drawer/SettingDrawer';
import { Transition } from '@headlessui/react';

import {
  MenuAlt4Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  XIcon,
  ArrowSmDownIcon
} from '@heroicons/react/outline';

import { useConfigs, useSetConfigs } from './hooks/useStorage';
import { getThemeStyle, getThemeClass } from './themes/themes';

function App() {
  const ReactScrollWheelHandler = R.default ? R.default : R;

  const [showFeed, setShowFeed] = useState(false);
  const [showDrawer, setDrawer] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  const configs = useConfigs();
  const setConfigs = useSetConfigs();

  const scrollHandler = (direction) => {
    setShowFeed(direction);
    !mounted && setMounted(true);
  };

  return (
    <ReactScrollWheelHandler
      upHandler={() => scrollHandler(false)}
      downHandler={() => {
        scrollHandler(true);
      }}
      pauseListeners={scrolling || showDrawer}
    >
      <div
        key={configs?.data?.theme}
        className={`relative h-screen w-screen overflow-hidden text-white select-none ${getThemeClass(
          configs?.data?.theme
        )}
        `}
        style={getThemeStyle(
          configs?.data?.theme ? configs.data.theme : 'theme1'
        )}
      >
        <MenuAlt4Icon
          className='absolute m-7 cursor-pointer text-white h-7 z-0'
          onClick={() => setDrawer(true)}
        />
        <div
          className={`flex flex-col absolute left-1/2 transform  -translate-x-1/2 
           ${mounted ? 'transition-all delay-500 duration-700' : ''}
             ${showFeed ? 'top-10' : 'h-sm:top-12 h-md:top-20 top-1/3'}`}
        >
          <DateTime />
          <Transition
            show={showFeed}
            enter='transition-opacity duration-700 delay-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity '
            leaveTo='opacity-0'
          >
            <div
              className='flex h-full'
              onMouseEnter={() => {
                setScrolling(true);
              }}
              onMouseLeave={() => setScrolling(false)}
            >
              <Reddit position='left' />
              <Reddit position='right' />
            </div>
          </Transition>
          <Transition
            show={!showFeed}
            enter='transition-opacity duration-700 delay-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-700'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Weather />
          </Transition>
        </div>

        <div
          className={`absolute left-1/2 -ml-3 ${
            showFeed ? 'top-5' : 'bottom-5'
          }`}
        >
          {configs?.data?.welcome && !showFeed && (
            <div className='text-base flex flex-col backdrop-filter backdrop-blur-xl rounded-lg mb-3'>
              <XIcon
                className='h-4 w-4 self-end cursor-pointer'
                onClick={() => {
                  setConfigs.mutate({
                    key: 'welcome',
                    settings: false,
                  });
                }}
              />
              <span>Scroll down or press <ArrowSmDownIcon className="inline-block h-5"/> to show Reddit feeds</span>
            </div>
          )}
          {showFeed ? (
            <ChevronUpIcon
              className='h-6 w-6 cursor-pointer'
              onClick={() => scrollHandler(!showFeed)}
            />
          ) : (
            <ChevronDownIcon
              className='h-6 w-6 cursor-pointer'
              onClick={() => scrollHandler(!showFeed)}
            />
          )}
        </div>
      </div>
      <SettingDrawer open={showDrawer} setOpen={setDrawer} />
    </ReactScrollWheelHandler>
  );
}

export default App;

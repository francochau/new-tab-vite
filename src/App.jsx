import React, { useState, useEffect } from 'react';
import R from 'react-scroll-wheel-handler';
import { SidePane } from 'react-side-pane';
import DateTime from './components/DateTime';
import Weather from './components/Weather';
import Reddit from './components/Reddit';
import Drawer from './components/drawer/Drawer';
import SettingDrawer from './components/drawer/SettingDrawer';
import { Transition } from '@headlessui/react';
import './App.css';

import {
  MenuAlt4Icon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';

import { useConfigs, useWidgets } from './api/Storage';
import { themes } from './themes/themes';

function App() {
  const ReactScrollWheelHandler = R.default ? R.default : R;
  const [showFeed, setShowFeed] = useState(false);

  const [showDrawer, setDrawer] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  const widgets = useWidgets();
  const configs = useConfigs();

  const scrollButton = {
    position: 'absolute',
    left: '50%',
    marginLeft: '-16px',
    display: 'block',
    border: '2px solid #FFF',
    backgroundSize: '14px auto',
    zIndex: '1',
    width: '12px',
    height: '12px',
    content: '',
    borderWidth: '0px 0 2px 2px',
  };

  const scrollUp = () => {
    setShowFeed(false);
    setMounted(true);
  };

  const scrollDown = () => {
    setShowFeed(true);
    setMounted(true);
  };

  const getTheme = (theme) => {
    if (!themes[theme]) {
      theme = 'theme1';
    }
    return {
      backgroundImage: `linear-gradient(to right, ${themes[theme].from}, ${
        themes[theme].via ? themes[theme].via + ',' : ''
        } ${themes[theme].to})`,
    };
  };
  return (
    <ReactScrollWheelHandler
      upHandler={scrollUp}
      downHandler={scrollDown}
      pauseListeners={scrolling}
    >
      <div
        className='relative h-screen w-screen overflow-hidden text-white'
        style={getTheme(configs?.data?.theme ? configs.data.theme : 'theme1')}
      >
        <MenuAlt4Icon
          className='absolute m-7 cursor-pointer text-white h-7'
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
              className='inline-flex'
              onMouseEnter={() => {
                setScrolling(true);
              }}
              onMouseLeave={() => setScrolling(false)}
            >
              <Reddit redditConfig={widgets.data?.left} position='left' />
              <Reddit redditConfig={widgets.data?.right} position='right' />
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

        <Drawer open={showDrawer} setOpen={setDrawer}>
          <SettingDrawer />
        </Drawer>

        <div
          className='cursor-pointer'
          onClick={() => {
            setShowFeed(!showFeed);
            setMounted(true);
          }}
          style={{
            ...scrollButton,
            ...(showFeed
              ? { top: '30px', transform: 'rotate(135deg)' }
              : {
                  bottom: '30px',
                  transform: 'rotate(-45deg)',
                }),
          }}
        ></div>
      </div>
    </ReactScrollWheelHandler>
  );
}

export default App;

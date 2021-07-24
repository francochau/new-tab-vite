import React, { useState, useEffect } from 'react';
import R from 'react-scroll-wheel-handler';
import { SidePane } from 'react-side-pane';
import DateTime from './Components/DateTime';
import Weather from './Components/Weather';
import Reddit from './Components/Reddit';
import Drawer from './Components/Drawer';

import { Transition } from '@headlessui/react';
import './App.css';

function App() {
  const ReactScrollWheelHandler = R.default ? R.default : R;
  const [showFeed, setShowFeed] = useState(false);
  const [config, setConfig] = useState({
    widgets: {
      left: { type: 'reddit', src: 'cryptocurrency', sorting: 'rising' },
      right: { type: 'reddit', src: 'news', sorting: 'rising' },
    },
  });
  const [leftWidget, setLeftWidget] = useState({
    type: 'reddit',
    src: 'cryptocurrency',
    sorting: 'rising',
  });
  const [rightWidget, setRightWidget] = useState({
    type: 'reddit',
    src: 'news',
    sorting: 'rising',
  });

  const [showDrawer, setDrawer] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    chrome.storage?.sync.get(['left', 'right'], function (result) {
      if (Object.keys(result).length !== 0) {
        setLeftWidget(result.left);
        setRightWidget(result.right);
      } else {
        chrome.storage?.sync.set(
          {
            left: { type: 'reddit', src: 'reactjs', sorting: 'hot' },
            right: { type: 'reddit', src: 'news', sorting: 'rising' },
          },
          (result) => {
            console.log(result);
          }
        );
      }
    });
  }, []);

  const scrollButton = {
    position: 'absolute',
    left: '50%',
    marginLeft: '-16px',
    display: 'block',
    border: '2px solid #FFF',
    backgroundSize: '14px auto',
    zIndex: '2',
    width: '12px',
    height: '12px',
    content: '',
    borderWidth: '0px 0 2px 2px',
  };

  const scrollUp = () => {
    setShowFeed(false);
    setMounted(true);
  }

  const scrollDown = () => {
    setShowFeed(true);
    setMounted(true);
  }

  return (
    // <ReactScrollWheelHandler></ReactScrollWheelHandler>

    <ReactScrollWheelHandler
      upHandler={scrollUp}
      downHandler={scrollDown}
      pauseListeners={scrolling}
    >
      <div className='relative h-screen w-screen overflow-hidden text-white'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          height='32'
          className='absolute m-7 cursor-pointer text-white'
          onClick={() => setDrawer(true)}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
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
              <Reddit redditConfig={leftWidget} position='left' />
              <Reddit redditConfig={rightWidget} position='right' />
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

        <Drawer open={showDrawer} setOpen={setDrawer} >testing</Drawer>

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

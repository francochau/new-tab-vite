import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useConfigs } from '../../hooks/useStorage';
import { getThemeStyle, getThemeClass } from '../../themes/themes';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import TabSelector from './TabSelector';

import { FireIcon, SparklesIcon, CogIcon } from '@heroicons/react/outline';
import { ThemeTab, ConfigsTab, AboutTab } from './tabs';

const SettingDrawer = (props) => {
  const configs = useConfigs();

  const [tabs] = useState([
    { name: 'Theme', icon: SparklesIcon, component: <ThemeTab /> },
    { name: 'Configurations', icon: CogIcon, component: <ConfigsTab /> },
    { name: 'About', icon: FireIcon, component: <AboutTab /> },
  ]);

  const [currentTab, setCurrentTab] = useState(0);

  const backdrop = (
    <div className='h-full w-full'>
      <div
        className={`h-full w-full`}
        style={{
          ...getThemeStyle(
            configs?.data?.theme ? configs.data.theme : 'theme1'
          ),
          ...{ backgroundSize: '100%, 100%' },
        }}
      ></div>
      <Transition
        appear={true}
        className={`absolute top-0 h-full w-full`}
        style={{
          ...getThemeStyle(configs?.data?.oldTheme, { old: true }),
          ...{ backgroundSize: '100%, 100%' },
        }}
        show={
          configs?.data?.oldTheme && configs?.data?.oldTheme !== ''
            ? true
            : false
        }
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      ></Transition>
    </div>
  );

  return (
    <div>
      <Drawer
        open={props.open}
        setOpen={props.setOpen}
        title={
          <TabSelector
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabs={tabs}
          />
        }
        backdrop={backdrop}
      >
        {tabs.map((e, index) => (
          <Transition
            className='absolute inset-0 px-8'
            show={currentTab === index}
            enter='transition-opacity duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Scrollbars
              className='h-full'
              autoHide
              autoHideTimeout={500}
              autoHideDuration={300}
            >
              {e.component}
            </Scrollbars>
          </Transition>
        ))}
      </Drawer>
    </div>
  );
};

SettingDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SettingDrawer;

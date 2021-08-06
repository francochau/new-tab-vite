import React, { useEffect } from 'react';
import { useConfigs, useSetConfigs } from '../../api/Storage';
import { themes } from '../../themes/themes';

const SettingDrawer = () => {
  const setConfigs = useSetConfigs();
  //   if (!configs.data) return <div></div>
  //   else
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Object.entries(themes).map(([key, value]) => {
        return (
          <div
            className='flex rounded-lg h-24 w-full cursor-pointer'
            style={{
              backgroundImage: `linear-gradient(to right, ${value.from}, ${
                value.via ? value.via + ',' : ''
              } ${value.to})`,
            }}
            onClick={() => {
              setConfigs.mutate({
                key: 'theme',
                settings: key,
              });
            }}
          >
            <span className='self-center w-full text-center text-gray-100'>
              {key}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SettingDrawer;

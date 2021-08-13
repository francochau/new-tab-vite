import React from 'react';
import { useSetConfigs } from '../../../hooks/useStorage';
import { getConfigs } from '../../../api/Storage';
import {
  getThemeClass,
  getThemeStyle,
  themes,
  themeTypes,
} from '../../../themes/themes';

function ThemeTab() {
  const setConfigs = useSetConfigs();

  return (
    <div>
      {themeTypes.map((e) => (
        <div className='mb-5'>
          <p className='text-base font-medium text-gray-700 mb-3'>{e.label}</p>
          <div className='grid grid-cols-4 gap-3'>
            {Object.entries(themes)
              .filter(([_, value]) => value.type === e.value)
              .map(([key, value]) => {
                return (
                  <div
                    className={`flex rounded-lg h-20 w-full cursor-pointer ${getThemeClass(
                      key
                    )}`}
                    style={getThemeStyle(key)}
                    onClick={async () => {
                      var oldTheme = await getConfigs('theme');
                      await setConfigs.mutateAsync({
                        key: 'oldTheme',
                        settings: oldTheme,
                      });
                      setConfigs.mutate({
                        key: 'theme',
                        settings: key,
                      });
                      setTimeout(async function () {
                        await setConfigs.mutateAsync({
                          key: 'oldTheme',
                          settings: '',
                        });
                      }, 100);
                    }}
                  >
                    <span className='self-center w-full text-center text-gray-100 text-sm'>
                      {value.name}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThemeTab;

import React, { useState, useRef } from 'react';
import { useSetGeolocation, useGeolocation } from '../../../hooks/useWeather';
import InputBox from '../../common/InputBox';
import RadioSelect from '../../common/RadioSelect';
import {
  SearchIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { RadioGroup } from '@headlessui/react';
import { useConfigs, useSetConfigs } from '../../../hooks/useStorage';

function ConfigsTab() {
  const geolocation = useGeolocation();
  const setGeolocation = useSetGeolocation();
  const configs = useConfigs();
  const setConfigs = useSetConfigs();

  const options = [
    { label: 'On', value: true },
    { label: 'Off', value: false },
  ];
  const [selected, setSelected] = useState(true);

  const locationRef = useRef(null);
  const latRef = useRef(null);
  const lonRef = useRef(null);

  if (!geolocation.data || !configs.data) return <div></div>;
  else {
    return (
      <div>
        {setGeolocation.isError && (
          <div className='w-full flex items-center bg-yellow-300 border-2 border-yellow-500 text-yellow-700 font-medium text-base py-3 px-2 rounded mb-3'>
            <InformationCircleIcon className='h-5 w-5 mr-2' />
            <span>{setGeolocation.error?.message}</span>
            {/* {JSON.stringify(setGeolocation.error)} */}
          </div>
        )}
        <div className='flex mb-5'>
          <div>
            <InputBox
              ref={locationRef}
              className='mr-3 mb-1 flex-grow'
              type='location'
              label='Location'
              defaultValue={geolocation.data.name}
              // value={location}
              tailing={<SearchIcon className='h-5 w-5' />}
              onTailingClick={(e) => {
                setGeolocation.mutate({
                  location: locationRef?.current?.value,
                });
              }}
            />
            <span
              className='cursor-pointer text-indigo-600'
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    console.log('Latitude is :', position.coords.latitude);
                    console.log('Longitude is :', position.coords.longitude);
                    setGeolocation.mutate({
                      reverse: true,
                      lat: position.coords.latitude,
                      lon: position.coords.longitude,
                    });
                  },
                  (e) => console.log(e)
                );
              }}
            >
              Auto Geolocation
            </span>
          </div>

          <div className='flex-initial flex'>
            <InputBox
              ref={latRef}
              className='mr-3'
              label='Latitude'
              type='latitude'
              defaultValue={geolocation.data.lat}
              isLoading={setGeolocation.isLoading}
            />
            <InputBox
              ref={lonRef}
              className=''
              label='Longitude'
              type='longitude'
              defaultValue={geolocation.data.lon}
              isLoading={setGeolocation.isLoading}
              tailing={<LocationMarkerIcon className='h-5 w-5' />}
              onTailingClick={(e) => {
                setGeolocation.mutate({
                  reverse: true,
                  lat: latRef?.current?.value,
                  lon: lonRef?.current?.value,
                });
              }}
            />
          </div>
        </div>

        <div className='w-2/3'>
          <RadioSelect
            className='mb-5'
            label='Show seconds'
            selected={configs.data.showSeconds}
            setSelected={(e) =>
              setConfigs.mutate({
                key: 'showSeconds',
                settings: e,
              })
            }
            options={options}
          />
          <RadioSelect
            className='mb-5'
            label='Time format'
            selected={configs.data.timeFormat}
            setSelected={(e) =>
              setConfigs.mutate({
                key: 'timeFormat',
                settings: e,
              })
            }
            options={['24hr', '12hr']}
          />
          <RadioSelect
            className='mb-5'
            label='Temperature Unit'
            selected={configs.data.temperatureUnit}
            setSelected={(e) =>
              setConfigs.mutate({
                key: 'temperatureUnit',
                settings: e,
              })
            }
            options={[
              { label: 'Celsius', value: 'C' },
              { label: 'Fahrenheit', value: 'F' },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default ConfigsTab;

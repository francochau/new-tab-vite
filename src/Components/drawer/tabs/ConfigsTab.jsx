import React, { useState } from 'react';
import { useSetGeolocation, useGeolocation } from '../../../hooks/useWeather';
import InputBox from '../../common/InputBox';
import RadioSelect from '../../common/RadioSelect';
import { SearchIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { RadioGroup } from '@headlessui/react';

function ConfigsTab() {
  const geolocation = useGeolocation();
  const setGeolocation = useSetGeolocation();

  if (!geolocation.data) return <div></div>;
  else {
    return (
      <div>
        {setGeolocation.isError && (
          <div className='w-full flex items-center bg-yellow-300 border-2 border-yellow-500 text-yellow-700 font-medium text-base py-3 px-2 rounded mb-3'>
            <InformationCircleIcon className='h-5 w-5 mr-2' />
            <span>{setGeolocation.error}</span>
          </div>
        )}
        <div className='flex mb-5'>
          <InputBox
            className='mr-3 flex-grow'
            type='location'
            label='Location'
            defaultValue={geolocation.data.name}
            tailing={<SearchIcon className='h-5 w-5' />}
            onTailingClick={(e) => {
              setGeolocation.mutate(e?.current?.value);
            }}
          />
          <div className='flex-initial flex'>
            <InputBox
              className='mr-3'
              label='Latitude'
              type='latitude'
              defaultValue={geolocation.data.lat}
              isLoading={setGeolocation.isLoading}
            />
            <InputBox
              className=''
              label='Longitude'
              type='longitude'
              defaultValue={geolocation.data.lon}
              isLoading={setGeolocation.isLoading}
            />
          </div>
        </div>
        <div className='w-1/2'>
          <RadioSelect></RadioSelect>
        </div>
      </div>
    );
  }
}

export default ConfigsTab;

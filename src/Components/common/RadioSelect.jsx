import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import CircleIcon from '../../assets/CircleIcon';

function RadioSelect(props) {
  const [plan, setPlan] = useState('startup');
  const options = ['yes', 'no'];

  return (
    <RadioGroup value={plan} onChange={setPlan} className='flex'>
      <RadioGroup.Label className='flex-grow text-sm font-medium text-gray-700'>
        Plan
      </RadioGroup.Label>
      {options.map((option) => (
        <RadioGroup.Option value={option} className='bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 mx-0 first:rounded-l-lg outline-none focus:shadow-outline'>
          {({ checked }) => (
            <div className=''>
              {/* <span
                className={`cursor-pointer ${checked ? 'bg-blue-200' : ''}`}
              >
                {option}
              </span>
              <div className='flex-shrink-0 text-black'>
                {checked ? (
                  <CheckCircleIcon className='w-6 h-6' />
                ) : (
                  <CircleIcon className='w-6 h-6' />
                )}
              </div> */}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

RadioSelect.propTypes = {};

export default RadioSelect;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import CircleIcon from '../../assets/CircleIcon';

function RadioSelect(props) {
  // const label = 'Time format';
  // const options = [
  //   { label: 'On', value: true },
  //   { label: 'Off', value: false },
  // ];
  // const [selected, setSelected] = useState(options[0].value);

  return (
    <RadioGroup
      value={props.selected}
      onChange={props.setSelected}
      className={`flex items-center ${props.className}`}
    >
      <RadioGroup.Label className='flex-1 text-sm font-medium text-gray-700'>
        {props.label}
      </RadioGroup.Label>
      <div className='flex-1 flex'>
        {props.options.map((option, index) => (
          <RadioGroup.Option value={option.value ?? option} className='flex-1'>
            {({ checked }) => (
              <div
                className={`
              cursor-pointer border-2 border-indigo-600  hover:bg-indigo-500 hover:text-white px-4 py-1 mx-0 outline-none focus:shadow-outline transition-colors 
              ${checked ? 'bg-indigo-600 text-white' : 'text-indigo-600'} ${
                  (index === 0 && 'rounded-l-lg border-r-0') ||
                  (index === props.options.length - 1 &&
                    'rounded-r-lg border-l-0')
                }`}
              >
                {option.label ?? option}
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
      </div>
    </RadioGroup>
  );
}

RadioSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default RadioSelect;

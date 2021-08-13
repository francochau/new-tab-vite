import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function InputBox(props) {
  const inputRef = useRef(null);

  return (
    <div className={props.className}>
      <label
        htmlFor={props.type}
        className='block text-sm font-medium text-gray-700'
      >
        {props.label}
      </label>
      <div
        key={props.defaultValue}
        className='mt-1 relative rounded-md shadow-sm'
      >
        <input
          ref={inputRef}
          type='text'
          name={props.name ?? props.type}
          id={props.id ?? props.type}
          className={`${
            props.isLoading === true && 'bg-gray-300'
          } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
        />
        {props.tailing && (
          <div
            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
            onClick={
              props.onTailingClick &&
              (() => {
                const value = inputRef;
                props.onTailingClick(value);
              })
            }
          >
            {props.tailing}
          </div>
        )}
      </div>
    </div>
  );
}

InputBox.propTypes = {};

export default InputBox;

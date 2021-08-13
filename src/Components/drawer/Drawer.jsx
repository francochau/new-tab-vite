import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { XIcon, ExclamationIcon } from '@heroicons/react/outline';


const Drawer = (props) => {

  return (
    <div>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 overflow-hidden'
          open={props.open}
          onClose={props.setOpen}
        >
          <div className='absolute inset-0 overflow-hidden'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='absolute inset-0'>
                { props.backdrop }
              </div>
            </Transition.Child>

            <div className='fixed inset-y-0 left-0 pr-10 max-w-full flex'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full z-index-0'
              >
                <div className='w-screen max-w-2xl'>
                  <div className='h-full flex flex-col py-4 bg-white shadow-xl rounded-r-2xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-grow'>
                          {props.title}
                        </div>

                        <div className='ml-3 h-7 flex items-center'>
                          <button
                            className='bg-white rounded-md text-gray-400 hover:text-gray-500 '
                            onClick={() => props.setOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative flex-1 px-4 sm:px-6'>
                      <div className='absolute inset-0 px-4 sm:px-6'>
                        <div className='h-full' aria-hidden='true'>
                          {props.children}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Drawer;

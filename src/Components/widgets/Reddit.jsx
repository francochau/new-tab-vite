import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './Widget.css';
import { useRedditPosts, useSubredditSearch } from '../../hooks/useReddit';
import {
  useSubredditList,
  useAddSubreddit,
  useRemoveSubreddit,
  useFavSubreddit,
  useSetWidgets,
  useWidgets,
} from '../../hooks/useStorage';
import { Listbox } from '@headlessui/react';
import { TrashIcon, StarIcon, SelectorIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid';
import { RedditSvg } from '../../assets/RedditSvg.jsx';

const Reddit = (props) => {
  const widgets = useWidgets();
  const setWidgets = useSetWidgets();

  const [sortingList] = useState([
    { value: 'hot', label: 'Popular' },
    { value: 'rising', label: 'Rising' },
    { value: 'new', label: 'New' },
    { value: 'controversial', label: 'Controversial' },
  ]);

  const [isEditing, setEditing] = useState(false);
  const [subredditInput, setSubredditInput] = useState('');

  const redditPosts = useRedditPosts(widgets.data?.[props.position]?.src, widgets.data?.[props.position]?.sorting);
  const subredditSearch = useSubredditSearch(subredditInput);

  const subredditList = useSubredditList();
  const addSubreddit = useAddSubreddit();
  const removeSubreddit = useRemoveSubreddit();
  const favSubreddit = useFavSubreddit();

  const changeSorting = (sorting) => {
    setWidgets.mutate({
      position: props.position,
      settings: { sorting: sorting },
    });

    setEditing(false);
  };

  const changeSrc = (src) => {
    setWidgets.mutate({ position: props.position, settings: { src: src } });
    setEditing(false);
  };

  const [openDropdown, setOpenDropdown] = useState(false);
  if (!widgets.data) return <div></div>;

  return (
    <div className='flex h-full max-w-xl'>
      <div style={{ overflow: 'hidden', margin: '1.5em', fontSize: 'initial' }}>
        <div
          style={{ margin: '1.5em 0', width: '30vw' }}
          onClick={() => {
            setEditing(!isEditing);
          }}
          className='cursor-pointer items-center min-w-0 flex'
        >
          <RedditSvg className='flex-shrink-0' />
          <span className='truncate'>
            {sortingList.find((e) => e.value === widgets.data?.[props.position].sorting).label}
            {widgets.data?.[props.position].src ? ` on r/${widgets.data?.[props.position].src}` : ' on Reddit'}
          </span>
        </div>

        <div className='widgetcontainer'>
          {isEditing ? (
            <div className=''>
              <p className='text-md font-semibold'>Sorting</p>
              <div className='flex justify-start'>
                {sortingList &&
                  sortingList.map((e) => (
                    <p
                      className={`mr-4 cursor-pointer ${
                        widgets.data?.[props.position].sorting == e.value && 'border-b border-gray-100'
                      }`}
                      onClick={() => {
                        changeSorting(e.value);
                      }}
                    >
                      {e.label}
                    </p>
                  ))}
              </div>

              <br />
              <div className='flex w-4/5'>
                <p className='text-md font-semibold flex-grow cursor-pointer'>
                  Subreddit
                </p>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    changeSorting();
                    changeSrc();
                  }}
                >
                  Frontpage
                </span>
              </div>
              <div className='w-4/5 relative'>
                {
                  <Listbox onChange={() => {}}>
                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                        <input
                          type='text'
                          name='subredditInput'
                          autoComplete='off'
                          id='subreddit'
                          value={subredditInput}
                          onChange={(e) => {
                            setSubredditInput(e.target.value);
                          }}
                          className='focus:border-white focus:ring-0 ring-transparent focus:outline-none active:outline-none  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 text-white bg-transparent border'
                          style={{ outline: 'none' }}
                          onClick={() => setOpenDropdown(true)}
                        />
                        <Listbox.Button as={Fragment}>
                          <button className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white  bg-transparent focus:ring-0 focus:outline-none'>
                            <span>
                              <SelectorIcon
                                className='h-4 w-4'
                                onClick={() => setOpenDropdown(!openDropdown)}
                              />
                            </span>
                          </button>
                        </Listbox.Button>
                      </div>
                    </div>
                    {subredditSearch.data &&
                      subredditSearch.data?.length > 0 &&
                      openDropdown && (
                        <Listbox.Options as={Fragment} static>
                          <div className='absolute bg-transparent text-white rounded-md b overflow-auto py-1 mt-1 backdrop-filter shadow-sm backdrop-blur-lg w-full'>
                            <Scrollbars
                              autoHide
                              autoHideTimeout={500}
                              autoHideDuration={300}
                              style={{
                                height: '15rem',
                              }}
                            >
                              {subredditSearch.data
                                .filter(
                                  (e) =>
                                    !subredditList.data
                                      .map((e) => e.subreddit)
                                      .includes(e.data.display_name)
                                )
                                .map((e) => (
                                  <Listbox.Option
                                    key={e.id}
                                    value={e?.data?.display_name}
                                    as={Fragment}
                                  >
                                    <div
                                      onClick={() => {
                                        addSubreddit.mutate(
                                          e?.data?.display_name
                                        );
                                        setSubredditInput('');
                                        changeSrc(e?.data?.display_name);
                                      }}
                                    >
                                      <div className='p-2 border-b border-white border-opacity-30 cursor-pointer'>
                                        {e?.data?.display_name} -{' '}
                                        {e?.data?.title}
                                      </div>
                                    </div>
                                  </Listbox.Option>
                                ))}
                            </Scrollbars>
                          </div>
                        </Listbox.Options>
                      )}
                  </Listbox>
                }
              </div>
              {subredditList.data &&
                !subredditList.isLoading &&
                subredditList.data.map((e, index) => (
                  <div className='flex group mt-2 mb-2 w-4/5 min-w-0'>
                    {e.fav ? (
                      <SolidStarIcon
                        className={`h-5 w-5 self-center mr-3 text-white group-hover:text-white cursor-pointer flex-shrink-0 transition-colors`}
                        onClick={() => {
                          favSubreddit.mutate(index);
                        }}
                      />
                    ) : (
                      <StarIcon
                        className={`h-5 w-5 self-center mr-3 text-transparent group-hover:text-white cursor-pointer flex-shrink-0 transition-colors`}
                        onClick={() => {
                          favSubreddit.mutate(index);
                        }}
                      />
                    )}
                    <div
                      className='flex-grow self-center cursor-pointer truncate'
                      onClick={() => {
                        changeSrc(e.subreddit);
                      }}
                    >
                      {e.subreddit}
                    </div>

                    <TrashIcon
                      className='h-5 w-5 mr-5 self-center text-transparent group-hover:text-white cursor-pointer flex-shrink-0 transition-colors'
                      onClick={() => {
                        removeSubreddit.mutate(index);
                      }}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {redditPosts.isPreviousData && (
                <div className='absolute backdrop-filter backdrop-blur-sm rounded widgetcontainer flex items-center '>
                  <div className='text-center w-full'>Loading...</div>
                </div>
              )}
              {redditPosts.data &&
                redditPosts.data.map((e, index) => (
                  <div
                    key={index}
                    onClick={() => {window.open(`https://reddit.com${e.data.permalink}`, "_blank")}}
                    className="group cursor-pointer"
                  >
                    <div
                      className="mb-8 border-l-2 px-4 py-2 border-white border-opacity-20 group-hover:border-opacity-70 transition text-white"
                      key={index}>
                      {e.data.title}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Reddit.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Reddit;

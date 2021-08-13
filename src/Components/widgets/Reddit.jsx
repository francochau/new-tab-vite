import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './Widget.css';
import { useRedditPosts } from '../../hooks/useReddit';
import {
  useSubredditList,
  useAddSubreddit,
  useRemoveSubreddit,
  useFavSubreddit,
  useSetWidgets,
  useWidgets,
} from '../../hooks/useStorage';
import { TrashIcon, StarIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid';
import RedditSvg from '../../assets/RedditSvg.jsx';

const Reddit = (props) => {
  const widgets = useWidgets();
  const setWidgets = useSetWidgets();

  const [config, setConfig] = useState(widgets.data?.[props.position]);

  const [sortingList] = useState([
    { value: 'hot', label: 'Popular' },
    { value: 'rising', label: 'Rising' },
    { value: 'new', label: 'New' },
    { value: 'controversial', label: 'Controversial' },
  ]);

  const [isEditing, setEditing] = useState(false);
  const [subredditInput, setSubredditInput] = useState('');

  const redditPosts = useRedditPosts(config?.src, config?.sorting);
  // isPreviousData = useState(redditPosts?.isPreviousData ?? true);

  const subredditList = useSubredditList();
  const addSubreddit = useAddSubreddit();
  const removeSubreddit = useRemoveSubreddit();
  const favSubreddit = useFavSubreddit();

  const changeSorting = (sorting) => {
    setWidgets.mutate({
      position: props.position,
      settings: { sorting: sorting },
    });
    setConfig({ ...config, sorting: sorting });
    setEditing(false);
  };

  const changeSrc = (src) => {
    setWidgets.mutate({ position: props.position, settings: { src: src } });
    setConfig({ ...config, src: src });
    setEditing(false);
  };

  const postStyle = {
    margin: '0 0 2em 0',
    padding: '0.5em 1em',
    borderLeft: 'solid 2px rgba(255,250,250, .2)',
  };

  if (!widgets.data) return <div></div>;

  return (
    <div className='flex h-full'>
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
            {sortingList.find((e) => e.value === config.sorting).label} on r/
            {config.src}
          </span>
        </div>

        <div className='widgetcontainer'>
        {/* <Scrollbars
          className='max-w-lg'
          style={{ height: '70vh' }}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={300}
        > */}
          {isEditing ? (
            <div className=''>
              <p className='text-md font-semibold'>Sorting</p>
              <div className='flex justify-start'>
                {sortingList &&
                  sortingList.map((e) => (
                    <p
                      className={`mr-4 cursor-pointer ${
                        config.sorting == e.value && 'border-b border-gray-400'
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
                <p className='text-md font-semibold flex-grow'>Subreddit</p>
                <span
                  onClick={() => {
                    changeSorting();
                    changeSrc();
                  }}
                >
                  Frontpage
                </span>
              </div>
              <div className='mt-1 flex rounded-md shadow-sm w-4/5'>
                <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                  {/* <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black'>
                  </div> */}
                  <input
                    type='text'
                    name='subredditInput'
                    id='subreddit'
                    value={subredditInput}
                    onChange={(e) => setSubredditInput(e.target.value)}
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 text-black'
                  />
                </div>
                <button
                  className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                  onClick={() => {
                    addSubreddit.mutate(subredditInput);
                    setSubredditInput('');
                  }}
                >
                  <span>+</span>
                </button>
              </div>
              {subredditList.data &&
                !subredditList.isLoading &&
                subredditList.data.map((e, index) => (
                  <div className='flex group mt-2 mb-2 w-4/5 min-w-0'>
                    {e.fav ? (
                      <SolidStarIcon
                        className={`h-5 w-5 self-center mr-3 text-white group-hover:text-white cursor-pointer flex-shrink-0`}
                        onClick={() => {
                          favSubreddit.mutate(index);
                        }}
                      />
                    ) : (
                      <StarIcon
                        className={`h-5 w-5 self-center mr-3 text-transparent group-hover:text-white cursor-pointer flex-shrink-0`}
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
                      className='h-5 w-5 mr-5 self-center text-transparent group-hover:text-white cursor-pointer flex-shrink-0'
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
                  <a
                    key={index}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                    href={`https://reddit.com${e.data.permalink}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div style={postStyle} key={index}>
                      {e.data.title}
                    </div>
                  </a>
                ))}
            </div>
          )}
        {/* </Scrollbars> */}
        </div>
      </div>
    </div>
  );
};

Reddit.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Reddit;

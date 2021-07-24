import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Widget.css';

const Reddit = (props) => {
  const [config, setConfig] = useState(props.redditConfig);
  const [posts, setPosts] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [sortingList] = useState([
    { value: 'hot', label: 'Popular' },
    { value: 'rising', label: 'Rising' },
    { value: 'new', label: 'New' },
    { value: 'controversial', label: 'Controversial' },
  ]);
  const [subredditList, setSubredditList] = useState([
    { subreddit: 'Cryptocurrency', fav: true },
    { subreddit: 'News', fav: false },
    { subreddit: 'Tree', fav: false },
    { subreddit: 'Reactjs', fav: false },
  ]);
  const [subredditInput, setSubredditInput] = useState('');

  const getReddit = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.reddit.com/r/${config.src}/${config.sorting}/.json`
    );
    setLoading(false);
    setPosts(data.data.children);
  };

  const getSubredditList = () => {
    chrome.storage?.sync.get(['subredditList'], function (result) {
      console.log(result);
      if (Object.keys(result).length !== 0) {
        setSubredditList(result.subredditList);
      } else {
        chrome.storage?.sync.set(
          {
            subredditList: subredditList,
          },
          (result) => {
            console.log(result);
          }
        );
      }
    });
  };

  const addSubredditList = (subreddit) => {
    setSubredditList([...subredditList, { subreddit: subreddit, fav: false }]);
    console.log(subredditList);
    chrome.storage?.sync.set(
      {
        subredditList: [...subredditList, { subreddit: subreddit, fav: false }],
      },
      (result) => {
        console.log(result);
      }
    );
  };

  const changeSorting = (sorting) => {
    chrome.storage?.sync.set(
      { [props.position]: { ...config, sorting: sorting } },
      (result) => {
        console.log(result);
      }
    );
    setConfig({ ...config, sorting: sorting });
    setEditing(false);
  };

  const changeSrc = (src) => {
    chrome.storage?.sync.set(
      { [props.position]: { ...config, src: src } },
      (result) => {
        console.log(result);
      }
    );
    setConfig({ ...config, src: src });
    setEditing(false);
  };

  useEffect(() => {
    getReddit();
    getSubredditList();
  }, [config]);

  const postStyle = {
    margin: '0 0 2em 0',
    padding: '0.5em 1em',
    borderLeft: 'solid 2px rgba(255,250,250, .2)',
  };

  return (
    <div className='flex'>
      <div style={{ overflow: 'hidden', margin: '1.5em', fontSize: 'initial' }}>
        <div
          style={{ display: 'flex', margin: '1.5em 0' }}
          onClick={() => {
            setEditing(!isEditing);
          }}
          className='cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            style={{ marginRight: '8px' }}
          >
            <path
              style={{ fill: 'white' }}
              d='M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z'
            />
          </svg>
          <span style={{ alignItems: 'center' }} className='flex'>
            {sortingList.find((e) => e.value === config.sorting).label} on r/
            {config.src}
            <div></div>
          </span>
        </div>
        {isLoading ? (
          <div className='absolute backdrop-filter backdrop-blur-sm rounded widgetcontainer flex items-center '>
            <div className='text-center w-full'>Loading...</div>
          </div>
        ) : (
          ''
        )}
        <div className='widgetcontainer'>
          {isEditing ? (
            <div className=''>
              <p className='text-md font-semibold'>Sorting</p>
              <div className='flex justify-start'>
                {sortingList
                  ? sortingList.map((e) => (
                      <p
                        className={`mr-4 cursor-pointer ${
                          config.sorting == e.value
                            ? 'border-b border-gray-400'
                            : ''
                        }`}
                        onClick={() => {
                          changeSorting(e.value);
                        }}
                      >
                        {e.label}
                      </p>
                    ))
                  : ''}
              </div>

              <br />
              <div className='flex w-4/5'>
                <p className='text-md font-semibold flex-grow'>Subreddit</p>
                <span>Frontpage</span>
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
                    addSubredditList(subredditInput);
                    setSubredditInput('');
                  }}
                >
                  <span>+</span>
                </button>
              </div>
              {subredditList
                ? subredditList.map((e) => (
                    <div className='flex group mt-2 mb-2'>
                      {e.fav ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className={`h-5 w-5 self-center mr-3 text-transparent group-hover:text-white cursor-pointer`}
                          fill='white'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className={`h-5 w-5 self-center mr-3 text-transparent group-hover:text-white cursor-pointer`}
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                          />
                        </svg>
                      )}

                      <p
                        className='flex-grow self-center cursor-pointer'
                        onClick={() => {
                          changeSrc(e.subreddit);
                        }}
                      >
                        {e.subreddit}
                      </p>
                    </div>
                  ))
                : ''}
              {/* <p>Cryptocurrency</p>
              <p>News</p> */}
            </div>
          ) : posts ? (
            posts.map((e, index) => (
              <a
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                href={`https://reddit.com${e.data.permalink}`}
                target='_blank'
                rel='noreferrer'
              >
                <div style={postStyle} key={index}>
                  {e.data.title}
                </div>
              </a>
            ))
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

Reddit.propTypes = {
  redditConfig: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
};

export default Reddit;

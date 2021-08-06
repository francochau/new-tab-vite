import './main.css';
import App from './src/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { queryClient } from './src/utils/ReactQuery';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
// import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: Infinity, // 24 hours
//       staleTime: Infinity,
//     },
//   },
// });

// const localStoragePersistor = createWebStoragePersistor({
//   storage: window.localStorage,
//   throttleTime: 1000,
// });

// persistQueryClient({
//   queryClient,
//   persistor: localStoragePersistor,
//   maxAge: 1000 * 60 * 60
// });


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

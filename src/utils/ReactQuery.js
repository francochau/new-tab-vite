import { QueryClient } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity, // 24 hours
      staleTime: Infinity,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});
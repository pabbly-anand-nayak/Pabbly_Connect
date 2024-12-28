// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import accessReducer from './slices/accessSlice';

const store = configureStore({
  reducer: {
    access: accessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  // devTools: process.env.VITE_ENVIRONMENT !== 'production',
});

export default store;

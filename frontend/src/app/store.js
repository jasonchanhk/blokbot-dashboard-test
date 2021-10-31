import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { dashboardApi } from '../services/dashboardApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,    
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

  },
});
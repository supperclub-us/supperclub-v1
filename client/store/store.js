import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
import chefsBookingsReducer from '../components/slices/chefsBookingsSlice'

const store = configureStore({
  reducer: { 
    auth: authReducer,
    chefsBookings: chefsBookingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
import chefsBookingsReducer from '../components/slices/chefsBookingsSlice'
import singleChefReducer from '../components/slices/singleChefSlice'
import singleChefBookingsReducer from '../components/slices/singleChefBookingsSlice';
import viewportReducer from '../components/slices/viewportSlice'
import singleMemberReducer from '../components/slices/singleMemberSlice'
import allChefsReducer from '../components/slices/allChefsSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    chefsBookings: chefsBookingsReducer,
    singleChef: singleChefReducer,
    singleChefBookings: singleChefBookingsReducer,
    viewport: viewportReducer,
    singleMember: singleMemberReducer,
    allChefs: allChefsReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';

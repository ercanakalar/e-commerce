import { combineReducers } from 'redux';
import authenticationService from './services/authenticationService';
import authSlice from './slices/authSlice';

const rootReducers = {
  auth: authSlice,
  [authenticationService.reducerPath]: authenticationService.reducer,
};
export default combineReducers(rootReducers);

import { combineReducers } from 'redux';
import authenticationService from './services/authenticationService';

const rootReducers = {
  [authenticationService.reducerPath]: authenticationService.reducer,
};
export default combineReducers(rootReducers);

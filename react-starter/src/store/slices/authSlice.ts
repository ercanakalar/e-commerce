import { createSlice } from '@reduxjs/toolkit';
import authenticationService from '../services/authenticationService';
import { IAuthState } from '../../type/store/auth-type';
import { LocalStorageService } from '../../services/localStorageService';

const initialState: IAuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  state: 'initial',
  user: null,
  errors: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => {},
    setAuth: (state, action) => {},
  },
  extraReducers: (builder) => {
    const { signIn } = authenticationService.endpoints;
    builder
      .addMatcher(signIn.matchFulfilled, (state, action) => {
        const token = action.payload.data.signIn.token;
        state.token = token;
        state.state = 'auth';
        state.user = action.payload.data.signIn.data;
        new LocalStorageService().setItem('token', token);
      })
      .addMatcher(signIn.matchRejected, (state, action) => {
        console.log(action);
      });
  },
});
export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;

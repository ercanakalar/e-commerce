import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  state: 'initial',
  user: null,
  error: null,
  errors: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => {},
    setAuth: (state, action) => {},
  },
  extraReducers: (builder) => {},
});
export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;

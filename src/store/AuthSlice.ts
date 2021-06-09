import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken, unsetToken } from '../utils/LocalStorage';

import { User } from './UsersSlice';

interface IInitialState {
  isLoggedIn: boolean;
  user: User;
  token: string;
}

interface IAction {
  user: User;
  token: string;
}

const initialState: IInitialState = {
  isLoggedIn: false,
  user: {} as User,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<IAction>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      setToken(action.payload.token);
    },

    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = {} as User;
      state.token = '';
      unsetToken();
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

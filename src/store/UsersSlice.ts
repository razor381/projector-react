import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string,
  name: string;
  email: string;
  role: string;
  photo: string;
}

interface UsersSliceState {
  users: User[];
}

const initialState: UsersSliceState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addUser, addUsers, removeUser } = usersSlice.actions;

export default usersSlice.reducer;

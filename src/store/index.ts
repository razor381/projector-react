import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './UsersSlice';
import authReducer from './AuthSlice';
import postsReducer from './PostsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUsers = (state: RootState) => state.users.users;
export const selectAuth = (state: RootState) => state.auth;
export const selectPosts = (state: RootState) => state.posts.posts;

export default store;

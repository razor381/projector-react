import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User as IUser } from './UsersSlice';

export interface IComment {
  id: string,
  comment: string,
  user: IUser,
  post: number,
}

export interface IPost {
  id: string;
  name: string;
  summary: string;
  description: string;
  ratings_average: string;
  image_cover: string;
  created_at: string;
  updated_at: string;
  createdAt: string;
  user: IUser;
}

interface PostsSliceState {
  posts: IPost[];
}

const initialState: PostsSliceState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    addPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addPost, addPosts, removePost } = postsSlice.actions;

export default postsSlice.reducer;

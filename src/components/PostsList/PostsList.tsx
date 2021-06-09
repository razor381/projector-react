import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import Post from '../Post';
import styles from './PostsList.module.css';
import { selectPosts, selectAuth } from '../../store';
import { IPost, addPosts } from '../../store/PostsSlice';

import { POSTS_URL } from '../../constants/api';
import ROUTES from '../../constants/routes';
import { get, deleteCall } from '../../utils/apiCalls';
import messages from '../../constants/messages';

const PostsList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const { user: loggedInUser, isLoggedIn, token } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePostsFetchComplete = (data: IPost[]) => {
    dispatch(addPosts(data));
  };

  function fetchPosts() {
    get(POSTS_URL)
      .then((res) => handlePostsFetchComplete(res.data));
  }

  const onEdit = (postId: string) => {
    const state = { postId };

    history.push(ROUTES.POST_FORM, state);
  };

  const onDelete = (postId: string) => {
    const url = `${POSTS_URL}/${postId}`;
    const headers = { Authorization: `Bearer ${token}` };

    deleteCall(url, headers)
      .then((res) => {
        if (!res.ok) {
          throw new Error(messages.DELETE_POST_ERROR);
        }

        toast.success(messages.DELETE_POST_SUCCESSFUL);
        fetchPosts();
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return posts.length
    ? (
      <div className={styles['posts-list']}>
        { posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            loggedInUser={isLoggedIn ? loggedInUser : undefined}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )) }
      </div>
    )
    : (
      <h1 className={styles['no-posts']}>No Posts to show right now!</h1>
    );
};

export default PostsList;

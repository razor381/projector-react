import { useState, useEffect } from 'react';

import Post from '../Post';
import styles from './PostsList.module.css';

import { POSTS_URL } from '../../constants/api';
import { getApiCall } from '../../utils/callApi';

const PostsList = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    getApiCall(POSTS_URL)
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className={styles['users-list']}>
      { posts.map((post) => <Post key={post.id} post={post} />) }
    </div>
  );
};

export default PostsList;

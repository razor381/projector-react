import React from 'react';

import styles from './home.module.css';

import Signup from '../Forms/Signup';
import PostForm from '../Forms/PostForm';
import UsersList from '../UsersList';
import PostsList from '../PostsList';

import { postApiCall } from '../../utils/callApi';
import { USERS_URL, POSTS_URL } from '../../constants/api';

const Home = () => {
  const createUserHandler = (createUserData) => {
    postApiCall(USERS_URL, createUserData)
  };

  const createPostHandler = (createPostData) => {
    postApiCall(POSTS_URL, createPostData);
  };

  return (
    <main className={styles.main}>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Projector
          <span className={styles['title__sub-text']}>V2</span>
        </h1>

        <div className={styles.forms}>
          <div className={styles.form} >
            <Signup createUser={createUserHandler} />
          </div>
          <div className={styles.form} >
            <PostForm createPost={createPostHandler} />
          </div>
        </div>
      </header>

      <div className={styles['lists-container']}>
          <div className={styles['users-list']}>
            <UsersList />
          </div>
          <div className={styles['posts-list']}>
            <PostsList />
          </div>
      </div>
    </main>
  );
};

export default Home;

import React from 'react';

import styles from './home.module.css';

import UsersList from '../../components/UsersList';
import PostsList from '../../components/PostsList';

const Home = () => (
  <main className={styles.main}>
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

export default Home;

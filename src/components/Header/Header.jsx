import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logoutUser } from '../../store/AuthSlice';
import { selectAuth } from '../../store';
import UserIcon from '../UserIcon';
import messages from '../../constants/messages';
import ROUTES from '../../constants/routes';

import styles from './Header.module.css';

const Header = () => {
  const { isLoggedIn, user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutClicked = () => {
    dispatch(logoutUser());
    toast.info(messages.LOGOUT_SUCCESSFUL);
  };

  const onCreatePostClicked = () => {
    history.push(ROUTES.POST_FORM);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>
          Projector
          <span className={styles['title__sub-text']}>V2</span>
        </h1>
      </Link>

      <div className={styles['right-content']}>

        { !isLoggedIn && (
        <>
          <NavLink to="/login">
            <button type="button" className={styles['header__nav-btn']}>Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button type="button" className={styles['header__nav-btn']}>Signup</button>
          </NavLink>
        </>
        ) }

        { isLoggedIn && (
          <>
            <div className={styles['user-icon']}>
              <UserIcon user={user} />
            </div>
            <button
              type="button"
              className={styles['header__nav-btn']}
              onClick={onCreatePostClicked}
            >
              + &nbsp;Create Post
            </button>
            <button
              type="button"
              className={styles['header__nav-btn']}
              onClick={onLogoutClicked}
            >
              Logout
            </button>
          </>
        ) }

      </div>
    </header>
  );
};

export default Header;

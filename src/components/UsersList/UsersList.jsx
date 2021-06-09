import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { selectUsers, selectAuth } from '../../store';
import { addUsers } from '../../store/UsersSlice';

import User from '../User';
import styles from './UsersList.module.css';

import { USERS_URL } from '../../constants/api';
import messages from '../../constants/messages';
import { get, deleteCall } from '../../utils/apiCalls';

const UsersList = () => {
  const users = useSelector(selectUsers);
  const { token } = useSelector(selectAuth);
  const dispatch = useDispatch();

  function handleUsersFetchComplete(data) {
    dispatch(addUsers(data));
  }

  function fetchUsers() {
    get(USERS_URL)
      .then((res) => handleUsersFetchComplete(res.data));
  }

  const onDelete = (userId) => {
    const url = `${USERS_URL}/${userId}`;
    const headers = { Authorization: `Bearer ${token}` };

    deleteCall(url, headers)
      .then(() => {
        toast.success(messages.USER_DELETE_SUCCESSFULL);
        fetchUsers();
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(fetchUsers, []);

  return (
    <div className={styles['users-list']}>
      { users.map((user) => (
        <User
          key={user.id}
          user={user}
          onDelete={onDelete}
        />
      )) }
    </div>
  );
};

export default UsersList;

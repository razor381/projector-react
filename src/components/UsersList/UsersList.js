import { useState, useEffect } from 'react';

import User from '../User';
import styles from './UsersList.module.css';

import { USERS_URL } from '../../constants/api';
import { getApiCall } from '../../utils/callApi';

const UsersList = () => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    getApiCall(USERS_URL)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className={styles['users-list']}>
      { users.map((user) => <User key={user.id} user={user} />) }
    </div>
  );
};

export default UsersList;

import React from 'react';
import { Cancel as CancelIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import Card from '../dumb/Card';
import UserIcon from '../UserIcon';
import { User as IUser } from '../../store/UsersSlice';
import { ADMIN } from '../../constants/global';
import { selectAuth } from '../../store';

import styles from './User.module.css';

interface UserProps {
  user: IUser;
  onDelete: (id: string) => void;
}

const User: React.FC<UserProps> = (props) => {
  const { user, onDelete } = props;
  const {
    id, name, email,
  } = user;

  const { user: loggedInUser } = useSelector(selectAuth);

  const showDeleteBtn = (loggedInUser.role === ADMIN) && (loggedInUser.id !== id);

  return (
    <Card>
      <div className={styles['user-content']}>
        <div className={styles['user__left-content']}>
          <UserIcon user={user} />
        </div>
        <div className={styles['user__right-content']}>
          <p className={styles.name}>
            {`${name} (${id})`}
          </p>
          <p className={styles.email}>{ email }</p>
        </div>
        {showDeleteBtn && (
        <button
          type="button"
          className={styles['delete-btn']}
          onClick={() => onDelete(id)}
        >
          <CancelIcon className={styles['delete-btn__icon']} />
        </button>
        )}
      </div>
    </Card>
  );
};

export default User;

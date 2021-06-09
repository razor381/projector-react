import React from 'react';

import { User as IUser } from '../../store/UsersSlice';
import styles from './UserIcon.module.css';

interface IProps {
  user: IUser;
  isTiny?: boolean;
}

const UserIcon: React.FC<IProps> = ({ user, isTiny = false }) => {
  const { name } = user;

  /**
   * @TODO replace with user photo url from api
   */
  const userPhoto = 'https://randomuser.me/api/portraits/men/74.jpg';

  return (
    <img
      alt={name}
      src={userPhoto}
      className={`${styles.photo} ${isTiny ? styles['photo--tiny'] : null}`}
    />
  );
};

export default UserIcon;

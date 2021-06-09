import Card from '../dumb/Card';

import styles from './User.module.css';

const User = (props) => {
  const {
    id,
    name,
    email,
  } = props.user;

  const userPhoto = 'https://randomuser.me/api/portraits/men/74.jpg';

  return (
    <Card>
      <div className={styles['user-content']}>
        <div className={styles['user__left-content']}>
          <img
            alt={name}
            src={userPhoto}
            className={styles.photo}
          />
        </div>
        <div className={styles['user__right-content']}>
          <p className={styles.name}>{ name } ( {id} )</p>
          <p className={styles.email}>{ email }</p>
        </div>
      </div>
    </Card>
  );
}

export default User;

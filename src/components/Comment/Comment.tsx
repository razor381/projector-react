import React, { MouseEvent } from 'react';

import UserIcon from '../UserIcon';
import styles from './Comment.module.css';
import { IComment } from '../../store/PostsSlice';
import { User as IUser } from '../../store/UsersSlice';

interface IProps {
  comment: IComment;
  loggedInUser: IUser;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Comment: React.FC<IProps> = (props) => {
  const { comment, onDelete, loggedInUser } = props;
  const { user } = comment;

  const isSelfComment = () => user.id === loggedInUser.id;

  return (
    <div className={styles['comment-group']}>
      <UserIcon isTiny user={user} />
      <div className={styles['comment-text']}>
        <p className={styles['comment-username']}>{user.name}</p>
        <p className={styles.comment}>{comment.comment}</p>
        { isSelfComment() && (
        <div className={styles['comment-control']}>
          <button
            type="button"
            className={styles['control-btn']}
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

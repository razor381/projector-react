import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import { Send as SendIcon } from '@material-ui/icons';

import UserIcon from '../UserIcon';
import { User as IUser } from '../../store/UsersSlice';

import styles from './CommentField.module.css';

interface IProps {
  onSubmit: (comment: string) => void;
  user: IUser;
}

const CommentField: React.FC<IProps> = (props) => {
  const { onSubmit, user } = props;
  const [comment, setComment] = useState('');

  const onCommentInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['field-container']}>
      <UserIcon user={user} isTiny />
      <input
        value={comment}
        onChange={onCommentInput}
        placeholder="Enter your comment..."
        className={styles['input-field']}
        required
      />
      <button type="submit" className={styles['submit-btn']}>
        <SendIcon className={styles['submit-comment-icon']} />
      </button>
    </form>
  );
};

export default CommentField;

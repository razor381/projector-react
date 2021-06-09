import React from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import Card from '../dumb/Card';
import UserIcon from '../UserIcon';
import CommentSection from '../CommentSection';

import styles from './Post.module.css';
import { IPost } from '../../store/PostsSlice';
import { User as IUser } from '../../store/UsersSlice';

function getFormattedDate(dateTime: string) {
  const date = new Date(dateTime);
  return `${date.toLocaleTimeString()} - ${date.toDateString()}`;
}

interface IProps {
  post: IPost;
  loggedInUser?: IUser;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Post: React.FC<IProps> = (props) => {
  const {
    post, loggedInUser, onEdit, onDelete,
  } = props;

  const {
    id,
    user,
    name,
    description,
    image_cover: imageCover,
    updated_at: updatedAt,
  } = post;

  const isSelfUser = () => loggedInUser && loggedInUser.id === user.id;

  const handleOnDelete = () => onDelete(id);

  const handleOnEdit = () => onEdit(id);

  const imageSrc = `http://localhost:3000/img/posts/${imageCover}`;

  return (
    <Card>
      <div className={styles['post-content']}>
        <div className={styles['post-header']}>
          <UserIcon user={user} />
          <div className={styles['post-header__info']}>
            <p className={styles['user-name']}>{ user.name }</p>
            <p className={styles['post-created']}>{ getFormattedDate(updatedAt) }</p>
          </div>

          {loggedInUser && isSelfUser() && (
          <div className={styles['post-header__control']}>
            <button
              type="button"
              className={styles['post-control-btn']}
              onClick={handleOnEdit}
            >
              <EditIcon className={`${styles['post-control-icon']} ${styles['edit-btn']}`} />
            </button>
            <button
              type="button"
              className={styles['post-control-btn']}
              onClick={handleOnDelete}
            >
              <DeleteIcon className={`${styles['post-control-icon']} ${styles['delete-btn']}`} />
            </button>
          </div>
          )}

        </div>
        <p className={styles['post-summary']}>
          <span className={styles['post-name']}>{ name }</span>
          :&nbsp;&nbsp;
          { description }
        </p>
        <img
          alt={name}
          src={imageSrc}
          className={styles['post-image']}
        />
        <CommentSection post={id} />
      </div>
    </Card>
  );
};

export default Post;

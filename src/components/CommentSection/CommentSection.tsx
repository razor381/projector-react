import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CommentField from '../CommentField';
import Comment from '../Comment';

import styles from './CommentSection.module.css';
import { selectAuth } from '../../store';
import { IComment } from '../../store/PostsSlice';
import {
  get, post as postCall, deleteCall, putCall,
} from '../../utils/apiCalls';
import { POST_COMMENTS_URL, COMMENTS_URL } from '../../constants/api';
import messages from '../../constants/messages';

interface IProps {
  post: string;
}

const CommentSection: React.FC<IProps> = (props) => {
  const { post } = props;
  const { isLoggedIn, user, token } = useSelector(selectAuth);
  const [comments, useComments] = useState<IComment[]>([]);

  function getComments() {
    get(POST_COMMENTS_URL(post)).then((res) => useComments(res.data));
  }

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmitComment: (comment: string) => void = async (comment) => {
    const payload = { comment };
    const headers = { Authorization: `Bearer ${token}` };
    const url = POST_COMMENTS_URL(post);

    try {
      const response = await postCall(url, payload, headers);
      useComments((prevState) => [{ ...response.data, user }, ...prevState]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  function getUrlAndHeaders(commentId: string) {
    const url = `${COMMENTS_URL}/${commentId}`;
    const headers = { Authorization: `Bearer ${token}` };

    return { url, headers };
  }

  const handleEditComment = (commentId: string) => {
    const { url, headers } = getUrlAndHeaders(commentId);

    putCall(url, headers)
      .then(() => {
        toast.success(messages.COMMENT_EDIT_SUCCESSFUL);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleDeleteComment = (commentId: string) => {
    const { url, headers } = getUrlAndHeaders(commentId);

    deleteCall(url, headers)
      .then((res) => {
        if (!res.ok) {
          throw new Error(messages.DELETE_COMMENT_ERROR);
        }

        toast.success(messages.DELETE_COMMENT_SUCCESSFUL);
        getComments();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className={styles['comment-section']}>
      {
        isLoggedIn
        && (<CommentField user={user} onSubmit={handleSubmitComment} />)
      }

      {
        comments.map((comment: IComment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            loggedInUser={user}
          />
        ))
      }
    </div>
  );
};

export default CommentSection;

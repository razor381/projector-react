import React from 'react';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../../components/Forms/Post';

import { putCall, post } from '../../utils/apiCalls';
import { POSTS_URL } from '../../constants/api';
import messages from '../../constants/messages';
import ROUTES from '../../constants/routes';
import { addPost } from '../../store/PostsSlice';
import { selectAuth } from '../../store';

const PostFormPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);
  const headers = { Authorization: `Bearer ${token}` };
  let postId = null;

  if (location.state && location.state.postId) {
    postId = location.state.postId;
  }

  const onEdit = (postData) => {
    putCall(`${POSTS_URL}/${postId}`, postData, headers)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message || messages.EDIT_POST_ERROR);
        }

        toast.success(messages.EDIT_POST_SUCCESSFULL);
        history.push(ROUTES.HOME);
      })
      .catch((err) => toast.error(err.message));
  };

  const onCreate = async (postData) => {
    const response = await post(POSTS_URL, postData, headers);

    if (response.error || !response.data) {
      return toast.error(response.error.message);
    }

    dispatch(addPost(response.data));
    toast.success(messages.CREATE_POST_SUCCESSFUL);
    return history.push(ROUTES.HOME);
  };

  return (
    <div className="form-container">
      <PostForm onEdit={onEdit} onCreate={onCreate} postId={postId} />
    </div>
  );
};

export default PostFormPage;

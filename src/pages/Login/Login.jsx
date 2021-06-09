import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from '../../components/Forms/LoginForm';

import { post } from '../../utils/apiCalls';
import { LOGIN_URL } from '../../constants/api';
import ROUTES from '../../constants/routes';
import messages from '../../constants/messages';
import { setCookie } from '../../utils/Cookies';
import { loginUser } from '../../store/AuthSlice';

/**
 * @TODO Refactor login, signup form into single form handler.
 */

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginHandler = async (loginData) => {
    const response = await post(LOGIN_URL, loginData);

    if (response.error || !response.data) {
      return toast.error(response.error.message);
    }

    setCookie(response.data.token);

    dispatch(loginUser(response.data));
    toast.success(messages.LOGIN_SUCCESSFUL);
    return history.push(ROUTES.HOME);
  };

  return (
    <div className="form-container">
      <LoginForm onSubmit={loginHandler} />
    </div>
  );
};

export default Login;

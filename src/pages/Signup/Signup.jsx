import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignupForm from '../../components/Forms/Signup';

import { setCookie } from '../../utils/Cookies';
import { post } from '../../utils/apiCalls';
import { SIGNUP_URL } from '../../constants/api';
import messages from '../../constants/messages';
import ROUTES from '../../constants/routes';
import { loginUser } from '../../store/AuthSlice';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const signupHandler = async (signupData) => {
    const response = await post(SIGNUP_URL, signupData);

    if (response.error || !response.data) {
      return toast.error(response.error.message);
    }

    setCookie(response.data.token);
    dispatch(loginUser(response.data));
    toast.success(messages.SIGNUP_SUCCESSFUL);
    return history.push(ROUTES.HOME);
  };

  return (
    <div className="form-container">
      <SignupForm onSubmit={signupHandler} />
    </div>
  );
};

export default Signup;

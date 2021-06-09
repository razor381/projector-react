import React, { useEffect } from 'react';
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import ROUTES from './constants/routes';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import GuardRoute from './components/GuardRoute';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import PostFormPage from './pages/PostFormPage';

import './index.css';

import { PROFILE_URL } from './constants/api';
import { get } from './utils/apiCalls';
import { getToken } from './utils/LocalStorage';
import { loginUser } from './store/AuthSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();

    if (token) {
      const authHeader = {
        Authorization: `Bearer ${token}`,
      };

      get(PROFILE_URL, authHeader)
        .then((res) => {
          if (res.error) {
            throw new Error(res.error.message);
          }

          dispatch(loginUser({
            user: res.data,
            token,
          }));
        })
        .catch((err) => toast.error(err.message));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path={ROUTES.BASE} exact>
          <Redirect to={ROUTES.HOME} />
        </Route>
        <Route path={ROUTES.HOME}><HomePage /></Route>
        <GuardRoute
          exact
          unauthenticated
          path={ROUTES.LOGIN}
          component={LoginPage}
        />
        <GuardRoute
          exact
          unauthenticated
          path={ROUTES.SIGNUP}
          component={SignupPage}
        />
        <GuardRoute
          exact
          path={ROUTES.POST_FORM}
          component={PostFormPage}
        />
      </Switch>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
        rtl={false}
      />
    </BrowserRouter>
  );
}

export default App;

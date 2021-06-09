import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../store';
import ROUTES from '../../constants/routes';

interface IProps {
  path: string;
  exact: boolean;
  component: React.FC;
  unauthenticated?: boolean;
}

const GuardRoute: React.FC<IProps> = (props) => {
  const {
    path,
    exact,
    component,
    unauthenticated = false,
  } = props;

  const { isLoggedIn } = useSelector(selectAuth);

  if (unauthenticated) {
    return !isLoggedIn
      ? <Route path={path} exact={exact} component={component} />
      : <Redirect to={ROUTES.HOME} />;
  }

  return isLoggedIn
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to={ROUTES.LOGIN} />;
};

export default GuardRoute;

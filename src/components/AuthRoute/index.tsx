import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';

export interface IAuthRouteProps {
  children: React.ReactChild;
}

const AuthRoute: FC<IAuthRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    logging.warn('No user detected, redirecting');
    return <Redirect to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user?.username ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
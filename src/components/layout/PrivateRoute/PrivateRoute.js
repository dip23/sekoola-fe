import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  // const userData = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.isLogin);

  return authenticated ? (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  ) : (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
}

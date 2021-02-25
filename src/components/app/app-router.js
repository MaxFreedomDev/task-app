import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes";
import { LOGIN_ROUTE, TASKS_ROUTE } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../../store/action-creators/auth";

const AppRouter = () => {
  const { authentication } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return authentication ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} exact={true} key={path} />
      ))}
      <Redirect to={TASKS_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} exact={true} key={path} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;

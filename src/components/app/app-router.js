import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { publicRoutes } from "../../routes";
import { TASKS_ROUTE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { checkToken } from "../../store/action-creators/auth";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} exact={true} key={path} />
      ))}
      <Redirect to={TASKS_ROUTE} />
    </Switch>
  );
};

export default AppRouter;

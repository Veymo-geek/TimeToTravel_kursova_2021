import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

import { tourStore } from "../store";
import { authStore } from "../store";

const PAGES = [
  {
    path: "/",
    component: () => {
      return <Home tourStore={tourStore} />;
    },
  },
  {
    path: "/auth/login",
    component: () => {
      return <Login authStore={authStore} />;
    },
  },
  {
    path: "/auth/registration",
    component: () => {
      return <Registration authStore={authStore} />;
    },
  },
];

const Routes = () => {
  const routes = PAGES.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));
  return (
    <div>
      <Switch>{routes}</Switch>
    </div>
  );
};

export default Routes;

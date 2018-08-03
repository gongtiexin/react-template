import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./app.less";
import { routes } from "../../router/routes";
import { PrivateRoute } from "../../router/feature";
import { isProduction } from "../../utils/constants";
import If from "../common/If/If";
import Loadable from "../common/Loadable/Loadable";

const LoadableNoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "route-login" */ "../common/NoMatch/NoMatch"),
});

@inject("store")
@withRouter
@observer
export default class App extends Component {
  renderRoute = ({ path, component }) => (
    <PrivateRoute key={path} path={path} component={component} exact />
  );

  render() {
    return (
      <div id="app">
        <img src="/static/images/logo.svg" alt="logo" />
        <Fragment>
          <If when={!isProduction}>
            <DevTools />
          </If>
          <Switch>
            {routes.map(this.renderRoute)}
            <Route component={LoadableNoMatch} />
          </Switch>
        </Fragment>
      </div>
    );
  }
}

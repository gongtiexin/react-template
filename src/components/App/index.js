import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./index.less";
import { routes } from "../../router";
import { PrivateRoute } from "../../router/feature";
import { isProduction } from "../../utils/constants";
import Loadable from "../common/Loadable";

const LoadableNoMatch = Loadable({
  loader: () =>
    import(/* webpackChunkName: "route-no-match" */ "../common/NoMatch"),
});

@inject(({ store: { demoState } }) => ({ demoState }))
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
          {do {
            if (!isProduction) {
              <DevTools />;
            }
          }}
          <Switch>
            {routes.map(this.renderRoute)}
            <Route component={LoadableNoMatch} />
          </Switch>
        </Fragment>
      </div>
    );
  }
}

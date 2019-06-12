import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
// 代升级
// import DevTools from "mobx-react-devtools";
import "./index.less";
import { routes } from "../../router";
import { PrivateRoute } from "../../router/feature";
import { isProduction } from "../../utils/constants";
import Loadable from "../common/Loadable";

const LoadableMismatch = Loadable({
  loader: () =>
    import(/* webpackChunkName: "route-mismatch" */ "../common/Mismatch"),
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
        {/* {!isProduction && <DevTools />} */}
        <Switch>
          {routes.map(this.renderRoute)}
          <Route component={LoadableMismatch} />
        </Switch>
      </div>
    );
  }
}

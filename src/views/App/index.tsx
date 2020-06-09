import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import "./index.less";
import { routes } from "@routes/index";
import { PrivateRoute, PrivateRouteProps } from "@routes/feature";
import Loadable from "@components/Loadable";

const LoadableMismatch = Loadable({
  loader: () => import(/* webpackChunkName: "route-mismatch" */ "@components/Mismatch"),
});

@inject(({ store: { globalStore } }) => ({ globalStore }))
@observer
export default class App extends Component {
  static propTypes = {
    globalStore: PropTypes.object.isRequired,
  };

  renderRoute = ({ path, component }: PrivateRouteProps) => (
    <PrivateRoute key={path} path={path} component={component} exact />
  );

  render() {
    const {
      // globalStore: { list },
    } = this.props;

    return (
      <div id="app">
        <Switch>
          {routes.map(this.renderRoute)}
          <Route component={LoadableMismatch} />
        </Switch>
      </div>
    );
  }
}

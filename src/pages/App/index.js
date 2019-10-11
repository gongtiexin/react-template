import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './index.less';
import { routes } from '../../router';
import { PrivateRoute } from '../../router/feature';
import Loadable from '../../components/Loadable';

const LoadableMismatch = Loadable({
  loader: () => import(/* webpackChunkName: "route-mismatch" */ '../../components/Mismatch'),
});

@inject(({ store: { globalStore } }) => ({ globalStore }))
@withRouter
@observer
export default class App extends Component {
  static propTypes = {
    globalStore: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.globalStore.getMsg();
  }

  renderRoute = ({ path, component }) => (
    <PrivateRoute key={path} path={path} component={component} exact />
  );

  render() {
    const {
      globalStore: { msg },
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

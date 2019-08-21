import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loadable from './components/Loadable';

const LoadableApp = Loadable({
  loader: () => import(/* webpackChunkName: "route-root" */ './pages/app'),
});

// eslint-disable-next-line react/prop-types
const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={LoadableApp} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;

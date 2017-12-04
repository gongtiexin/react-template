import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools'
import routes from '../routes';

@inject('store')
@withRouter
@observer
export default class App extends Component {
  render() {
    return (
      <div>
        <DevTools />
        {routes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            component={component}
            exact
          />
        ))}
      </div>
    );
  }
}

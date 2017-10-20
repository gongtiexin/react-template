import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import uuid from 'uuid/v4';
import LazyRoute from 'lazy-route';
import routes from '../routes';

@inject('store')
@withRouter
@observer
export default class App extends Component {
  render() {
    return (
      <div>
        前端项目模板
        {routes.map(({ path, component, componentUrl }) => (
          <Route
            key={uuid()}
            path={path}
            // component={route.component}
            exact
            render={props => (
              <LazyRoute {...props} component={import(componentUrl)} />
            )}
          />
        ))}
      </div>
    );
  }
}

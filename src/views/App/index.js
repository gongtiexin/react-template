import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '@src/router';
import Loadable from '@src/components/Loadable';
import './index.less';

const LoadableMismatch = Loadable({
    loader: () => import(/* webpackChunkName: "route-mismatch" */ '../../components/Mismatch')
});

const App = () => {
    const renderRoute = ({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
    );

    return (
        <div id="app">
            <Switch>
                {routes.map(renderRoute)}
                <Route component={LoadableMismatch} />
            </Switch>
        </div>
    );
};

export default App;

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       单页应用的入口文件
 * */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { hotRehydrate, rehydrate } from 'rfx-core';
import moment from 'moment';
import 'normalize.css';
import Loadable from './components/common/Loadable';
import { isProduction } from './utils/constants';
import './stores';
import './styles/global.less';

/**
 * 代码拆分和按需加载
 */
const LoadableApp = Loadable({
  loader: () => import(/* webpackChunkName: "route-root" */ './components/App'),
});

/**
 * moment时区设置为中国
 */
moment.locale('zh-cn');

const store = rehydrate();

const renderApp = () => {
  render(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Router>
        <Switch>
          <Route path="/" component={LoadableApp} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(renderApp);
  }
}

run();

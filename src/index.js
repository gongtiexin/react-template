/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       单页应用的入口文件
 * */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { hotRehydrate, rehydrate } from 'rfx-core';
import moment from 'moment';
import 'normalize.css';
import { isProduction } from './utils/constants';
import './stores';
import './styles/main.less';
import Xfyun from './components/demo/Xfyun';

/**
 * moment时区设置为中国
 */
moment.locale('zh-cn');

const store = rehydrate();

const renderApp = () => {
  render(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Xfyun />
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

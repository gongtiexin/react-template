import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { hotRehydrate, rehydrate } from 'rfx-core';
import { Settings } from 'luxon';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { isProduction } from './utils/constants';
import App from './components/App';
import './stores/stores';
import './styles/main.less';

Settings.defaultLocale = 'zh-CN';
const store = rehydrate();

const renderApp = () => {
  render(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Router>
        <LocaleProvider locale={zhCN}>
          <App />
        </LocaleProvider>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(() => renderApp());
  }
}

run();

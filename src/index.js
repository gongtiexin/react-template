import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { hotRehydrate, rehydrate } from 'rfx-core';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { isProduction } from './utils/constants';
import App from './components/App';
import './styles/main.less';

moment.locale('zh-cn');
const store = rehydrate();

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={isProduction ? store : hotRehydrate()}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

function run() {
  renderApp(App);
  if (module.hot) {
    module.hot.accept(() => renderApp(App));
  }
}

run();

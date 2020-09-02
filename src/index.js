import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@src/store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'dayjs/locale/zh-cn';
import IntlProvider from '@src/components/IntlProvider';
import Loadable from '@src/components/Loadable';
import 'normalize.css';
import '@src/assets/styles/global.less';

const LoadableApp = Loadable({
    loader: () => import(/* webpackChunkName: "route-root" */ './views/App')
});

// const LoadableLogin = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "route-login" */ "./components/Login"),
// });

const renderApp = () => {
    render(
        <Provider store={store}>
            <IntlProvider>
                <ConfigProvider locale={zhCN}>
                    <Router>
                        <Switch>
                            {/*<Route path="/login" component={LoadableLogin} exact />*/}
                            <Route path="/" component={LoadableApp} />
                        </Switch>
                    </Router>
                </ConfigProvider>
            </IntlProvider>
        </Provider>,
        document.getElementById('root')
    );
};

function run() {
    renderApp();
    if (module.hot) {
        module.hot.accept(renderApp);
    }
}

run();

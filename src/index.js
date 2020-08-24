import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import "mobx-react-lite/batchingOptOut";
import store from "@src/stores";
import Loadable from "@src/components/Loadable";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import "dayjs/locale/zh-cn";
import "normalize.css";
import "@src/assets/style/global.less";

/**
 * 代码拆分和按需加载
 */
const LoadableApp = Loadable({
  loader: () => import(/* webpackChunkName: "route-root" */ "./views/App"),
});

// const LoadableLogin = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "route-login" */ "./components/Login"),
// });

const renderApp = () => {
  render(
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            {/*<Route path="/login" component={LoadableLogin} exact />*/}
            <Route path="/" component={LoadableApp} />
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>,
    document.getElementById("root")
  );
};

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(renderApp);
  }
}

run();

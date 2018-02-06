import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { hotRehydrate, rehydrate } from "rfx-core";
import { Settings } from "luxon";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { isProduction } from "../shared/utils/constants";
import "../shared/stores/stores";
import "../shared/styles/main.less";
import Loadable from "../shared/components/common/Loadable";

const LoadableApp = Loadable({
  loader: () =>
    import(/* webpackChunkName: "loadable-app" */ "../shared/components/App")
});

/**
 * luxon时区设置为中国
 */
Settings.defaultLocale = "zh-CN";

const store = rehydrate();

const renderApp = () => {
  render(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Router>
        <LocaleProvider locale={zhCN}>
          <Route path="/" component={LoadableApp} />
        </LocaleProvider>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
};

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(() => renderApp());
  }
}

run();

import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import ReactLoadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack/server/webpack.server.config";
import { isProduction } from "../shared/utils/constants";
import App from "../shared/components/App";
import store from "../shared/stores/stores";
import stats from "../../dist/react-loadable.json";

const compiler = webpack(config);
const initStore = store.inject();

const app = express();
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));

const initScript = () => {
  if (isProduction) {
    return `
    <script src="/assets/app.js"></script>
    <script src="/assets/vendor.js"></script>
    <script src="/assets/runtime.js"></script>
    `;
  }
  return '<script src="bundle.js"></script>';
};

const initStylesheet = () => {
  if (isProduction) {
    return `
    <link href="/stylesheets/app-one.css" rel="stylesheet">
    <link href="/stylesheets/app-two.css" rel="stylesheet">
    `;
  }
  return "";
};

const initHtml = (html, styles, scripts) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>前端项目模板</title>
    ${styles
      .map(style => `<link href="/${style.file}" rel="stylesheet"/>`)
      .join("\n")}
  </head>
  <body>
  <div id="root">${html}</div>
  ${scripts.map(bundle => `<script src="/${bundle.file}"></script>`).join("\n")}
  <script>window.main();</script>
  </body>
  </html>
  `;

app.get("*", (req, res) => {
  const modules = [];
  const initView = renderToString(
    <Provider store={initStore}>
      <Router location={req.url} context={{}}>
        <ReactLoadable.Capture report={moduleName => modules.push(moduleName)}>
          <App />
        </ReactLoadable.Capture>
      </Router>
    </Provider>
  );
  const bundles = getBundles(stats, modules);
  const styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
  const scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
  res.status(200).send(initHtml(initView, styles, scripts));
});

app.get("*", (req, res) => {
  res.status(404).send("Server.js > 404 - Page Not Found");
});

app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url, next);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on("uncaughtException", evt => {
  console.log("uncaughtException: ", evt);
});

ReactLoadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });

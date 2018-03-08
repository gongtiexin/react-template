import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import ReactLoadable, { Capture } from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack/server/webpack.server.config";
// import { isProduction } from "../shared/utils/constants";
import App from "../shared/components/App/App";
import store from "../shared/stores/stores";
import stats from "../../dist/react-loadable.json";

// fix TypeError: require.ensure is not a function
const proto = Object.getPrototypeOf(require);
!proto.hasOwnProperty("ensure") &&
  Object.defineProperties(proto, {
    ensure: {
      value: function ensure(modules, callback) {
        callback(this);
      },
      writable: false,
    },
    include: {
      value: function include() {},
      writable: false,
    },
  });

const compiler = webpack(config);
const initStore = store.inject();

const app = express();

// 托管静态文件到虚拟目录
app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));

const mapStyle = ({ file }) => `<link href="/${file}" rel="stylesheet"/>`;

const mapScript = ({ file }) => `<script src="/${file}"></script>`;

const initHtml = (html, styles, scripts) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>前端项目模板</title>
    ${styles.map(mapStyle).join("\n")}
    <link href="/stylesheets/extract-less.css" rel="stylesheet">
    <!--<link href="/stylesheets/extract-css.css" rel="stylesheet">-->
  </head>
  <body>
  <div id="root">${html}</div>
  ${scripts.map(mapScript).join("\n")}
  </body>
  </html>
  `;

app.get("*", (req, res) => {
  const modules = [];
  const initView = renderToString(
    <Provider store={initStore}>
      <Router location={req.url} context={{}}>
        <Capture report={moduleName => modules.push(moduleName)}>
          <App />
        </Capture>
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

ReactLoadable.preloadAll()
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });

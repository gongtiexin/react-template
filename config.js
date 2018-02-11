const path = require("path");

const entry = path.resolve(__dirname, "./src/client/index");
const ssrEntry = path.resolve(__dirname, "./src/server/index");
const indexHtml = path.resolve(__dirname, "./index.html");
const root = path.resolve(__dirname);
const srcRoot = path.resolve(__dirname, "./src");
const distRoot = path.resolve(__dirname, "./dist");
const staticRoot = path.resolve(__dirname, "./static");
const distStatic = path.resolve(__dirname, "./dist/static");

module.exports = {
  build: {
    env: {
      NODE_ENV: "production",
      CLIENT: true,
      SERVER: false,
    },
    entry: {
      app: entry,
      ssrApp: ssrEntry,
      vendor: [
        "babel-polyfill",
        "react",
        "react-dom",
        "react-router-dom",
        "mobx",
        "mobx-react",
      ],
      html: indexHtml,
      srcRoot,
      staticRoot,
    },
    output: {
      path: distRoot,
      staticRoot: distStatic,
      publicPath: "/",
    },
    plugins: {
      CopyWebpackPlugin: [
        {
          from: staticRoot,
          to: distStatic,
          ignore: ["html/loading/*.*", "html/login/*.*"],
        },
      ],
      ReactLoadablePlugin: {
        filename: path.resolve(__dirname, "./dist/react-loadable.json"),
      },
    },
  },
  dev: {
    env: {
      NODE_ENV: "development",
      CLIENT: true,
      SERVER: false,
    },
    devServer: {
      port: 3000,
    },
    entry: {
      app: entry,
      html: indexHtml,
    },
    output: {
      path: distRoot,
      publicPath: "/",
    },
  },
  root,
  modifyVars: {
    "icon-url": "'/static/antdIconfont/iconfont'",
  },
};

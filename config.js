/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置参数
 * */

const path = require("path");

const entry = path.resolve(__dirname, "./src/client/index");
const ssrEntry = path.resolve(__dirname, "./src/server/index");
const indexHtml = path.resolve(__dirname, "./index.html");
const root = path.resolve(__dirname);
const srcPath = path.resolve(__dirname, "./src");
const distPath = path.resolve(__dirname, "./dist");
const staticPath = path.resolve(__dirname, "./static");
const distStaticPath = path.resolve(__dirname, "./dist/static");
const nodeModulesPath = path.resolve(__dirname, "./node_modules");

module.exports = {
  webpack: {
    build: {
      env: {
        NODE_ENV: "production",
        CLIENT: true,
        SERVER: false,
      },
      vendor: [
        "babel-polyfill",
        "react",
        "react-dom",
        "react-router-dom",
        "mobx",
        "mobx-react",
      ],
      plugins: {
        CopyWebpackPlugin: [
          {
            from: staticPath,
            to: distPath,
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
    },
    publicPath: "/",
  },
  path: {
    entry,
    ssrEntry,
    indexHtml,
    srcPath,
    distPath,
    staticPath,
    distStaticPath,
    nodeModulesPath,
  },
  root,
  modifyVars: {
    "icon-url": "'/static/antdIconfont/iconfont'",
  },
};

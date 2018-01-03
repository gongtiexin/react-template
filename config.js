const path = require("path");

module.exports = {
  build: {
    env: {
      NODE_ENV: "production",
      CLIENT: true,
      SERVER: false
    },
    entry: {
      app: path.resolve(__dirname, "./src/client"),
      vendor: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"],
      html: path.resolve(__dirname, "./index.html"),
      srcRoot: path.resolve(__dirname, "./src"),
      staticRoot: path.resolve(__dirname, "./static")
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      staticRoot: path.resolve(__dirname, "./dist/static"),
      publicPath: "/"
    },
    plugins: {
      CopyWebpackPlugin: [
        {
          from: path.resolve(__dirname, "./static"),
          to: path.resolve(__dirname, "./dist/static"),
          ignore: ["html/loading/*.*", "html/login/*.*"]
        }
      ]
    }
  },
  dev: {
    env: {
      NODE_ENV: "development",
      CLIENT: true,
      SERVER: false
    },
    devServer: {
      port: 2000
    },
    entry: {
      app: path.resolve(__dirname, "./src/client"),
      html: path.resolve(__dirname, "./index.html")
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/"
    }
  },
  root: path.resolve(__dirname),
  modifyVars: {
    "icon-url": "'/static/antdIconfont/iconfont'"
  }
};

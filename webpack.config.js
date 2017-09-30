const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require('package')(module);
let proxy = "192.168.32.104";
//let proxy = "localhost";
process.argv.forEach(function (item) {
  if (item.indexOf("proxy") !== -1) {
    proxy = item.split("=")[1]
  }
});

console.log('proxy: ' + proxy);

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "webpack/hot/only-dev-server",
    "babel-polyfill",
    "whatwg-fetch",
    "./src/index"
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname),
    port: 3000,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      "/sign": {
        target: `http://${proxy}:20030`,
        changeOrigin: true,
      },
      "/api": {
        target: `http://${proxy}:20030`,
        changeOrigin: true,
      },
      "/geoesb": {
        target: "http://183.230.17.27:8081",
        changeOrigin: true,
      },
    }
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react"],
          plugins: [
            "transform-async-to-generator",
            "transform-decorators-legacy",
            ["import", {"libraryName": "antd", "style": true}],
            "react-hot-loader/babel"
          ]
        }
      },
      {
        test: /\.less|css$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader", options: {
            modifyVars: package.modifyVars,
          } // compiles Less to CSS
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({hash: false, template: "./index.hbs"}),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ]
};

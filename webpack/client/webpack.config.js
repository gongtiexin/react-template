const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../../config");

const proxy = "localhost";

module.exports = {
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${config.dev.devServer.port}`,
    "webpack/hot/only-dev-server",
    "babel-polyfill",
    config.dev.entry.app
  ],
  devServer: {
    hot: true,
    contentBase: config.root,
    port: config.dev.devServer.port,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      "/sign": {
        target: `http://${proxy}:20011`,
        changeOrigin: true
      },
      "/api": {
        target: `http://${proxy}:20011`,
        changeOrigin: true
      },
      "/pubapi": {
        target: `http://${proxy}:38081`,
        changeOrigin: true
      }
    }
  },
  output: {
    path: config.dev.output.path,
    publicPath: config.dev.output.publicPath,
    filename: "app.[hash].js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: config.modifyVars
            }
          }
        ]
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
    // 配置的全局常量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(config.dev.env.NODE_ENV)
      }
    }),
    // 显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: config.dev.entry.html })
  ]
};

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack开发环境配置
 * */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

const config = require("./config");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  resolve: config.webpack.common.resolve,
  devServer: {
    hot: true,
    contentBase: config.path.root,
    port: config.webpack.dev.devServer.port,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    quiet: true,
    proxy: {
      "/redpeak": {
        target: `http://192.168.1.221:26181/`,
        changeOrigin: true,
      },
    },
  },
  entry: config.path.entry,
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.common.publicPath,
    filename: "app.[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 覆盖less中的全局变量
                modifyVars: config.webpack.common.modifyVars,
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: config.path.lessVariablesPath,
              injector: "append",
            },
          },
        ],
      },
      // 处理图片(file-loader来处理也可以，url-loader更适合图片)
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/images/[name].[hash:7].[ext]",
        },
      },
      // 处理多媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/media/[name].[hash:7].[ext]",
        },
      },
      // 处理字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/fonts/[name].[hash:7].[ext]",
        },
      },
    ],
  },
  plugins: [
    // 清理webpack编译时输出的无用信息
    new FriendlyErrorsWebpackPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html模板
    new HtmlWebpackPlugin(config.webpack.common.plugins.HtmlWebpackPlugin),
    new AntdDayjsWebpackPlugin(),
  ],
};

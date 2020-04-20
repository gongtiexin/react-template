/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack开发环境配置
 * */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

const apiMocker = require("webpack-api-mocker");
const config = require("./config");

module.exports = {
  mode: "development",
  resolve: config.webpack.common.resolve,
  entry: config.path.entryPath,
  devServer: {
    hot: true,
    contentBase: config.path.rootPath,
    port: config.webpack.dev.devServer.port,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    quiet: true,
    before(app) {
      apiMocker(app, config.path.mockPath, {
        changeHost: true
      });
    },
    proxy: {
      "/api": {
        target: `https://unidemo.dcloud.net.cn`,
        changeOrigin: true
      }
    }
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.common.publicPath,
    filename: "app.[hash].js"
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["thread-loader", "babel-loader"],
        include: config.path.srcPath
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
              // less@3
              javascriptEnabled: true,
              // 覆盖antd样式的全局变量
              modifyVars: config.webpack.common.modifyVars
            }
          }
        ]
      },
      // 处理图片(file-loader来处理也可以，url-loader更适合图片)
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/images/[name].[hash:7].[ext]"
        }
      },
      // 处理多媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/media/[name].[hash:7].[ext]"
        }
      },
      // 处理字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/assets/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    // 清理webpack编译时输出的无用信息
    new FriendlyErrorsWebpackPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html模板
    new HtmlWebpackPlugin(config.webpack.common.plugins.HtmlWebpackPlugin),
    new AntdDayjsWebpackPlugin()
  ]
};

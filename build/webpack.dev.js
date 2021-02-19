const portfinder = require('portfinder');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const apiMocker = require('mocker-api');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('./path');

module.exports = () =>
  new Promise((resolve, reject) => {
    portfinder
      .getPortPromise({
        port: 3000, // minimum port
        stopPort: 3999, // maximum port
      })
      .then((port) => {
        resolve(
          merge(common, {
            mode: 'development',
            devtool: 'eval-source-map',
            devServer: {
              hot: true,
              contentBase: path.root,
              port: port,
              host: '0.0.0.0',
              publicPath: '/',
              historyApiFallback: true,
              disableHostCheck: true,
              quiet: true,
              before(app) {
                apiMocker(app, path.mock, {
                  changeHost: true,
                });
              },
              proxy: {
                '/api': {
                  target: `https://unidemo.dcloud.net.cn`,
                  changeOrigin: true,
                },
              },
            },
            output: {
              filename: 'app.[hash].js',
            },
            module: {
              rules: [
                {
                  test: /\.less|css$/,
                  use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'postcss-loader',
                    },
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                          javascriptEnabled: true,
                        },
                      },
                    },
                    {
                      loader: 'style-resources-loader',
                      options: {
                        patterns: path.lessVariables,
                        injector: 'append',
                      },
                    },
                  ],
                },
              ],
            },
            plugins: [new FriendlyErrorsWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
          })
        );
      })
      .catch((err) => {
        // Could not get a free port, `err` contains the reason.
        console.log(err);
      });
  });

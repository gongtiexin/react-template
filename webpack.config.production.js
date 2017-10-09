const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const package = require('package')(module);

module.exports = {
  entry: {
    vendor: ["react", "react-dom", "react-router", "mobx", "mobx-react", "antd", "echarts"],
    app: ["babel-polyfill", "./src/index"]
    // app: "./src/index"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "assets/[name].[hash].js",
    chunkFilename: "assets/[name].[chunkhash].js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loader: "babel-loader",
        query: {
          presets: [
            ["es2015", {"modules": false}],
            "stage-0",
            "react",
          ],
          plugins: [
            "transform-async-to-generator",
            "transform-decorators-legacy",
            ["import", {"libraryName": "antd", "style": true}]
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        // screw_ie8: true,
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin("assets/styles.css"),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.hbs"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist/static'),
        //ignore: ['*.js']
      }
    ]),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

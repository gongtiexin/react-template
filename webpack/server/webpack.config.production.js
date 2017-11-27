const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('../../config');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'antd',
      'axios',
      'echarts',
      'history',
      'lodash',
      'react',
      'mobx',
      'mobx-react',
      'react-dom',
      'react-router-dom',
    ],
    app: ['babel-polyfill', './src/client'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader']),
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([{
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            // 覆盖antd样式的全局变量
            modifyVars: config.modifyVars,
          },
        },
        ]),
      },
      // {
      //   test: /\.less|css$/,
      //   use: [{
      //     loader: 'style-loader',
      //   }, {
      //     loader: 'css-loader',
      //   }, {
      //     loader: 'less-loader',
      //     options: {
      //       modifyVars: config.modifyVars,
      //     },
      //   }],
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      minChunks: Infinity,
    }),
    // 多入口
    // new webpack.optimize.CommonsChunkPlugin({
    //   // ( 公共chunk(commnons chunk)的名称)
    //   name: 'commons',
    //   // ( 公共chunk的文件名)
    //   filename: 'commons.[chunkhash:4].js',
    //   // (模块必须被3个入口chunk共享)
    //   minChunks: 3,
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      // (选择所有被选chunks的子chunks)
      children: true,
      // (异步加载)
      async: true,
      // (在提取之前需要至少三个子chunk共享这个模块)
      minChunks: 3,
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        minimize: true,
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true,
          unused: true,
        },
      },
    }),
    extractCSS,
    extractLESS,
    // new HtmlWebpackPlugin({
    //   hash: false,
    //   template: './index.hbs',
    // }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist/static'),
        // ignore: ['*.js']
      },
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

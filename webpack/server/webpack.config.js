const webpack = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const config = require('../../config');

module.exports = {
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "babel-polyfill",
    config.dev.entry.app
  ],
  output: {
    path: config.dev.output.path,
    publicPath: config.dev.output.publicPath,
    filename: '[name].[chunkhash:4].js',
    chunkFilename: '[name].[chunkhash:4].child.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less|css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: config.modifyVars,
          },
        }],
      },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.dev.env.NODE_ENV),
        __CLIENT__: JSON.stringify(config.dev.env.CLIENT),
        __SERVER__: JSON.stringify(config.dev.env.SERVER),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      // (选择所有被选chunks的子chunks)
      children: true,
      // (异步加载)
      async: true,
      // (在提取之前需要至少三个子chunk共享这个模块)
      minChunks: 3,
    }),
    new ReactLoadablePlugin({
      filename: config.build.plugins.ReactLoadablePlugin.filename,
    }),
  ],
};

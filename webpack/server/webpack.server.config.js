const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const extractCSS = new ExtractTextPlugin({
  filename: "stylesheets/extract-css.css",
  allChunks: true,
});
const extractLESS = new ExtractTextPlugin({
  filename: "stylesheets/extract-less.css",
  allChunks: true,
});
const config = require("../../config");

module.exports = {
  resolve: {
    alias: {
      proptypes: "proptypes/disabled",
    },
  },
  entry: {
    vendor: config.webpack.build.vendor,
    app: ["babel-polyfill", config.path.ssrEntry],
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.publicPath,
    filename: "assets/[name].[chunkhash].js",
    chunkFilename: "assets/[name].[chunkhash].child.js",
  },
  context: config.path.srcPath,
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: config.path.srcPath,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader", "postcss-loader"]),
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              // 覆盖antd样式的全局变量
              modifyVars: config.modifyVars,
            },
          },
        ]),
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
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(config.webpack.build.env.NODE_ENV),
        __CLIENT__: JSON.stringify(config.webpack.build.env.CLIENT),
        __SERVER__: JSON.stringify(config.webpack.build.env.SERVER),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "runtime"],
      minChunks: Infinity,
    }),
    // 多入口
    // new webpack.optimize.CommonsChunkPlugin({
    //   // ( 公共chunk(commnons chunk)的名称)
    //   name: 'commons',
    //   // ( 公共chunk的文件名)
    //   filename: 'assets/commons.[chunkhash:4].js',
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
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //   },
    //   output: {
    //     comments: false,
    //   },
    // }),
    extractCSS,
    extractLESS,
    // new CopyWebpackPlugin(config.webpack.build.plugins.CopyWebpackPlugin),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ReactLoadablePlugin({
      filename: config.build.plugins.ReactLoadablePlugin.filename,
    }),
  ],
};

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
  filename: "stylesheets/[name].[contenthash]-css.css",
  allChunks: true,
});
const extractLESS = new ExtractTextPlugin({
  filename: "stylesheets/[name].[contenthash]-less.css",
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
    app: ["babel-polyfill", config.path.entry],
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.publicPath,
    filename: "assets/[name].[chunkhash].js",
    chunkFilename: "assets/[name].[chunkhash].child.js",
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
        use: extractCSS.extract([
          "css-loader",
          // 启用css modules
          // "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]",
          "postcss-loader",
        ]),
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([
          "css-loader",
          // 启用css modules
          // "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]",
          "postcss-loader",
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
    // 分析打包的结构
    new BundleAnalyzerPlugin(),
    // 使得哈希基于模块的相对路径, 生成一个四个字符的字符串作为模块ID
    new webpack.HashedModuleIdsPlugin(),
    // 配置的全局常量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(config.webpack.build.env.NODE_ENV),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "runtime"],
      // 没有应用程序模块将包含在这个块中
      minChunks: Infinity,
    }),
    // 多入口
    // new webpack.optimize.CommonsChunkPlugin({
    //   // ( 公共chunk(commnons chunk)的名称)
    //   name: 'commons',
    //   // ( 公共chunk的文件名)
    //   filename: 'assets/commons.[chunkhash].js',
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
    new LodashModuleReplacementPlugin(),
    // 压缩代码
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
    new HtmlWebpackPlugin({
      hash: false,
      template: config.path.indexHtml,
    }),
    new CopyWebpackPlugin(config.webpack.build.plugins.CopyWebpackPlugin),
    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 去除moment中除“zh-cn”之外的所有语言环境, “en”内置于Moment中，不能删除
    new MomentLocalesPlugin({
      localesToKeep: ["zh-cn"],
    }),
  ],
};

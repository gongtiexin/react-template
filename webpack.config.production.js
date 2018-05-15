/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack生产环境配置
 * */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const config = require("./config");

module.exports = {
  mode: "production",
  resolve: {
    modules: [config.path.nodeModulesPath],
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              // 覆盖antd样式的全局变量
              modifyVars: config.modifyVars,
            },
          },
        ],
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          // 最紧凑的输出
          beautify: false,
          compress: {
            // 删除所有的 `console` 语句
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        common: {
          // 抽离自己写的公共代码
          chunks: "initial",
          name: "common", // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
        },
      },
    },
  },
  plugins: [
    // 分析打包的结构
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({ filename: "stylesheets/[name].css" }),
    // 使得哈希基于模块的相对路径, 生成一个四个字符的字符串作为模块ID
    new webpack.HashedModuleIdsPlugin(),
    // html模板
    new HtmlWebpackPlugin({
      hash: false,
      template: config.path.indexHtml,
    }),
    // 拷贝静态资源
    new CopyWebpackPlugin(config.webpack.build.plugins.CopyWebpackPlugin),
    // 去除moment中除“zh-cn”之外的所有语言环境, “en”内置于Moment中，不能删除
    new MomentLocalesPlugin({
      localesToKeep: ["zh-cn"],
    }),
  ],
};

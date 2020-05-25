/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack生产环境配置
 * */

const webpack = require("webpack");
const postcssPresetEnv = require("postcss-preset-env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

const config = require("./config");

// 测量各个插件和loader所花费的时间
// const smp = new SpeedMeasurePlugin();

const webpackConfig = {
  mode: "production",
  resolve: config.webpack.common.resolve,
  entry: {
    app: config.path.entryPath,
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.common.publicPath,
    filename: "assets/[name].[chunkhash].js",
    chunkFilename: "assets/[name].[chunkhash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["thread-loader", "babel-loader"],
        include: config.path.srcPath,
      },
      {
        test: /\.less|css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv(/* pluginOptions */)],
            },
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
  optimization: {
    minimizer: [
      // 用于优化js文件
      new TerserPlugin(),
      // 用于优化css文件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          // safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            // 移除注释
            removeAll: true,
          },
        },
        canPrint: true,
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, // 设置优先级，首先抽离第三方模块
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1, // 最少引入了1次
        },
        // 缓存组
        common: {
          // 公共模块
          chunks: "initial",
          name: "common",
          minSize: 100, // 大小超过100个字节
          minChunks: 3, // 最少引入了3次
        },
      },
    },
  },
  plugins: [
    // 分析打包的结构
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].[contenthash].css",
      chunkFilename: "stylesheets/[id].[contenthash].css",
    }),
    // 使得哈希基于模块的相对路径, 生成一个四个字符的字符串作为模块ID
    new webpack.HashedModuleIdsPlugin(),
    // html模板
    new HtmlWebpackPlugin(config.webpack.common.plugins.HtmlWebpackPlugin),
    // new InlineManifestWebpackPlugin("runtime"),
    // 拷贝静态资源
    new CopyWebpackPlugin(config.webpack.build.plugins.CopyWebpackPlugin),
    new CleanWebpackPlugin(),
    new AntdDayjsWebpackPlugin(),
  ],
};

// module.exports = smp.wrap(webpackConfig);
module.exports = webpackConfig;

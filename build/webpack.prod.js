const webpack = require("webpack");
const postcssPresetEnv = require("postcss-preset-env");
// const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("./path");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "assets/[name].[chunkhash].js",
    chunkFilename: "assets/[name].[chunkhash].chunk.js",
  },
  module: {
    rules: [
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
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.lessVariables,
              injector: "append",
            },
          },
        ],
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
    // new InlineManifestWebpackPlugin("runtime"),
    // 拷贝静态资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.staticResources,
          to: path.outputStaticResources,
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
});

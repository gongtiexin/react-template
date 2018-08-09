/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack生产环境配置
 * */

const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
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
    app: ["babel-polyfill", config.path.entry],
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.publicPath,
    filename: "assets/[name].[chunkhash].js",
    chunkFilename: "assets/[name].[chunkhash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: config.path.srcPath,
        use: "happypack/loader?id=babel",
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      // },
      // {
      //   test: /\.less$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     {
      //       loader: "less-loader",
      //       options: {
      //         // less@3
      //         javascriptEnabled: true,
      //         // 覆盖antd样式的全局变量
      //         modifyVars: config.modifyVars,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.less|css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              // less@3
              javascriptEnabled: true,
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
          // {
          //   loader: "image-webpack-loader",
          //   options: {
          //     progressive: true,
          //     optimizationLevel: 7,
          //     interlaced: false,
          //     pngquant: {
          //       quality: "65-90",
          //       speed: 4,
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        // 过滤掉以".min.js"结尾的文件，默认这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        exclude: /\.min\.js$/,
        cache: true,
        // 多进程并行运行来提高构建速度
        parallel: true,
        sourceMap: false,
        // 移除注释
        extractComments: false,
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
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
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minSize: 30000,
          minChunks: 1,
          chunks: "initial",
          // 设置处理的优先级，数值越大越优先处理
          priority: 1,
        },
        commons: {
          name: "commons",
          minSize: 30000,
          minChunks: 3,
          chunks: "initial",
          priority: -1,
          // 允许我们使用已经存在的代码块
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // 多进程
    new HappyPack({
      id: "babel",
      loaders: ["babel-loader"],
    }),
    // 分析打包的结构
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].css",
      chunkFilename: "stylesheets/[id].css",
    }),
    // 使得哈希基于模块的相对路径, 生成一个四个字符的字符串作为模块ID
    new webpack.HashedModuleIdsPlugin(),
    // html模板
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: config.path.indexHtml,
    }),
    new InlineManifestWebpackPlugin("runtime"),
    // 拷贝静态资源
    new CopyWebpackPlugin(config.webpack.build.plugins.CopyWebpackPlugin),
    // 去除moment中除“zh-cn”之外的所有语言环境, “en”内置于Moment中，不能删除
    new MomentLocalesPlugin({
      localesToKeep: ["zh-cn"],
    }),
  ],
};

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置参数
 * */

const path = require('path');

const entryPath = path.resolve(__dirname, '../src/index');
const indexHtmlPath = path.resolve(__dirname, '../index.html');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const mockPath = path.resolve(__dirname, '../mock/index.js');
const staticPath = path.resolve(__dirname, '../static');
const distStaticPath = path.resolve(__dirname, '../dist/static');
const nodeModulesPath = path.resolve(__dirname, '../node_modules');

// alias
const componentsPath = path.resolve(__dirname, '../src/components');
const utilsPath = path.resolve(__dirname, '../src/utils');

module.exports = {
  webpack: {
    common: {
      publicPath: '/',
      resolve: {
        extensions: ['.js', '.vue'],
        modules: ['node_modules'],
        alias: {
          '@components': componentsPath,
          '@utils': utilsPath,
        },
      },
      modifyVars: {
        // "primary-color": "#1890ff",
      },
      plugins: {
        HtmlWebpackPlugin: {
          filename: 'index.html',
          template: indexHtmlPath,
          title: 'react-template',
        },
      },
      // node_modules里面需要被转换为es5的库
      esModulesPaths: [],
    },
    build: {
      env: {
        NODE_ENV: 'production',
      },
      vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
      plugins: {
        CopyWebpackPlugin: [
          {
            from: staticPath,
            to: distStaticPath,
          },
        ],
      },
    },
    dev: {
      env: {
        NODE_ENV: 'development',
      },
      devServer: {
        port: 3000,
      },
    },
  },
  path: {
    rootPath,
    entryPath,
    indexHtmlPath,
    srcPath,
    distPath,
    mockPath,
    staticPath,
    distStaticPath,
    nodeModulesPath,
  },
};

import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { dehydrate } from 'rfx-core';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import developConfig from '../webpack/server/webpack.config';
import productionConfig from '../webpack/server/webpack.config.production';
import { isProduction } from './utils/constants';
import App from './components/App';
import './stores/stores';

const config = isProduction ? productionConfig : developConfig;
const compiler = webpack(config);
const initialStore = dehydrate();

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const initScript = () => {
  if (isProduction) {
    return `
    <script src="/assets/bundle.js"></script>
    <script src="/assets/vendor.js"></script>
    <script src="/assets/runtime.js"></script>
    `;
  }
  return '<script src="bundle.js"></script>';
};

const initHtml = html => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>前端项目模板</title>
  </head>
  <body>
  <div id="root">${html}</div>
  ${initScript()}
  </body>
  </html>
`;

app.get('*', (req, res) => {
  const initView = renderToString((
    <Provider store={initialStore}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </Provider>
  ));

  res.status(200)
    .send(initHtml(initView));
});

app.get('*', (req, res) => {
  res.status(404)
    .send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
  console.error('Error on request %s %s', req.method, req.url);
  console.error(err.stack);
  res.status(500)
    .send('Server error');
});

process.on('uncaughtException', (evt) => {
  console.log('uncaughtException: ', evt);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

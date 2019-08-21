import React from 'react';
import dva from 'dva';
import { createBrowserHistory } from 'history';
import models from './models';
import RouterConfig from './route';

// Initialize
const app = dva({
  history: createBrowserHistory(),
});

// Model
models.forEach(model => app.model(model));

// Router
app.router(RouterConfig);

// Start
app.start('#root');

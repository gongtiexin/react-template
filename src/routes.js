/**
 * 配置路由
 */
import Loadable from './components/common/Loadable';

const routes = [{
  path: '/test',
  component: Loadable({
    loader: () => import(/* webpackChunkName: "Test" */ './components/Test'),
  }),
}, {
  path: '/test1',
  component: Loadable({
    loader: () => import(/* webpackChunkName: "Test1" */ './components/Test1'),
  }),
}, {
  path: '/test2',
  component: Loadable({
    loader: () => import(/* webpackChunkName: "Test2" */ './components/Test2'),
  }),
}];

const breadcrumbNameMap = {
  '/route': 'label',
};

export { routes, breadcrumbNameMap };

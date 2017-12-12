/**
 * 配置路由
 */
import Test from './components/Test';

const routes = [{
  path: '/ssr',
  component: Test,
}];

const breadcrumbNameMap = {
  '/route': 'label',
};

export { routes, breadcrumbNameMap };

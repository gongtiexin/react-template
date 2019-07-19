/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */

import Loadable from '../components/common/Loadable';

const routes = [
  {
    path: '/',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-home" */ '../components/demo/TestEcharts'),
    }),
  },
];

const breadcrumbNameMap = {
  '/route': 'label',
};

export { routes, breadcrumbNameMap };

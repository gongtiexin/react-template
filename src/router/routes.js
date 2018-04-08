/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */

import Loadable from "../components/common/Loadable/Loadable";

const routes = [
  {
    path: "/test",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-traffic-flow" */ "../components/Compass/CompassComponent"),
    }),
  },
  {
    path: "/echarts",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-echarts" */ "../components/demo/TestEcharts"),
    }),
  },
  {
    path: "/test2",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-inject" */ "../components/demo/TestInject"),
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

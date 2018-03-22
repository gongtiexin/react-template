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
        import(/* webpackChunkName: "route-test-style" */ "../components/demo/TestStyle"),
      // modules: ["../components/test/TestStyle"],
      // webpack: () => [require.resolveWeak("../components/test/TestStyle")],
    }),
  },
  {
    path: "/echarts",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-echarts" */ "../components/demo/TestEcharts"),
      // modules: ["../components/test/TestEcharts"],
      // webpack: () => [require.resolveWeak("../components/test/TestEcharts")],
    }),
  },
  {
    path: "/test2",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-inject" */ "../components/demo/TestInject"),
      // modules: ["../components/test/TestInject"],
      // webpack: () => [require.resolveWeak("../components/test/TestInject")],
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

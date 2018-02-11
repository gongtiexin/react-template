/**
 * 配置路由
 */
import Loadable from "../components/common/Loadable";

const routes = [
  {
    path: "/test",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test" */ "../components/test/Test"),
    }),
  },
  {
    path: "/echarts",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-echarts" */ "../components/test/TestEcharts"),
    }),
  },
  {
    path: "/test2",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-test-inject" */ "../components/test/TestInject"),
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

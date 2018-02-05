/**
 * 配置路由
 */
import Loadable from "./components/common/Loadable";

const routes = [
  {
    path: "/test",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "test" */ "./components/Test")
    })
  },
  {
    path: "/echarts",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "test-echarts" */ "./components/TestEcharts")
    })
  },
  {
    path: "/test2",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "test-2" */ "./components/Test2")
    })
  }
];

const breadcrumbNameMap = {
  "/route": "label"
};

export { routes, breadcrumbNameMap };

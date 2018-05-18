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
        import(/* webpackChunkName: "route-test-echarts" */ "../components/demo/TestInject"),
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

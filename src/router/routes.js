/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */

import Loadable from "../components/common/Loadable/Loadable";

const routes = [
  {
    path: "/",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-home" */ "../components/demo/HelloWord"),
    }),
    protect: false,
  },
  {
    path: "/login",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-login" */ "../components/common/Login/Login"),
    }),
    protect: false,
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

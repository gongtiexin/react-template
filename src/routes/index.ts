/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */

import Loadable from "../components/Loadable";

const routes: any[] = [
  {
    path: "/home",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-root" */ "@views/Home"),
    }),
  },
  {
    path: "/document/manage",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-root" */ "@views/Document"),
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

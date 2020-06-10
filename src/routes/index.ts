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
      loader: () => import(/* webpackChunkName: "route-home" */ "@views/Home"),
    }),
  },
  {
    path: "/document/manage",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-document-manage" */ "@views/Document"),
    }),
  },
];

const breadcrumbNameMap = {
  "/route": "label",
};

export { routes, breadcrumbNameMap };

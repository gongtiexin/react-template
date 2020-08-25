import Loadable from '@src/components/Loadable';

const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "route-root" */ '../views/Example')
        })
    }
];

export default routes;

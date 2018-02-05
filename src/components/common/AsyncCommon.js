import Loadable from "./Loadable";

const asyncFtBreadcrumb = Loadable({
  loader: () =>
    import(/* webpackChunkName: "async-ft-breadcrumb" */ "./FtBreadcrumb")
});

const asyncHighlight = Loadable({
  loader: () => import(/* webpackChunkName: "async-highlight" */ "./Highlight")
});

const asyncPagination = Loadable({
  loader: () =>
    import(/* webpackChunkName: "async-pagination" */ "./Pagination")
});

export { asyncFtBreadcrumb, asyncHighlight, asyncPagination };

import React, { Suspense, lazy } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import "./index.less";

const Loading = () => (
  <div className="loadable-box">
    <p>Loading...</p>
  </div>
);

const Loadable = (props: { loader: () => Promise<any> | any }) => () => {
  const LoadableComponent = lazy(props.loader);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LoadableComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Loadable;

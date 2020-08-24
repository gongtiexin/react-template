import React, { Suspense, lazy } from "react";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "./index.less";

const Loading = () => (
  <div>
    <p>Loading...</p>
  </div>
);

const Loadable = (option) => (props) => {
  const LoadableComponent = lazy(option.loader);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LoadableComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Loadable;

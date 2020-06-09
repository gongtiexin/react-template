/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       react-loadable
 * */

import React from "react";
import ReactLoadable, { LoadingComponentProps } from "react-loadable";
import "./index.less";

const Loading = ({ error, timedOut, pastDelay }: LoadingComponentProps) => {
  if (error) {
    return (
      <div className="loadable-box">
        <p>Error!</p>
      </div>
    );
  }
  if (timedOut) {
    return (
      <div className="loadable-box">
        <p>Taking a long time...</p>
      </div>
    );
  }
  if (pastDelay) {
    return (
      <div className="loadable-box">
        <p>Loading...</p>
      </div>
    );
  }
  return null;
};

const Loadable = (opts: { loader: () => Promise<any> | any }) =>
  ReactLoadable({
    loading: Loading,
    delay: 300,
    timeout: 10000,
    ...opts,
  });

export default Loadable;

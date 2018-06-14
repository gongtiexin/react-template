/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       react-loadable
 * */

import React from "react";
import ReactLoadable from "react-loadable";
import PropTypes from "prop-types";
import "./loadable.less";

const Loading = props => {
  if (props.error) {
    return (
      <div className="loadable-box">
        <p>Error!</p>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div className="loadable-box">
        <p>Taking a long time...</p>
      </div>
    );
  } else if (props.pastDelay) {
    return (
      <div className="loadable-box">
        <p>Loading...</p>
      </div>
    );
  }
  return null;
};

Loading.propTypes = {
  error: PropTypes.object,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};

const Loadable = opts =>
  ReactLoadable({
    loading: Loading,
    delay: 300,
    timeout: 10000,
    ...opts,
  });

export default Loadable;

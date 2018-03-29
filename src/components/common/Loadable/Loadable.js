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
    return <h2 className="loadable-loading">Error!</h2>;
  } else if (props.timedOut) {
    return <h2 className="loadable-loading">Taking a long time...</h2>;
  } else if (props.pastDelay) {
    return <h2 className="loadable-loading">Loading...</h2>;
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

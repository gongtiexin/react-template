import React from "react";
import PropTypes from "prop-types";

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

export default Loading;

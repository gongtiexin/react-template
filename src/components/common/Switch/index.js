/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/6/25         gongtiexin       Switch组件可以根据指定的值渲染不同的组件
 * */

import React from "react";
import PropTypes from "prop-types";

const Case = ({ children }) => {
  return children;
};

const Default = ({ children }) => {
  return children;
};

const Switch = ({ value, children }) => {
  let defaultComponent = null;
  let caseComponent = null;
  React.Children.forEach(children, child => {
    if (child.type === Default) {
      defaultComponent = child;
    } else if (child.type === Case && value === child.props.when) {
      caseComponent = child;
    }
  });
  if (caseComponent) {
    return caseComponent;
  } else if (defaultComponent) {
    return defaultComponent;
  }
  return null;
};

Switch.propTypes = {
  value: PropTypes.any.isRequired,
};

export default Switch;

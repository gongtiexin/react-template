/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/6/25         gongtiexin       If组件可以使用一个when属性来控制组件是否渲染
 * */

import PropTypes from "prop-types";

const If = ({ when, children }) => {
  if (when) {
    return children;
  }
  return null;
};

If.propTypes = {
  when: PropTypes.any.isRequired,
};

export default If;

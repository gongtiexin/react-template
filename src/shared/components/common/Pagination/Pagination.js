/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       分页组件
 * */

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Pagination as AntdPagination } from "antd";
import PropTypes from "prop-types";

@inject("store")
@observer
export default class Pagination extends Component {
  static propTypes = {
    paginationProps: PropTypes.shape({
      pageSize: PropTypes.number,
      currentPage: PropTypes.number,
      totalElements: PropTypes.number,
      showSizeChanger: PropTypes.bool,
      onChange: PropTypes.func,
    }),
  };

  static defaultProps = {
    paginationProps: {
      pageSize: 10,
      currentPage: 1,
      totalElements: 0,
      showSizeChanger: false,
      onChange: (_page, _size) => console.log(_page, _size),
    },
  };

  onShowSizeChange = (current, pageSize) => {
    this.props.paginationProps.onChange(current, pageSize);
  };

  onChange = (pageNumber, pageSize) => {
    this.props.paginationProps.onChange(pageNumber, pageSize);
  };

  showTotal = total => `共 ${total || 0} 条`;

  render() {
    const {
      pageSize,
      currentPage,
      totalElements,
      showSizeChanger,
    } = this.props.paginationProps;

    return (
      <AntdPagination
        current={currentPage}
        pageSize={pageSize}
        className="fe-float-right fe-margin-nomal fe-clear"
        showSizeChanger={showSizeChanger || false}
        onShowSizeChange={this.onShowSizeChange}
        showQuickJumper
        onChange={this.onChange}
        showTotal={this.showTotal}
        total={totalElements}
      />
    );
  }
}

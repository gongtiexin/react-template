/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       分页组件
 * */

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Pagination as AntdPagination } from "antd";
import PropTypes from "prop-types";
import "./index.less";

@inject("store")
@observer
export default class Pagination extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    totalElements: PropTypes.number,
    showSizeChanger: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    pageSize: 10,
    currentPage: 1,
    totalElements: 0,
    showSizeChanger: false,
    handleChange: (page, size) => console.log(`page:${page}, size:${size}`),
  };

  onShowSizeChange = (current, pageSize) => {
    this.props.handleChange({ page: current, size: pageSize });
  };

  onChange = (pageNumber, pageSize) => {
    this.props.handleChange({ page: pageNumber, size: pageSize });
  };

  showTotal = total => `共 ${total || 0} 条`;

  render() {
    const { pageSize, currentPage, totalElements, showSizeChanger } = this.props;

    return (
      <AntdPagination
        current={currentPage}
        pageSize={pageSize}
        className="rs-pagination"
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

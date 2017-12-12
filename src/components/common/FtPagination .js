/**
 * 分页组件
 * @params  paginationProps = {
 *      pageSize: number,
 *      currentPage: number,
 *      totalElements: number,
 *      showSizeChanger: boole,
 *      onChange: (page, size) => {},
 *    };
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Pagination } from 'antd';

@inject('store')
@observer
export default class FtPagination extends Component {
  onShowSizeChange = (current, pageSize) => {
    this.props.paginationProps.onChange(current, pageSize);
  };

  onChange = (pageNumber, pageSize) => {
    this.props.paginationProps.onChange(pageNumber, pageSize);
  };

  showTotal = total => `共 ${total || 0} 条`;

  render() {
    const { pageSize, currentPage, totalElements, showSizeChanger } = this.props.paginationProps;

    return (
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        className="fe-pull-right fe-margin fe-clear"
        showSizeChanger={showSizeChanger}
        onShowSizeChange={this.onShowSizeChange}
        showQuickJumper
        onChange={this.onChange}
        showTotal={this.showTotal}
        total={totalElements}
      />
    );
  }
}

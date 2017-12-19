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
import PropTypes from 'prop-types';

@inject('store')
@observer
export default class Pagination extends Component {
  static propTypes = {
    paginationProps: PropTypes.object.isRequired,
  };

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
        className="fe-float-right fe-margin-nomal fe-clear"
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

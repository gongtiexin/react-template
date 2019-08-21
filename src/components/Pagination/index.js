/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       分页组件
 * */

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Pagination as AntdPagination } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

@inject('store')
@observer
export default class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    showSizeChanger: PropTypes.bool,
  };

  static defaultProps = {
    pageSize: 10,
    showSizeChanger: false,
  };

  onShowSizeChange = (current, pageSize) => {
    const { handleChange } = this.props;
    handleChange({ page: current, size: pageSize });
  };

  onChange = (pageNumber, pageSize) => {
    const { handleChange } = this.props;
    handleChange({ page: pageNumber, size: pageSize });
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

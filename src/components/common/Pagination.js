import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Pagination} from 'antd';

@inject("store")
@observer
export default class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  showTotal = (total) => {
    return `共 ${total || 0} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    this.props.paginationProps.onChange(current, pageSize)
  };

  onChange = (pageNumber, pageSize) => {
    this.props.paginationProps.onChange(pageNumber, pageSize);
  };

  render() {

    const {pageSize, currentPage, totalElements, showSizeChanger} = this.props.paginationProps;

    return (
      <Pagination
        current={currentPage + 1}
        pageSize={pageSize}
        className="fe-pull-right fe-margin fe-clear"
        showSizeChanger={showSizeChanger}
        onShowSizeChange={this.onShowSizeChange}
        showQuickJumper
        onChange={this.onChange}
        showTotal={this.showTotal}
        total={totalElements}/>
    )
  }
}
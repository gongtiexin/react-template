/**
 * Created by hldev on 17-5-26.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'antd';
import uuid from 'uuid/v1';

@inject('store')
@observer
export default class HlBreadcrumb extends Component {
  render() {
    const items = this.props.breadcrumb.map((item) => {
      if (item.path) {
        return (
          <Breadcrumb.Item key={uuid}>
            <Link to={item.path}>{item.name}</Link>
          </Breadcrumb.Item>
        );
      }
      return <Breadcrumb.Item key={uuid}>{item.name}</Breadcrumb.Item>;
    });

    return (
      <div>
        <Breadcrumb className="fe-breadcrumb">
          {items}
        </Breadcrumb>
      </div>
    );
  }
}

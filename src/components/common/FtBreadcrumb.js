/**
 * 面包屑导航,根据route.js生成
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'antd';
import { breadcrumbNameMap, routes } from '../../routes';

@inject('store')
@observer
export default class FtBreadcrumb extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const pathSnippets = pathname.split('/')
      .filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1)
        .join('/')}`;

      if (!routes.find(({ path }) => path === url)) {
        return (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = [(
      <Breadcrumb.Item key="app">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {breadcrumbItems}
      </Breadcrumb>
    );
  }
}

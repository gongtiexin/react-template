import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, Route, Switch } from 'dva/router';
import './index.less';
import Loadable from '../../components/Loadable';

const { Header, Sider, Content } = Layout;
const LoadableText = Loadable({
  loader: () => import(/* webpackChunkName: "components-text" */ '../../components/Text'),
});

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(prevCollapsed => !prevCollapsed);

  return (
    <Layout id="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/nav/1">
              <Icon type="user" />
              <span>nav 1</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/nav/2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/nav/1" component={() => <LoadableText value="/nav/1" />} />
            <Route path="/nav/2" component={() => <LoadableText value="/nav/2" />} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

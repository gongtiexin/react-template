import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Layout, Menu, Avatar, Space, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { routes } from "@routes/index";
import { PrivateRoute, PrivateRouteProps } from "@routes/feature";
import Loadable from "@components/Loadable";
import "./index.less";

const { Header, Content, Footer } = Layout;

const LoadableMismatch = Loadable({
  loader: () => import(/* webpackChunkName: "route-mismatch" */ "@components/Mismatch"),
});

const renderRoute = ({ path, component, isAuthenticated }: PrivateRouteProps) => (
  <PrivateRoute key={path} path={path} component={component} isAuthenticated={isAuthenticated} exact />
);

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        退出登陆
      </a>
    </Menu.Item>
  </Menu>
);

const App = inject(({ store: { authStore } }) => ({ authStore }))(
  observer((props: { authStore: any }) => {
    const {
      authStore: { auth },
    } = props;

    console.log(auth.id);

    return (
      <Layout className="dm-app">
        <Header>
          <div className="logo">文档管理系统</div>
          <Menu mode="horizontal" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key="/home">
              <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="/document/manage">
              <Link to="/document/manage">档案管理</Link>
            </Menu.Item>
            <Menu.Item key="/account/manage">
              <Link to="/account/manage">用户管理</Link>
            </Menu.Item>
          </Menu>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Dropdown overlay={menu}>
              <span className="account-name">
                {auth.username} <DownOutlined />
              </span>
            </Dropdown>
          </Space>
        </Header>
        <Content className="site-layout">
          <Switch>
            <Redirect from="/" to="/home" exact />
            {routes.map((route) => renderRoute({ ...route, isAuthenticated: auth.id }))}
            <Route component={LoadableMismatch} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  })
);

export default React.memo(App);

import React from "react";
import { inject, observer } from "mobx-react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";

const Login = inject(({ store: { authStore } }) => ({ authStore }))(
  observer((props: { authStore: any; history: any }) => {
    const onFinish = (values: { [key: string]: any }) => {
      props.authStore.login().then(() => {
        props.history.push("/");
      });
      console.log("Received values of form: ", values);
    };

    return (
      <div id="login">
        <canvas className="particles-background" />
        <div className="login-box">
          <div className="message">文档管理系统</div>
          <div id="darkbannerwrap" />
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
              或者 <a href="">注册!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  })
);

export default React.memo(Login);

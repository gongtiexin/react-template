import React, { Component, Fragment } from "react";
import { withRouter, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { Card } from "antd";
import { routes } from "../../router/routes";

@inject("store")
@withRouter
@observer
export default class App extends Component {
  renderRoute = ({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  );

  render() {
    return (
      <Fragment>
        {/* 建议不写内链样式,这里偷懒 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "350px",
          }}
        >
          <Card style={{ width: 300 }}>
            <h2>前端项目模板</h2>
          </Card>
        </div>
        <DevTools />
        {routes.map(this.renderRoute)}
      </Fragment>
    );
  }
}

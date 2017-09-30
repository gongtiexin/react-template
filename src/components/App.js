import React, {Component} from "react";
import {Link, Redirect, Route, withRouter, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject("store")
@withRouter
@observer
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        前端项目模板
      </div>
    );
  }
}

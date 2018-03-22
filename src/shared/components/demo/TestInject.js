import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject(({ store }) => ({ demoState: store.demoState }))
@observer
export default class TestInject extends Component {
  componentDidMount() {
    this.props.demoState
      .getAjax()
      .then(
        data => console.log("success", data),
        data => console.log("error", data)
      );
    setTimeout(() => this.props.demoState.setData("data change"), 1000);
  }

  render() {
    const { data } = this.props.demoState;

    return <div>{data}</div>;
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject(({ store }) => ({ demoState: store.demoState }))
@observer
export default class TestInject extends Component {
  componentDidMount() {
    this.props.demoState
      .getAjax()
      .then(data => console.log(data), data => console.log(data));
    setTimeout(() => this.props.demoState.setData("data change"), 1000);
  }

  render() {
    const { data } = this.props.demoState;
    console.log("xxx");

    return <div>{data}</div>;
  }
}

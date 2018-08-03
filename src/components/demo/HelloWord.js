import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject(({ store: { demoState } }) => ({ demoState }))
@observer
export default class HelloWord extends Component {
  static propTypes = {
    demoState: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // this.props.demoState
    //   .getAjax()
    //   .then(data => console.log("success", data), data => console.log("error", data));
    setTimeout(() => this.props.demoState.setMsg("Hello, React"), 1000);
  }

  render() {
    const { msg } = this.props.demoState;

    return (
      <div id="helloWord">
        <h1>{msg}</h1>
      </div>
    );
  }
}

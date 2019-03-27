import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import "./index.less";
import "../../../utils/exercise/pubsub";

@inject(({ store: { demoState } }) => ({ demoState }))
@observer
export default class HelloWorld extends Component {
  static propTypes = {
    demoState: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // this.props.demoState
    //   .getAjax()
    //   .then(data => console.log("success", data), data => console.log("error", data));
    // const { demoState } = this.props;
    // setTimeout(() => demoState.setMsg("Hello, World"), 1000);
  }

  render() {
    const {
      demoState: { msg },
    } = this.props;

    const a = [{ x: 1 }];

    const b = x => console.log(x);

    return (
      <div id="helloWord">
        {/*<h1>{msg}</h1>*/}
        {/*{a.find(({ x }) => x === 6)?.x || 0 |> b}*/}
      </div>
    );
  }
}

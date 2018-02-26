import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import lodash from "lodash/join";
import highlight from "../common/Highlight";

@inject(({ store }) => ({ demoState: store.demoState }))
@observer
export default class TestInject extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {lodash(["a", "b", "c"], "~")}
        {highlight("1231231", "1")}
      </div>
    );
  }
}

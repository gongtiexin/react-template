/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/6/20           gongtiexin       404
 * */

import React, { Component } from "react";
import { observer } from "mobx-react";
import "./no-math.less";

@observer
export default class NoMatch extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="noMatch">
        <section>
          <span>404</span>
          <p>The requested path could not be found</p>
        </section>
      </div>
    );
  }
}

/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/6/20           gongtiexin       404
 * */

import React, { Component } from "react";
import { observer } from "mobx-react";
import "./index.less";

@observer
export default class NoMatch extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="noMatch">
        <section>
          <span>404</span>
          <p>抱歉，你访问的页面不存在</p>
        </section>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('store')
@withRouter
@observer
export default class App extends Component {
  render() {
    return (
      <div>
        前端项目模板
      </div>
    );
  }
}

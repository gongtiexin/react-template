import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Test extends Component {
  componentDidMount() {
    this.props.store.demoState.getData();
  }

  render() {
    return (
      <div>
        <i className="material-icons md-48">gif</i>
        {this.props.store.demoState.data}
      </div>
    );
  }
}

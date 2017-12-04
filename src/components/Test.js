import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Test extends Component {
  componentDidMount() {
    // this.props.store.demoState.getData();
  }

  render() {
    return (
      <div>
        ...
      </div>
    );
  }
}

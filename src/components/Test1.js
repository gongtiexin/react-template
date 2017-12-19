import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import lodash from 'lodash';

@inject('store')
@observer
export default class Test1 extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        {lodash.join(['a', 'b', 'c'], '~')}
      </div>
    );
  }
}

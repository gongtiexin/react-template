import React, { Component } from 'react';
import echarts from 'echarts';
import lodashIsEqual from 'lodash/isEqual';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class ReactEchart extends Component {
  constructor(props) {
    super(props);
    this.myChart = null;
  }

  componentDidMount() {
    this.myChart = echarts.init(this.eCharts);
    if (this.props.onClick) {
      this.myChart.on('click', this.props.onClick);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !lodashIsEqual(nextProps, this.props) || !lodashIsEqual(nextState, this.state);
  }

  componentWillUpdate() {
    this.myChart.clear();
  }

  componentWillUnmount() {
    this.myChart.dispose();
  }

  render() {
    if (this.props.option && this.myChart) {
      const { option } = this.props.option;
      if (option) {
        this.myChart.setOption(option);
      }
    }
    return (
      <div
        ref={(node) => {
          this.eCharts = node;
        }}
        style={this.props.option.style}
      />
    );
  }
}

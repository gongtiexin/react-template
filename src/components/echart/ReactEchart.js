/**
 * React Echarts Component
 * Created by yangbajing(yangbajing@gmail.com) on 2016-09-18.
 */
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
    if (this.props.config) {
      const { option } = this.props.config;
      if (option) {
        this.myChart.setOption(option);
      }
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
    return (
      <div
        ref={(node) => {
          this.eCharts = node;
        }}
        style={this.props.config.style || {
          width: '100%',
          height: '600px',
        }}
      />
    );
  }
}

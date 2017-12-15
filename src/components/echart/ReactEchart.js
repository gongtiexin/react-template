/**
 * React Echarts Component
 */
import React, { Component } from 'react';
import echarts from 'echarts';
import lodashIsEqual from 'lodash/isEqual';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer
export default class ReactEchart extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {
      width: '100%',
      height: '600px',
    },
  };

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
        style={this.props.style}
      />
    );
  }
}

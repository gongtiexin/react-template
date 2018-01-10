/**
 * React Echarts Component
 */
import React, { Component } from "react";
import echarts from "echarts";
import lodashIsEqual from "lodash/isEqual";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("store")
@observer
export default class ReactEchart extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    style: {
      width: "100%",
      height: "600px"
    }
  };

  constructor(props) {
    super(props);
    this.myChart = null;
    this.eCharts = null;
  }

  state = {
    isReset: false
  };

  componentDidMount() {
    this.myChart = echarts.init(this.eCharts);
    window.addEventListener("resize", this.onWindowResize);
    if (!this.state.isReset) {
      this.reset();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !lodashIsEqual(nextProps, this.props) ||
      !lodashIsEqual(nextState, this.state)
    );
  }

  // shouldComponentUpdate(nextProps) {
  //   const option = this.myChart.getOption();
  //   return option === undefined || !lodashIsEqual(option.series.map(i => i.data), nextProps.option.series.map(i => i.data));
  // }

  componentWillUpdate() {
    this.myChart.clear();
  }

  componentWillUnmount() {
    this.myChart.dispose();
    window.removeEventListener("resize", this.onWindowResize);
  }

  onWindowResize = () => {
    this.myChart.resize();
  };

  reset = () => this.setState({ isReset: true });

  render() {
    const { option } = this.props;
    if (option) {
      this.myChart.setOption(option);
    }

    return (
      <div
        ref={node => {
          this.eCharts = node;
        }}
        style={this.props.style}
      />
    );
  }
}

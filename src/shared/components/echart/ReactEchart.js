/**
 * React Echarts Component
 * option: {
 *   option: 基础配置项,
 *   data: 数据源,
 *   row: 横坐标上的属性(对于data里面的key),
 *   column: 纵坐标上的属性(对于data里面的key),
 *   value: 图上的属性(对于data里面的key),
 *   seriesTemplates: 每个series的配置
 *   }
 */
import React, { Component } from "react";
import { observer } from "mobx-react";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入常用图形图和组件
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import { computedEchartsOption } from "up-utils";
import lodashIsEqual from "lodash/isEqual";
import PropTypes from "prop-types";

@observer
export default class ReactEchart extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    style: PropTypes.object,
    action: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    style: {
      width: "100%",
      height: "600px",
    },
  };

  constructor(props) {
    super(props);
    this.myChart = null;
    this.eCharts = null;
  }

  state = {
    isReset: false,
  };

  componentDidMount() {
    this.myChart = echarts.init(this.eCharts);
    window.addEventListener("resize", this.onWindowResize);
    if (!this.state.isReset) {
      this.reset();
    }
  }

  shouldComponentUpdate(nextProps) {
    const option = this.myChart.getOption();
    return (
      option === undefined ||
      !lodashIsEqual(option.dataset, nextProps.option.dataset)
    );
  }

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
    const { option, action, onClick } = this.props;
    if (this.myChart) {
      if (option) {
        this.myChart.setOption(computedEchartsOption(option));
      }
      if (action) {
        this.myChart.dispatchAction(action);
      }
      if (onClick && typeof onClick === "function") {
        this.myChart.on("click", params => {
          onClick(params);
        });
      }
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

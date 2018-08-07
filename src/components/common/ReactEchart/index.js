/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       React Echarts Component
 *
 * option: {
 *   option: 基础配置项,
 *   data: 数据源,
 *   row: 横坐标上的属性(对于data里面的key),
 *   column: 纵坐标上的属性(对于data里面的key),
 *   value: 图上的属性(对于data里面的key),
 *   seriesTemplates: 每个series的配置
 *   }
 * */

import React, { Component } from "react";
import { observer } from "mobx-react";
import echarts from "echarts";
// 引入 ECharts 主模块
// import echarts from "echarts/lib/echarts";
// 引入常用图形图和组件
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/axis";
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
    this.eCharts = React.createRef();
  }

  state = {
    isReset: false,
  };

  componentDidMount() {
    this.myChart = echarts.init(this.eCharts.current);
    window.addEventListener("resize", this.onWindowResize);
    if (!this.state.isReset) {
      this.reset();
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     !lodashIsEqual(
  //       this.props.option.data.slice(),
  //       nextProps.option.data.slice()
  //     ) || this.state.isReset !== nextState.isReset
  //   );
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
    const { option, action, onClick } = this.props;
    if (this.myChart) {
      if (option) {
        const echartsOption = computedEchartsOption(option);
        this.myChart.setOption(echartsOption);
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

    return <div ref={this.eCharts} style={this.props.style} />;
  }
}

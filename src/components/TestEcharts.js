import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ReactEchart from "./echart/ReactEchart";
import { ECHARTS_DEFULT_OPTION } from "../utils/constants";

@inject("store")
@observer
export default class TestEcharts extends Component {
  componentDidMount() {
    setTimeout(
      () =>
        this.props.store.demoState.setEcharts([
          { x: "重庆", y: "2017", value: "555", seriesType: "bar" },
          { x: "重庆", y: "2018", value: "666", seriesType: "bar" }
        ]),
      5000
    );
  }

  render() {
    const { echarts } = this.props.store.demoState;
    return (
      <ReactEchart
        option={{
          option: ECHARTS_DEFULT_OPTION,
          data: echarts,
          row: "x",
          column: "y",
          value: "value",
          seriesTempletes: {
            bar: {
              type: "bar"
            },
            line: {
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              yAxisIndex: 1
            }
          }
        }}
      />
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ECHARTS_DEFULT_OPTION } from "../../utils/constants";
import Loadable from "../common/Loadable/Loadable";

const LoadableReactEchart = Loadable({
  loader: () =>
    import(/* webpackChunkName: "component-react-echart" */ "../common/ReactEchart/ReactEchart"),
});

@inject("store")
@observer
export default class TestEcharts extends Component {
  componentDidMount() {
    setTimeout(
      () =>
        this.props.store.demoState.setEcharts([
          { x: "重庆", y: "2017", value: "555", seriesType: "bar" },
          { x: "重庆", y: "2018", value: "666", seriesType: "bar" },
        ]),
      1000
    );
  }

  render() {
    const { echarts } = this.props.store.demoState;
    return (
      <LoadableReactEchart
        option={{
          option: ECHARTS_DEFULT_OPTION,
          data: echarts,
          row: "x",
          column: "y",
          value: "value",
          seriesTemplates: {
            bar: {
              type: "bar",
            },
            line: {
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              yAxisIndex: 1,
            },
          },
        }}
      />
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { ECHARTS_DEFULT_OPTION } from "../../../utils/constants";
import Loadable from "../../common/Loadable/index";

const LoadableReactEchart = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "component-react-echart" */ "../../common/ReactEchart"
    ),
});

@inject(({ store: { demoState } }) => ({ demoState }))
@observer
export default class TestEcharts extends Component {
  static propTypes = {
    demoState: PropTypes.object.isRequired,
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.props.demoState.setEcharts([
          { x: "重庆", y: "2017", value: "555", seriesType: "bar" },
          { x: "重庆", y: "2018", value: "666", seriesType: "bar" },
        ]),
      1000
    );
  }

  render() {
    const { echarts } = this.props.demoState;
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

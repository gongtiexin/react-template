import React, {Component} from "react";
import ReactDOM from "react-dom";
import echarts from 'echarts'
import lodashIsEqual from "lodash/isEqual"
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class ReactEchart extends Component {

  constructor(props) {
    super(props);
    this.myChart = null;
  }

  state = {
    isReset: false
  };

  componentDidMount() {
    this.myChart = echarts.init(ReactDOM.findDOMNode(this.refs.myChart));
    if (this.props.onClick) {
      this.myChart.on('click', this.props.onClick)
    }
    if (!this.state.isReset) {
      this.setState({isReset: true})
    }
  }

  componentWillUnmount() {
    this.myChart.dispose();
  }

  componentWillUpdate() {
    this.myChart.clear();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !lodashIsEqual(nextProps, this.props) || !lodashIsEqual(nextState, this.state);
  }

  render() {
    if (this.props.option && this.myChart) {
      const {option} = this.props.option;
      if (option) {
        this.myChart.setOption(option);
      }
    }
    return (
      <div ref="myChart" style={this.props.option.style}>
      </div>
    )
  }
}

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-4-3           gongtiexin        Traffic flow
 * */

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Arrow from "./Arrow";
import "./traffic-flow.less";

const arrow = new Arrow();

@inject("store")
@observer
export default class TrafficFlow extends Component {
  componentDidMount() {
    const canvas = document.getElementById("trafficFlowCanvas");
    const context = canvas.getContext("2d");
    const width = canvas.width / 3;
    const height = canvas.height / 3;
    const arrowLength = 150;
    const arrowOffset = 50;

    const arrows = [
      {
        x: width * 2,
        y: height,
        color: "#F3A32A",
        angle: 0,
      },
      {
        x: width * 2,
        y: height * 2,
        color: "#E94858",
        angle: Math.PI * 0.5,
      },
      {
        x: width,
        y: height * 2,
        color: "#3CB4CB",
        angle: Math.PI,
      },
      {
        x: width,
        y: height,
        color: "#82BF6E",
        angle: Math.PI * 1.5,
      },
    ];

    const sources = [
      {
        x: width * 2,
        y: height * 2,
        color: "#F3A32A",
        angle: 0,
        controlPointType: 0,
      },
      {
        x: width,
        y: height * 2,
        color: "#E94858",
        angle: Math.PI * 0.5,
        controlPointType: 1,
      },
      {
        x: width,
        y: height,
        color: "#3CB4CB",
        angle: Math.PI,
        controlPointType: 0,
      },
      {
        x: width * 2,
        y: height,
        color: "#82BF6E",
        angle: Math.PI * 1.5,
        controlPointType: 1,
      },
    ];

    arrows.forEach(({ x, y, color, angle }) =>
      arrow.drawArrow(
        context,
        x + Math.cos(angle) * arrowOffset,
        y + Math.sin(angle) * arrowOffset,
        x + Math.cos(angle) * (arrowLength + arrowOffset),
        y + Math.sin(angle) * (arrowLength + arrowOffset),
        1,
        1,
        Math.PI / 6,
        75,
        color,
        30
      )
    );

    sources.forEach(({ x, y, color, angle, controlPointType }) => {
      const fromX = x + Math.cos(angle) * arrowOffset;
      const fromY = y + Math.sin(angle) * arrowOffset;
      arrow.drawArrow(
        context,
        fromX,
        fromY,
        x + Math.cos(angle) * (arrowLength + arrowOffset),
        y + Math.sin(angle) * (arrowLength + arrowOffset),
        1,
        0,
        Math.PI / 6,
        75,
        color,
        30
      );
      arrows
        .filter(item => item.angle !== angle)
        .forEach(({ x: x$, y: y$, angle: angle$ }) =>
          arrow.drawCurve(
            context,
            fromX,
            fromY,
            x$ + Math.cos(angle$) * arrowOffset,
            y$ + Math.sin(angle$) * arrowOffset,
            controlPointType,
            color,
            10
          )
        );
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div id="trafficFlow">
        <canvas
          id="trafficFlowCanvas"
          width="900px"
          height="900px"
          className="traffic-flow-canvas"
        />
      </div>
    );
  }
}

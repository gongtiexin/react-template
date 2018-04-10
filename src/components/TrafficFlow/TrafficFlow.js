/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-4-3           gongtiexin        Traffic flow
 * */

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Arrow from "./Arrow";
import "./traffic-flow.less";
import { getPerpendicular, getControlPoint } from "./perpendicular";

const arrow = new Arrow();

@inject("store")
@observer
export default class TrafficFlow extends Component {
  componentDidMount() {
    const canvas = document.getElementById("trafficFlowCanvas");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    context.translate(centerX, centerY);
    const width = 50;
    const arrowAngle = Math.PI / 6;
    const arrowLineWidth = 20;
    const arrowHeadLength = 30;
    const arrowLength = 100;

    const list = [
      {
        x1: 0,
        y1: 0,
        x2: 110,
        y2: -150,
        width,
        color: "#F3A32A",
      },
      {
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 150,
        width,
        color: "#E94858",
      },
      {
        x1: 0,
        y1: 0,
        x2: -150,
        y2: 120,
        width,
        color: "#3CB4CB",
      },
      {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: -150,
        width,
        color: "#82BF6E",
      },
    ];

    const arrows = [];
    const sources = [];

    const a = list.map(({ x1, y1, x2, y2, width: myWidth, color }) => {
      const [a, b] = getPerpendicular(x1, y1, x2, y2, myWidth, color);
      if (a.angle <= a.kAngle) {
        arrows.push(a);
        sources.push(b);
      } else {
        arrows.push(b);
        sources.push(a);
      }
      return [a, b];
    });

    arrows.forEach(({ x, y, color, kAngle }) =>
      arrow.drawArrow(
        context,
        x,
        y,
        x + Math.cos(kAngle) * arrowLength,
        y + Math.sin(kAngle) * arrowLength,
        1,
        1,
        arrowAngle,
        arrowHeadLength,
        color,
        arrowLineWidth
      )
    );

    sources.forEach(({ x, y, color, kAngle, k }) => {
      arrow.drawArrow(
        context,
        x,
        y,
        x + Math.cos(kAngle) * arrowLength,
        y + Math.sin(kAngle) * arrowLength,
        1,
        0,
        arrowAngle,
        arrowHeadLength,
        color,
        arrowLineWidth
      );
      arrows
        .filter(item => item.kAngle !== kAngle)
        .forEach(({ x: x$, y: y$, k: k$ }) => {
          const { x: cpx, y: cpy } = getControlPoint(x, y, k, x$, y$, k$);
          arrow.drawCurve(context, x, y, x$, y$, cpx, cpy, color, 10);
        });
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

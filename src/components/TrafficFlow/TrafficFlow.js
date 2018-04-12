/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-4-3           gongtiexin        Traffic flow
 * */

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Arrow from "./Arrow";
import "./traffic-flow.less";
import {
  getPerpendicular,
  getControlPoint,
  getLinesAngle,
  getOffsetPoint,
} from "./perpendicular";

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

    // const list = [
    //   {
    //     x1: 0,
    //     y1: 0,
    //     x2: 100,
    //     y2: 0,
    //     width,
    //     color: "#F3A32A",
    //   },
    //   {
    //     x1: 0,
    //     y1: 0,
    //     x2: 0,
    //     y2: 100,
    //     width,
    //     color: "#E94858",
    //   },
    //   {
    //     x1: 0,
    //     y1: 0,
    //     x2: -100,
    //     y2: 0,
    //     width,
    //     color: "#3CB4CB",
    //   },
    //   {
    //     x1: 0,
    //     y1: 0,
    //     x2: 0,
    //     y2: -100,
    //     width,
    //     color: "#82BF6E",
    //   },
    // ];

    const list = [
      {
        x1: 0,
        y1: 0,
        x2: 200,
        y2: 100,
        width,
        color: "#F3A32A",
      },
      {
        x1: 0,
        y1: 0,
        x2: -100,
        y2: 100,
        width,
        color: "#E94858",
      },
      {
        x1: 0,
        y1: 0,
        x2: -100,
        y2: -100,
        width,
        color: "#3CB4CB",
      },
      {
        x1: 0,
        y1: 0,
        x2: 100,
        y2: -100,
        width,
        color: "#82BF6E",
      },
    ];

    this.draw(context, list);
  }

  componentWillUnmount() {}

  getAbsAngle = ({ x: x1, y: y1, kAngle }, { x: x2, y: y2 }) => {
    const { x, y } = getOffsetPoint(x1, y1, kAngle);
    return getLinesAngle(x1, y1, x2, y2, x, y);
  };

  draw = (context, list) => {
    const arrowAngle = Math.PI / 6;
    const arrowLineWidth = 20;
    const arrowHeadLength = 30;
    const arrowLength = 100;
    const arrows = [];
    const sources = [];

    list.forEach(({ x1, y1, x2, y2, width: myWidth, color }) => {
      const [a, b] = getPerpendicular(x1, y1, x2, y2, myWidth, color);
      if (a.angle <= a.kAngle) {
        arrows.push(a);
        sources.push(b);
      } else {
        arrows.push(b);
        sources.push(a);
      }
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
      let lastWidth = arrowLineWidth;
      const lastArrows = arrows
        .filter(item => item.kAngle !== kAngle)
        .sort(
          (a, b) =>
            this.getAbsAngle(a, { x, y }) - this.getAbsAngle(b, { x, y })
        );
      const lastArrowsLength = lastArrows.length;
      lastArrows.forEach(({ x: x$, y: y$, k: k$, kAngle: kAngle$ }) => {
        const { x1, y1, x2, y2, cpx, cpy } = getControlPoint(
          x,
          y,
          k,
          kAngle,
          x$,
          y$,
          k$,
          kAngle$,
          arrowLineWidth,
          lastWidth,
          arrowLineWidth / lastArrowsLength
        );
        lastWidth -= arrowLineWidth / lastArrowsLength;
        arrow.drawCurve(
          context,
          x1,
          y1,
          x2,
          y2,
          cpx,
          cpy,
          color,
          arrowLineWidth / lastArrowsLength
        );
      });
    });
  };

  render() {
    return (
      <div id="trafficFlow">
        <canvas
          id="trafficFlowCanvas"
          width="800px"
          height="800px"
          className="traffic-flow-canvas"
        />
      </div>
    );
  }
}

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-4-8           gongtiexin        罗盘组件
 * */

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Compass from "./Compass";
import Arrow from "../TrafficFlow/Arrow";

const compass = new Compass();
const arrow = new Arrow();
const r1 = 400;
const r2 = 375;
const r3 = 35;
let data = [];

@inject("store")
@observer
export default class CompassComponent extends Component {
  componentDidMount() {
    this.init();
    const canvas = document.getElementById("compassComponentCanvas");
    const context = canvas.getContext("2d");
    canvas.addEventListener("click", e => {
      const { x: middleX, y: middleY } = this.windowToCanvas(
        canvas,
        e.clientX,
        e.clientY
      );
      const beveling = compass.getBeveling(middleX, middleY);
      data.push({ x: middleX / beveling * r1, y: middleY / beveling * r1 });
      arrow.drawArrow(
        context,
        0,
        0,
        middleX / beveling * r1,
        middleY / beveling * r1,
        1,
        1,
        Math.PI / 6,
        75,
        "#F3A32A",
        20
      );
      console.log(data);
    });
  }

  componentWillUnmount() {}

  init = () => {
    const canvas = document.getElementById("compassComponentCanvas");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    context.translate(centerX, centerY);
    compass.drawCompass(context, 0, 0, r1, r2, r3, "#F3A32A", 2);
  };

  windowToCanvas = (canvas, x, y) => {
    const bbox = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * (canvas.width / bbox.width) - canvas.width / 2,
      y: y - bbox.top * (canvas.height / bbox.height) - canvas.height / 2,
    };
  };

  clearCanvas = () => {
    const canvas = document.getElementById("compassComponentCanvas");
    const context = canvas.getContext("2d");
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.clearRect(0, 0, canvas.width, canvas.height);
    data = [];
    this.init();
  };

  render() {
    return (
      <div id="compassComponent">
        <button onClick={this.clearCanvas}>重置</button>
        <canvas
          id="compassComponentCanvas"
          width="800px"
          height="800px"
          className="compass-component-canvas"
        />
      </div>
    );
  }
}

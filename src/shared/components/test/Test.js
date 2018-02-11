import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Test extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#F00",
            transform: "rotateY(60deg)",
          }}
        />
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#F00",
            transform: "rotateY(45deg)",
          }}
        />
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#F00",
            transform: "rotateY(0deg)",
          }}
        />
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#F00",
            transform: "rotateY(-45deg)",
          }}
        />
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#F00",
            transform: "rotateY(-60deg)",
          }}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import {
  mxGraph as MxGraph,
  mxParallelEdgeLayout as MxParallelEdgeLayout,
  mxConstants,
  mxEdgeStyle,
  mxLayoutManager as MxLayoutManager,
  mxCell,
  mxGeometry,
  mxRubberband as MxRubberband,
  mxDragSource,
  mxKeyHandler as MxKeyHandler,
  mxCodec,
  mxClient,
  mxConnectionHandler,
  mxUtils,
  mxToolbar,
  mxEvent,
  mxImage,
  mxFastOrganicLayout,
} from "mxgraph-js";
import "./mxgraph-editor.less";

export default class MxGraphEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.divGraph = null;
  }

  componentDidMount() {
    this.main(this.divGraph);
  }

  main = container => {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Creates the graph inside the given container
      const graph = new MxGraph(container);

      // 注册图形
      const style = {};
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
      style[mxConstants.STYLE_OPACITY] = 50;
      style[mxConstants.STYLE_FILLCOLOR] = "#774400";
      graph.getStylesheet().putCellStyle("ROUNDED", style);

      console.log(graph.getStylesheet());

      // Enables rubberband selection
      new MxRubberband(graph);

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      const parent = graph.getDefaultParent();

      // mxGraphModel.beginUpdate() 启动一个新的事务或一个子事务
      // mxGraphModel.endUpdate() 完成一个事务或一个子事务
      // mxGraph.addVertex() 将新的顶点添加到指定的父单元格
      // mxGraph.addEdge() 向指定的父单元格添加一个新边

      // Adds cells to the model in a single step

      const vertexs1 = [
        {
          parent,
          value: "Hello, ",
          x: 20,
          y: 20,
          width: 80,
          height: 30,
        },
      ];

      const vertexs2 = [
        {
          parent,
          value: "World, ",
          x: 200,
          y: 150,
          width: 80,
          height: 30,
          style: "ROUNDED",
        },
      ];

      const edges = [
        {
          parent,
          target: null,
          source: null,
        },
      ];

      this.addCellsToModel({ graph, vertexs: vertexs1 });
      setTimeout(
        () => this.addCellsToModel({ graph, vertexs: vertexs2 }),
        1000
      );
      setTimeout(() => this.addCellsToModel({ graph, edges }), 2000);
    }
  };

  addCellsToModel = ({ graph, vertexs = [], edges = [] }) => {
    graph.getModel().beginUpdate();
    try {
      const newVertexs = vertexs.map(
        ({ parent, id, value, x, y, width, height, style }) =>
          graph.insertVertex(parent, id, value, x, y, width, height, style)
      );
      edges.map(({ parent, id, value = "", source, target, style }) =>
        graph.insertEdge(
          parent,
          id,
          value,
          newVertexs[source],
          newVertexs[target],
          style
        )
      );
      // const v1 = graph.insertVertex(
      //   parent,
      //   null,
      //   "Hello,",
      //   20,
      //   20,
      //   80,
      //   30,
      //   "ROUNDED"
      // );
      // const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
      // const e1 = graph.insertEdge(parent, null, "", v1, v2);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  };

  initContainer = node => {
    this.divGraph = node;
  };

  render() {
    return (
      <div className="graph-container" ref={this.initContainer} id="divGraph" />
    );
  }
}

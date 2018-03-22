/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       mxGraph component
 * */

import React, { Component } from "react";
import {
  mxCell as MxCell,
  mxClient,
  mxCodec as MxCodec,
  mxConstants,
  mxGeometry as MxGeometry,
  mxGraph as MxGraph,
  mxKeyHandler as MxKeyHandler,
  mxRubberband as MxRubberband,
  mxToolbar as MxToolbar,
  mxUtils,
} from "mxgraph-js";
import "./mxgraph-editor.less";

export default class MxGraphEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.graphContainer = null;
    this.graph = null;
    this.parent = null;
    this.toolbar = null;
  }

  componentDidMount() {
    this.main(this.graphContainer);
  }

  main = container => {
    // 检查浏览器是否受支持
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // 将dom节点实例化为一个graph图
      this.graph = new MxGraph(container);

      // Enables rubberband selection
      new MxRubberband(this.graph);

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      this.parent = this.graph.getDefaultParent();

      // cell是否可以连线
      this.graph.setConnectable(true);
      this.graph.setPanning(true);

      // 删除选中Cell或者Edge
      const keyHandler = new MxKeyHandler(this.graph);
      keyHandler.bindKey(46, () => {
        if (this.graph.isEnabled()) {
          this.graph.removeCells();
        }
      });

      const toolbarContainer = document.getElementById("graphToolbar");
      this.toolbar = new MxToolbar(toolbarContainer);

      const toolbars = [
        {
          icon: "/static/images/mxgraph/rectangle.gif",
          w: 80,
          h: 40,
          style: "",
        },
        {
          icon: "/static/images/mxgraph/rounded.gif",
          w: 80,
          h: 40,
          style: "shape=rounded",
        },
        {
          icon: "/static/images/mxgraph/ellipse.gif",
          w: 40,
          h: 40,
          style: "shape=ellipse",
        },
        {
          icon: "/static/images/mxgraph/rhombus.gif",
          w: 40,
          h: 40,
          style: "shape=rhombus",
        },
        {
          icon: "/static/images/mxgraph/triangle.gif",
          w: 40,
          h: 40,
          style: "shape=triangle",
        },
        {
          icon: "/static/images/mxgraph/cylinder.gif",
          w: 40,
          h: 40,
          style: "shape=cylinder",
        },
      ];

      toolbars.forEach(this.addToolbarVertex);
      this.toolbars.addBreak();
    }
  };

  addToolbarVertex = ({ icon, w, h, style }) => {
    const vertex = new MxCell(null, new MxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);
    this.addToolbarItem(this.graph, this.toolbar, vertex, icon);
  };

  addToolbarItem = (graph, toolbar, prototype, image) => {
    // 添加、删除功能
    const funct = (subGraph, evt, cell) => {
      subGraph.stopEditing(false);

      const pt = subGraph.getPointForEvent(evt);
      const vertex = subGraph.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;

      subGraph.addCell(vertex);
      subGraph.setSelectionCell(vertex);
    };

    // 创建拖动预览图标
    const img = toolbar.addMode(null, image, funct);
    mxUtils.makeDraggable(img, graph, funct);
  };

  initContainer = node => {
    this.graphContainer = node;
  };

  save = () => {
    // const enc = new MxCodec();
    // const node = enc.encode(this.graph.getModel());
    // console.log(mxUtils.getXml(node));
    // return mxUtils.getXml(node);

    const parentChildren = this.parent.children;
    const arrEdge = []; // 连接线
    const arrVertex = []; // 节点
    parentChildren.forEach(child => {
      if (!child.isVisible()) {
        return;
      }
      // 区分连接线、节点
      if (child.isEdge()) {
        arrEdge.push({
          id: child.id,
          source: child.source.id,
          target: child.target.id,
        });
      } else if (child.isVertex()) {
        arrVertex.push({
          type: child.style,
          id: child.id,
        });
      }
    });
    console.log(arrEdge, arrVertex);
  };

  render() {
    return (
      <div id="mxGraphEditor">
        <div className="graph-toolbar" id="graphToolbar" />
        <div
          className="graph-container"
          ref={this.initContainer}
          id="graphContainer"
        />
        <button onClick={this.save}>保存</button>
      </div>
    );
  }
}

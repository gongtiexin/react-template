/**
 * Created by hldev on 17-5-26.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Breadcrumb} from 'antd';

@inject("store")
@observer
export default class HlBreadcrumb extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.breadcrumb.map((item, idx) => {
      if (item.path) {
        return (<Breadcrumb.Item key={idx}><Link to={item.path}>{item.name}</Link></Breadcrumb.Item>)
      } else {
        return <Breadcrumb.Item key={idx}>{item.name}</Breadcrumb.Item>
      }
    });


    return (
      <div>
        <Breadcrumb className="fe-breadcrumb">
          {items}
        </Breadcrumb>
      </div>
    )
  }
}
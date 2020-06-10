import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Col, Input, Row } from "antd";
import { FileExcelOutlined, FileImageOutlined, FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import "./index.less";

const { Search } = Input;

const Home = inject(({ store: { authStore } }) => ({ authStore }))(
  observer((props: any) => {
    const [loading, setLoading] = useState(false);

    return (
      <div className="dm-home">
        <Search size="large" placeholder="请输入关键词..." loading={loading} enterButton />
        <Row className="statistic-section" gutter={20}>
          <Col span={6}>
            <div className="counter">
              <FileWordOutlined style={{ color: "#3E97FE" }} className="stats-icon" />
              <h2 className="timer count-title count-number">999</h2>
              <div className="stats-line-black" />
              <p className="stats-text">Coffee Cups</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="counter">
              <FileExcelOutlined style={{ color: "#5BCB9A" }} className="stats-icon" />
              <h2 className="timer count-title count-number">10000</h2>
              <div className="stats-line-black" />
              <p className="stats-text">Line Code</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="counter">
              <FilePdfOutlined style={{ color: "#FF5353" }} className="stats-icon" />
              <h2 className="timer count-title count-number">6</h2>
              <div className="stats-line-black" />
              <p className="stats-text">Years Experience</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="counter">
              <FileImageOutlined style={{ color: "#FCCC02" }} className="stats-icon" />
              <h2 className="timer count-title count-number">12</h2>
              <div className="stats-line-black" />
              <p className="stats-text">Project</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  })
);

export default React.memo(Home);

import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Button, Input, Space, Tree } from "antd";
import CommonTable from "@components/CommonTable";
import { DocumentStore } from "@declarations/document";
import "./index.less";

const { DirectoryTree } = Tree;
const { Search } = Input;

const treeData = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];

const onSelect = (keys: any, event: any) => {
  console.log("Trigger Select", keys, event);
};

const onExpand = () => {
  console.log("Trigger Expand");
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    key: "action",
  },
];

const Home = inject(({ store: { documentStore } }) => ({ documentStore }))(
  observer((props: { documentStore: DocumentStore }) => {
    const { documentStore } = props;
    const [params, setParams] = useState({});

    return (
      <div className="dm-document-manage">
        <div className="left">
          <div className="tree">
            <div className="tree-header">
              <span className="tree-title">目录树</span>
            </div>
            <DirectoryTree multiple defaultExpandAll onSelect={onSelect} onExpand={onExpand} treeData={treeData} />
          </div>
          <div className="tree">
            <div className="tree-header">
              <span className="tree-title">分类树</span>
            </div>
            <DirectoryTree multiple defaultExpandAll onSelect={onSelect} onExpand={onExpand} treeData={treeData} />
          </div>
        </div>
        <div className="right">
          <div className="table-header">
            <div>
              <Search
                size="small"
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              />
            </div>
            <div>
              <Space>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setParams({ name: 1 });
                  }}
                >
                  新增
                </Button>
                <Button size="small">删除</Button>
              </Space>
            </div>
          </div>
          <CommonTable
            params={params}
            fetch={documentStore.getDocumentPage}
            tableProps={{ pagination: false, size: "small", columns }}
          />
        </div>
      </div>
    );
  })
);

export default React.memo(Home);

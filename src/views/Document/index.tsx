import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Tree, Table, Space, Tag, Button, Input, Pagination } from "antd";
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
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
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: Array<string>) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "操作",
    key: "action",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const showTotal = (total: number) => `共 ${total} 条记录`;

const Home = inject(({ store: { authStore } }) => ({ authStore }))(
  observer((props: any) => {
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
                <Button size="small" type="primary">
                  新增
                </Button>
                <Button size="small">删除</Button>
              </Space>
            </div>
          </div>
          <Table pagination={false} size="small" columns={columns} dataSource={data} />
          <Pagination
            style={{ float: "right", marginTop: 10 }}
            size="small"
            total={50}
            showTotal={showTotal}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>
    );
  })
);

export default React.memo(Home);

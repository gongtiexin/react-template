import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Pagination, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";
import "./index.less";
import { AnyObject, Page } from "@declarations/common";

interface CommonTable {
  tableProps: TableProps<{ [key: string]: any }>;
  paginationProps?: PaginationProps;
  fetch: (params?: AnyObject) => Promise<any>;
  params?: AnyObject;
}

export interface CommonTableRef {
  refresh: () => Promise<any>;
}

const showTotal = (total: number) => `共 ${total} 条记录`;

const CommonTable = (props: CommonTable, ref?: React.Ref<CommonTableRef>) => {
  const { tableProps, paginationProps, fetch, params = {} } = props;

  const _fetch = () =>
    fetch({ ...params, page, size }).then((pageData: Page<never>) => {
      const { data, page, size, total } = pageData;
      setData(data);
      setPage(page);
      setSize(size);
      setTotal(total);
    });

  const handlePageSizeChange = (page: number | undefined, size: number | undefined) => {
    setPage(page || 1);
    setSize(size || 10);
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    _fetch();
  }, [page, size, params]);

  if (ref) {
    useImperativeHandle(ref, () => ({
      refresh: _fetch,
    }));
  }

  return (
    <div className="common-table">
      <Table rowKey="id" {...tableProps} dataSource={data} />
      <div className="common-table-footer">
        <Pagination
          size="small"
          current={page}
          pageSize={size}
          total={total}
          showTotal={showTotal}
          showSizeChanger
          showQuickJumper
          {...paginationProps}
          onChange={handlePageSizeChange}
          onShowSizeChange={handlePageSizeChange}
          pageSizeOptions={["2"]}
        />
      </div>
    </div>
  );
};

export default React.memo(forwardRef<CommonTableRef, CommonTable>(CommonTable));

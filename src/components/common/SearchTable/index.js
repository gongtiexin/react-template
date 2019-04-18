/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/8/10           gongtiexin       通用搜索表格组件
 * */

import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Button, Col, Divider, Form, Input, Row, Table, Select } from "antd";
import Pagination from "../Pagination";
import "./index.less";

const { Item: FormItem, create } = Form;
const { Option: SelectOption } = Select;

@create()
@observer
export default class SearchTable extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    fields: PropTypes.array,
    dividerProps: PropTypes.object,
    tableProps: PropTypes.object.isRequired,
    paginationProps: PropTypes.object.isRequired,
    callback: PropTypes.func,
    setRef: PropTypes.func,
  };

  static defaultProps = {
    fields: [],
    dividerProps: { orientation: "left" },
    callback: values => console.log(values),
    setRef: () => console.log("ref"),
  };

  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.setRef(this);
  }

  componentWillUnmount() {}

  handleSearch = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      paginationProps: { pageSize },
    } = this.props;
    validateFields(() => {
      this.fetchData({ sliceParams: { pageSize, pageNum: 1 } });
    });
  };

  handleReset = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
  };

  fetchData = params => {
    const {
      callback,
      form: { getFieldsValue },
      paginationProps: { pageSize, currentPage },
    } = this.props;
    const formValues = getFieldsValue();
    this.setState({ loading: true });
    callback(
      Object.assign(
        { sliceParams: { pageSize, pageNum: currentPage } },
        formValues,
        params
      )
    ).then(
      () => this.setState({ loading: false }),
      () => this.setState({ loading: false })
    );
  };

  renderFormItem = fields =>
    fields.map(({ type, key, label, items = [], options, props }) => {
      const {
        form: { getFieldDecorator },
      } = this.props;
      switch (type) {
        case "input": {
          return (
            <Col span={8} key={key}>
              <FormItem label={label}>
                {getFieldDecorator(key, options)(<Input {...props} />)}
              </FormItem>
            </Col>
          );
        }
        case "select": {
          return (
            <Col span={8} key={key}>
              <FormItem label={label}>
                {getFieldDecorator(key, options)(
                  <Select {...props}>
                    {items.map(item => (
                      <SelectOption
                        key={item.key || item.value}
                        value={item.value}
                      >
                        {item.label}
                      </SelectOption>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
        }
        default:
          return null;
      }
    });

  render() {
    const {
      fields = [],
      dividerProps,
      tableProps,
      paginationProps,
    } = this.props;
    const { loading } = this.state;

    return (
      <div id="searchTable">
        {do {
          if (fields.length > 0) {
            <Fragment>
              <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
              >
                <Row gutter={24}>{this.renderFormItem(fields)}</Row>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                    <Button
                      style={{ marginLeft: 8 }}
                      onClick={this.handleReset}
                    >
                      重置
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Divider {...dividerProps}>搜索结果</Divider>
            </Fragment>;
          }
        }}
        <Table
          size="middle"
          loading={loading}
          pagination={false}
          {...tableProps}
        />
        <Pagination {...paginationProps} handleChange={this.getDataSource} />
      </div>
    );
  }
}

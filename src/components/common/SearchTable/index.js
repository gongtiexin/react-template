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
    tableProps: PropTypes.object,
    paginationProps: PropTypes.object,
    callback: PropTypes.func,
  };

  static defaultProps = {
    fields: [],
    callback: values => console.log(values),
  };

  componentDidMount() {}

  componentWillUnmount() {}

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields(() => {
      this.refreshData();
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  refreshData = params => {
    const {
      callback,
      form: { getFieldsValue },
    } = this.props;
    const search = getFieldsValue();
    callback({ ...search, ...params });
  };

  renderFormItem = fields =>
    fields.map(({ type, key, label, items = [], options, props }) => {
      const { getFieldDecorator } = this.props.form;
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
              <Divider orientation="left" {...dividerProps}>
                搜索结果
              </Divider>
            </Fragment>;
          }
        }}
        <Table size="middle" pagination={false} {...tableProps} />
        <Pagination {...paginationProps} handleChange={this.refreshData} />
      </div>
    );
  }
}

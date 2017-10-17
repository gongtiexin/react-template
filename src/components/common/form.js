/**
 * Antd Form 相关工具函数
 * Created by yangbajing(yangbajing@gmail.com) on 2016-09-20.
 */
import React, { Component } from 'react';
import { Button, Cascader, Checkbox, DatePicker, Form, Icon, Input, Radio, Select, Switch, Upload } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { Dragger } = Upload;
const { MonthPicker, RangePicker } = DatePicker;
let lock;

/**
 *
 * @param getFieldDecorator
 * @param config {item, name, option[, options]} options: select, checkbox等
 * @param key
 * @return {*}
 */
export function createFormItem(getFieldDecorator, config, key) {
  let props = config.props || {};
  if (props.placeholder === undefined && config.item) {
    props.placeholder = config.item.label;
  }
  let control = null;
  switch (config.type) {
    case 'input':
    case 'text':
    case 'textarea':
      control = getFieldDecorator(config.name, config.options)(<Input {...props} type={config.type} />);
      break;

    case 'password':
      control = getFieldDecorator(config.name, config.options)(<Input
        autoComplete="off"
        onContextMenu={false}
        onPaste={false}
        onCopy={false}
        onCut={false}
        {...props}
        type="password"
      />);
      break;

    case 'switch':
      control = getFieldDecorator(config.name, config.options)(<Switch {...props} />);
      break;

    case 'select': {
      const options = config.selectOptions.map((option) => {
        const value = option.value || option.label;
        return <Option value={value} key={value}>{option.label}</Option>;
      });
      if (!props.allowClear || !props.showSearch) {
        props = {
          ...props,
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'children',
          style: { width: '100%' },
        };
      }
      control = getFieldDecorator(config.name, config.options)(<Select {...props}>{options}</Select>);
      break;
    }

    case 'checkbox':
      control = getFieldDecorator(config.name, config.options)(<Checkbox.Group
        {...props}
        options={config.checkboxOptions}
      />);
      break;

    case 'radio': {
      const radioOptions = config.radioOptions.map(radio =>
        <Radio key={radio.value} value={radio.value}>{radio.label}</Radio>);
      control = getFieldDecorator(config.name, config.options)(<Radio.Group {...props}>{radioOptions}</Radio.Group>);
    }
      break;

    case 'datePicker':
      control = getFieldDecorator(config.name, config.options)(<DatePicker {...props} />);
      break;
    case 'monthPicker':
      control = getFieldDecorator(config.name, config.options)(<MonthPicker {...props} />);
      break;

    case 'rangeDatePicker':
      control = getFieldDecorator(config.name, config.options)(<RangePicker {...props} />);
      break;

    case 'cascader':
      control = getFieldDecorator(config.name, config.options)(<Cascader {...props} />);
      break;

    case 'uploadDragger':
      control = getFieldDecorator(config.name, config.options)(<Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
                                                               </Dragger>);
      break;

    case 'button':
      control = config.element;
      break;

    case 'static':
    default:
      control = <p {...props}>{config.options ? config.options.initialValue : ''}</p>;
  }
  const formItemProps = config.item || {};
  if (key !== undefined) {
    formItemProps.key = key;
  }
  return <FormItem {...formItemProps}>{control}</FormItem>;
}

class CommonForm extends Component {
  static defaultProps = {
    isCancel: false,
    submitTitle: '确认',
    cancelTitle: '取消',
    buttonSize: 'large',
  };
  // static propTypes = {
  //   onSubmit: React.PropTypes.func, // 提交按钮回调函数
  //   cancelTitle: React.PropTypes.string, // 取消按钮文字
  //   submitTitle: React.PropTypes.string, // 提交按钮文字
  //   buttonSize: React.PropTypes.string, // 按钮大小
  //   onCancel: React.PropTypes.func, // 取消按钮回调函数
  //   isCancel: React.PropTypes.bool, // 是否包含取消按钮
  //
  // };

  constructor(props) {
    super(props);
    lock = true;
  }

  handleClick = (e) => {
    this.props.onSubmit(e);
    lock = true;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let submitButton;
    if (this.props.isCancel) {
      submitButton = (
        <FormItem>
          <Button
            size={this.props.buttonSize}
            onClick={this.props.onCancel}
          >
            {this.props.cancelTitle}
          </Button>
          <Button
            size={this.props.buttonSize}
            onClick={this.handleClick}
            disabled={lock}
            type="primary"
            htmlType="submit"
          >
            {this.props.submitTitle}
          </Button>
        </FormItem>
      );
    } else {
      submitButton = (
        <Button
          htmlType="submit"
          size={this.props.buttonSize}
          type="primary"
          disabled={lock}
          onClick={this.handleClick}
        >
          {this.props.submitTitle}
        </Button>
      );
    }
    return (
      <Form onSubmit={this.props.onSubmit}>
        {createFormItem(getFieldDecorator, this.props.config)}
        {submitButton}
      </Form>
    );
  }
}

const HlForm = Form.create({
  onValuesChange: () => {
    lock = false;
  },
})(CommonForm);

export default HlForm;

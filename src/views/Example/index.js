import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Space } from 'antd';
import { LANGE_ENUM } from '@src/constants/lang';
import './index.less';

const mapState = (state) => {
  return {
    count: state.count,
  };
};
const mapDispatch = (dispatch) => ({
  increment: () => dispatch.count.increment(1),
  incrementAsync: () => dispatch.count.incrementAsync(1),
  setLang: (lang) => dispatch.lang.setLang(lang),
});

const Example = (props) => {
  const { count, increment, incrementAsync, setLang } = props;
  useEffect(() => {}, []);

  return (
    <Space className="example-wrapper">
      <FormattedMessage id="myMessage" values={{ count }} />
      <Button onClick={increment}>increment</Button>
      <Button onClick={incrementAsync}>incrementAsync</Button>
      <Button onClick={() => setLang(LANGE_ENUM.ZH)}>zh</Button>
      <Button onClick={() => setLang(LANGE_ENUM.EN)}>en</Button>
    </Space>
  );
};

export default React.memo(connect(mapState, mapDispatch)(Example));

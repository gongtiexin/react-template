import React from 'react';
import { Button, Space } from 'antd';
import { FormattedMessage } from 'react-intl';
import { LANGE_ENUM } from '@src/constants/lang';
import langStore from '@src/store/lang';
import exampleCountStore from '@src/store/example/count';

const SwitchLang = () => {
  const { setLang } = langStore.useStore((m) => []);
  return (
    <Space className="example-wrapper">
      <Button onClick={() => setLang(LANGE_ENUM.ZH)}>zh</Button>
      <Button onClick={() => setLang(LANGE_ENUM.EN)}>en</Button>
    </Space>
  );
};

const Count = () => {
  const { count } = exampleCountStore.useStore((m) => [m.count]);

  console.log('Count render');

  return <FormattedMessage id="myMessage" values={{ count }} />;
};

const Btn = () => {
  const { increment, decrement } = exampleCountStore.useStore((m) => []);

  console.log('Btn render');

  return (
    <Space>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </Space>
  );
};

const Count2 = () => {
  const { count2 } = exampleCountStore.useStore((m) => [m.count2]);

  console.log('Count2 render');

  return <FormattedMessage id="myMessage" values={{ count: count2 }} />;
};

const Btn2 = () => {
  const { increment2, decrement2 } = exampleCountStore.useStore((m) => []);

  console.log('Btn2 render');

  return (
    <Space>
      <Button onClick={increment2}>increment2</Button>
      <Button onClick={decrement2}>decrement2</Button>
    </Space>
  );
};

const Example = () => {
  return (
    <Space>
      <Count />
      <Btn />
      <Count2 />
      <Btn2 />
      <SwitchLang />
    </Space>
  );
};

export default Example;

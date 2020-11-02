// import React, { useEffect, useState, useRef } from 'react';
// import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { Button, Space } from 'antd';
// import { LANGE_ENUM } from '@src/constants/lang';
// import './index.less';
//
// const mapState = (state) => {
//   return {
//     count: state.count,
//   };
// };
// const mapDispatch = (dispatch) => ({
//   increment: () => dispatch.count.increment(1),
//   incrementAsync: () => dispatch.count.incrementAsync(1),
//   setLang: (lang) => dispatch.lang.setLang(lang),
// });
//
// const Example = (props) => {
//   const { count, increment, incrementAsync, setLang } = props;
//   const [count1, setCount] = useState(0);
//   const timer = useRef(count1);
//
//   // useEffect(() => {
//   //   setInterval(() => {
//   //     setCount((count) => count + 1);
//   //   }, 1000);
//   // }, []);
//
//   useEffect(() => {
//     setInterval(() => {
//       setCount(timer.current++);
//     }, 1000);
//   }, []);
//
//   return (
//     <Space className="example-wrapper">
//       {count1}
//       <FormattedMessage id="myMessage" values={{ count }} />
//       <Button onClick={increment}>increment</Button>
//       <Button onClick={incrementAsync}>incrementAsync</Button>
//       <Button onClick={() => setLang(LANGE_ENUM.ZH)}>zh</Button>
//       <Button onClick={() => setLang(LANGE_ENUM.EN)}>en</Button>
//     </Space>
//   );
// };
//
// export default React.memo(connect(mapState, mapDispatch)(Example));

import React, { useCallback, useEffect, useState, memo, useMemo } from 'react';
import { Button, Space } from 'antd';

const Child = memo(({ fn }) => {
  useEffect(() => {
    console.log('render Child');
    try {
      fn();
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Space>
      <h1>Child</h1>
    </Space>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const fn = useCallback(() => console.log('render'), []);

  useEffect(() => {
    console.log('render Parent');
  });

  const badFn = () => {
    console.log('bad');
    return count1;
  };

  let bad = useMemo(() => badFn(), [count1]);

  return (
    <Space>
      <h1>
        Parent {count} {bad}
      </h1>
      <Button onClick={() => setCount((preCount) => preCount + 1)}>add</Button>
      <Button onClick={() => setCount1((preCount) => preCount + 1)}>add1</Button>
      <Child fn={fn} />
    </Space>
  );
};

export default Parent;

import React from 'react';
import { connect } from 'dva';

const Text = connect(({ global }) => ({ global }))(props => {
  console.log(props);
  const { value } = props;
  return (
    <div>
      <h1>{value}</h1>
    </div>
  );
});

export default Text;

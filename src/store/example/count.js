import { useState, useCallback } from 'react';
import createStore from '@src/store/utils/create';

const useExampleCount = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = useCallback(() => {
    setCount((value) => value + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((value) => value - 1);
  }, []);

  const increment2 = useCallback(() => {
    setCount2((value) => value + 2);
  }, []);
  const decrement2 = useCallback(() => {
    setCount2((value) => value - 2);
  }, []);

  return { count, count2, increment, decrement, increment2, decrement2 };
};

const exampleCountStore = createStore(useExampleCount);

export default exampleCountStore;

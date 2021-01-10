import React, { useContext, useRef, createContext, useEffect, useMemo, useState } from 'react';
import PubSub from './pubSub';
import { isEqual } from 'lodash';

/**
 * context store 创建工厂函数
 * @param model
 */
const createStore = (model) => {
  const AllContext = createContext({});
  const DepsContext = createContext({});

  return {
    useStore: (deps) => {
      const sealedDeps = useMemo(() => deps, []);

      if (!sealedDeps || sealedDeps.length === 0) {
        return useContext(AllContext);
      }

      const container = useContext(DepsContext);
      const [state, setState] = useState(container.state);
      const prevDepsRef = useRef(deps(container.state));

      useEffect(() => {
        const subscription = () => {
          const prev = prevDepsRef.current;
          const curr = deps(container.state);
          if (!isEqual(prev, curr)) {
            setState(container.state);
          }
          prevDepsRef.current = curr;
        };

        container.subscribe(subscription);

        return () => {
          container.unSubscribe(subscription);
        };
      }, []);

      return state;
    },
    Provider: ({ children }) => {
      const containerRef = useRef(new PubSub());
      const state = model();

      containerRef.current.state = state;

      useEffect(() => {
        containerRef.current.publish();
      });

      return (
        <AllContext.Provider value={state}>
          <DepsContext.Provider value={containerRef.current}>{children}</DepsContext.Provider>
        </AllContext.Provider>
      );
    },
  };
};

export default createStore;

import React, { useMemo } from 'react';

const StoreProvider = ({ value, children }) => {
  const ProviderUnion = useMemo(
    () => ({ children: accChildren }) =>
      value.reduceRight((acc, { Provider }) => <Provider>{acc}</Provider>, accChildren),
    []
  );
  return <ProviderUnion>{children}</ProviderUnion>;
};

export default StoreProvider;

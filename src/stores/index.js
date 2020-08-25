import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import ExampleStore from '@src/stores/example';
// import { store, hotRehydrate, rehydrate } from "rfx-core";
// import { isProduction } from "@src/utils";

// store.setup({
//   example: ExampleStore,
// });

// mobx hmr
// const stores = rehydrate();
// const hmrStores = isProduction() ? stores : hotRehydrate();

const stores = {
    example: new ExampleStore()
};

export const useStores = (module) => useContext(MobXProviderContext).store?.[module] || {};

export default stores;

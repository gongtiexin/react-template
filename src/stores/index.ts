/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       mobx统一注册store
 * */
import { store, hotRehydrate, rehydrate } from "rfx-core";
import AuthStore from "./AuthStore";
import DocumentStore from "./DocumentStore";
import { isProduction } from "@utils/constants";

store.setup({
  authStore: AuthStore,
  documentStore: DocumentStore,
});

// mobx hmr
const stores = rehydrate();
const hmrStores = isProduction ? stores : hotRehydrate();

export default hmrStores;

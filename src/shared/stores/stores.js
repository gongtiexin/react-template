/**
 * state的集合
 */

import { store } from "rfx-core";

import DemoState from "./DemoState";

export default store.setup({
  demoState: DemoState
});

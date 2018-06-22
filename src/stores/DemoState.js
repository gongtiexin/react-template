/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       demoState
 * */

import { action, computed, observable } from "mobx";
import request from "../utils/request";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["test"] }] */

export default class DemoState {
  /**
   * *************************** observable ***************************
   * */

  @observable data = "hello, world";
  @observable ajax = [];
  @observable
  echarts = [{ x: "重庆", y: "2018", value: "666", seriesType: "bar" }];

  /**
   * ****************************** ajax ******************************
   * */

  // /**
  //  * 获取数据
  //  * */
  // async getData() {
  //   // const orgList$ = Rx.Observable.fromPromise(rxjsRequest({ method: 'GET', url: '/pubapi/org/list' }));
  //   // const orgPage$ = Rx.Observable.fromPromise(rxjsRequest({ method: 'GET', url: '/pubapi/org/page' }));
  //   // const merge = Rx.Observable.merge(orgList$, orgPage$);
  //   // merge
  //   //   .subscribe(
  //   //     resp => console.log('got value ', resp),
  //   //     err => console.error('something wrong occurred: ', err),
  //   //   );
  //   const { data, status } = await request(
  //     { method: "GET", url: "/pubapi/org/page" },
  //     { message: "成功" },
  //     { message: "失败" }
  //   );
  //   if (status === 200 || status === 201) {
  //     this.setData(data);
  //     return Promise.resolve(data);
  //   }
  //   return Promise.reject(data);
  // }

  /**
   * 获取数据
   * */
  async getAjax() {
    const { data } = await request({
      config: { method: "GET", url: "/inapi/simulation/page1" },
    });
    this.setAjax(data);
    return data;
  }

  /**
   * ***************************** action *****************************
   * */

  @action
  setData(data) {
    this.data = data;
  }

  @action
  setEcharts(data = []) {
    this.echarts = data;
  }

  @action
  setAjax(data) {
    this.ajax = data;
  }

  /**
   * **************************** computed ****************************
   * */
  @computed
  get computedData() {
    if (this.data.length > 0) {
      return "computed";
    }
    return [];
  }
}

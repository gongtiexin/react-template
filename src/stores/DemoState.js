import { observable, action, computed } from 'mobx';
import Rx from 'rxjs/Rx';
import request from '../utils/axios';

export default class DemoState {
  @observable data;

  constructor() {
    this.data = 'hello, world';
  }

  /**
   * ******************************http request******************************
   * */

  /**
   * 获取数据
   * */
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
  //     { method: 'GET', url: '/pubapi/org/page' },
  //     { message: '成功' },
  //     { message: '失败' },
  //   );
  //   if (status === 200 || status === 201) {
  //     this.setData(data);
  //     return Promise.resolve(data);
  //   }
  //   return Promise.reject(data);
  // }

  /**
   * ******************************action******************************
   * */

  @action
  setData(data) {
    this.data = data;
  }

  /**
   * ******************************computed******************************
   * */
  @computed
  get computedData() {
    // if (this.data.length > 0) {
    //   return this.data.map(() => 'computed');
    // }
    return [];
  }
}

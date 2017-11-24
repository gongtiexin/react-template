import { observable, action, computed } from 'mobx';
import Rx from 'rxjs/Rx';
import { rxjsRequest } from '../utils/axios';

export default class DemoState {
  @observable data;

  constructor() {
    this.data = []; // 初始化值,这里演示数组
  }

  /**
   * ******************************http request******************************
   * */

  /**
   * 获取数据
   * */
  getData() {
    const orgList$ = Rx.Observable.fromPromise(rxjsRequest({ method: 'GET', url: '/pubapi/org/list' }));
    const orgPage$ = Rx.Observable.fromPromise(rxjsRequest({ method: 'GET', url: '/pubapi/org/page' }));
    const merge = Rx.Observable.merge(orgList$, orgPage$);
    merge
      .subscribe(
        resp => console.log('got value ', resp),
        err => console.error('something wrong occurred: ', err),
      );
  }

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
    if (this.data.length > 0) {
      return this.data.map(() => 'computed');
    }
    return [];
  }
}

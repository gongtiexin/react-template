import { observable, action, computed } from 'mobx';
import * as Rx from 'rxjs-es';
import request from '../utils/axios';

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
  async getData() {
    Rx.ajax('/pubapi/org/list', { type: 'get' })
      .subscribe(value => console.log(value));
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

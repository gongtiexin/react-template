import { observable, action, computed } from 'mobx';
import { request } from 'hl-utils/lib/index';
import { notification } from 'antd';

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
    const { data } = await request(
      { method: 'GET', url: '/api/xxx' },
      { message: '获取数据成功' },
      { message: '获取数据失败' },
      notification,
    );
    this.setData = data;
    return data;
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

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       global
 * */

import { action, observable } from 'mobx';
import request from '../utils/request';

export default class GlobalStore {
  /**
   * *************************** observable ***************************
   * */

  @observable
  msg = '';

  /**
   * ****************************** ajax ******************************
   * */

  /**
   * 获取数据
   * */
  getMsg = async () => {
    const { data } = await request({
      config: { method: 'GET', url: '/api/example/list' },
    });
    this.setAjax(data);
    return data;
  };

  /**
   * ***************************** action *****************************
   * */

  @action
  setMsg(data) {
    this.msg = data;
  }

  /**
   * **************************** computed ****************************
   * */
  // @computed
  // get computedData() {
  //   if (this.msg.length > 0) {
  //     return 'computed';
  //   }
  //   return [];
  // }
}

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       global
 * */

import { action, observable } from "mobx";
import request from "../utils/request";

interface ListDTO {
  id: string;
}

export default class GlobalStore {
  /**
   * *************************** observable ***************************
   * */

  @observable
  list: Array<ListDTO> = [];

  /**
   * ****************************** ajax ******************************
   * */

  /**
   * 获取数据
   * */
  getList = async (params: { id: string }): Promise<Array<ListDTO>> => {
    const { data } = await request({
      axiosConfig: { method: "GET", url: "/api/list", params },
    });
    this.setList(data);
    return data;
  };

  /**
   * ***************************** action *****************************
   * */

  @action
  setList(data = []): void {
    this.list = data;
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

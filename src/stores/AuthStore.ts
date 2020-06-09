import { action, observable } from "mobx";
import request from "../utils/request";

interface AuthBO {
  id?: string;
  username?: string;
}

export default class AuthStore {
  /**
   * *************************** observable ***************************
   * */

  @observable
  auth: AuthBO = { id: "admin", username: "admin" };

  /**
   * ****************************** ajax ******************************
   * */

  login = async (params: { username: string; password: string }): Promise<AuthBO> => {
    // const { data } = await request({
    //   axiosConfig: { method: "GET", url: "/api/list", params },
    // });
    // this.setAuth(data);
    // return data;
    const auth = { id: "admin", username: "admin" };
    this.setAuth(auth);
    return Promise.resolve(auth);
  };

  /**
   * ***************************** action *****************************
   * */

  @action
  setAuth(data: AuthBO = {}): void {
    this.auth = data;
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

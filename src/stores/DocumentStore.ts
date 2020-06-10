import { action, observable } from "mobx";
import request from "@utils/request";
import { INIT_PAGE } from "@utils/constants";
import { DocumentBO, DocumentStore as DocumentStoreInterface } from "@declarations/document";
import { AnyObject, Page } from "@declarations/common";

export default class DocumentStore implements DocumentStoreInterface {
  /**
   * *************************** observable ***************************
   * */

  @observable
  documentPage: Page<DocumentBO> = INIT_PAGE;

  /**
   * ****************************** ajax ******************************
   * */

  getDocumentPage = async (params: AnyObject | undefined): Promise<Page<DocumentBO>> => {
    const { data } = await request({
      axiosConfig: { method: "POST", url: "/redpeak/visual/project/queryProjectList", data: params },
    });
    const documentPage: Page<DocumentBO> = {
      data: data.list,
      page: params ? params.page : 1,
      size: params ? params.size : 10,
      total: data.total,
    };
    this.setDocumentPage(documentPage);
    return documentPage;
  };

  /**
   * ***************************** action *****************************
   * */

  @action
  setDocumentPage(data: Page<DocumentBO> = INIT_PAGE): void {
    this.documentPage = data;
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

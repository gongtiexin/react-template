import { Page } from "@declarations/common";

export interface DocumentBO {
  id?: string;
  [key: string]: any;
}

export interface DocumentStore {
  documentPage: Page<DocumentBO>;
  getDocumentPage: (params: any) => Promise<Page<DocumentBO>>;
  setDocumentPage: (documentPage: Page<DocumentBO>) => void;
}

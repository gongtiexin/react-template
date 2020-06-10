export interface AnyObject {
  [key: string]: any;
}

export interface Page<dataType> {
  data: Array<dataType>;
  page: number;
  size: number;
  total: number;
}

declare module "up-utils" {
  interface IUpOption {
    option: {};
    data: Array<{ seriesType: string }>;
    row: string;
    column: string;
    value: string;
    seriesTemplates: {};
  }

  export const computedEchartsOption: (option: IUpOption) => {};
}

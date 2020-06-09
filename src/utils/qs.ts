import qs, { IParseOptions, IStringifyOptions } from "qs";

export const parse = (str: string, options?: IParseOptions): { [key: string]: qs.PoorMansUnknown } =>
  qs.parse(str, { ignoreQueryPrefix: true, ...options });

export const stringify = (str: string, options?: IStringifyOptions): string =>
  qs.stringify(str, { addQueryPrefix: true, ...options });

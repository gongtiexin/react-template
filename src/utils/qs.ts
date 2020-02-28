import qs, { IParseOptions, IStringifyOptions } from 'qs';

const parse = (str: string, options?: IParseOptions) =>
  qs.parse(str, { ignoreQueryPrefix: true, ...options });
const stringify = (str: string, options?: IStringifyOptions) =>
  qs.stringify(str, { addQueryPrefix: true, ...options });

export default { parse, stringify };

import qs from 'qs';

const parse = (str, options) => qs.parse(str, { ignoreQueryPrefix: true, ...options });
const stringify = (str, options) => qs.stringify(str, { addQueryPrefix: true, ...options });

export default { parse, stringify };

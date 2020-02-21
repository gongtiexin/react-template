import _qs from 'qs';

const parse = str => _qs.parse(str, { ignoreQueryPrefix: true });
const stringify = str => _qs.stringify(str, { addQueryPrefix: true });

const qs = { parse, stringify };

export default qs;

const exampleProxy = require('./example');
const delay = require('mocker-api/lib/delay');

const proxy = {
  ...exampleProxy,
};

const MOCK_ENABLE = true;

module.exports = MOCK_ENABLE ? delay(proxy, 0) : {};

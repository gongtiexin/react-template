const path = require('path');

const root = path.resolve(__dirname, '../');
const entry = path.resolve(__dirname, '../src/index.js');
const output = path.resolve(__dirname, '../dist');
const template = path.resolve(__dirname, '../index.html');
const src = path.resolve(__dirname, '../src');
const mock = path.resolve(__dirname, '../mock/index.js');
const staticResources = path.resolve(__dirname, '../static');
const outputStaticResources = path.resolve(__dirname, '../dist/static');
const nodeModules = path.resolve(__dirname, '../node_modules');
const lessVariables = path.resolve(__dirname, '../src/assets/style/variables.less');

module.exports = {
    root,
    entry,
    output,
    template,
    src,
    mock,
    staticResources,
    outputStaticResources,
    nodeModules,
    lessVariables
};

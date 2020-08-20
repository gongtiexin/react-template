module.exports = function config(api) {
  const presets = [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/react",
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
      "antd",
    ],
    [
      "import",
      {
        libraryName: "lodash",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "lodash",
    ],
  ];

  api.cache(true);
  return {
    presets,
    plugins,
  };
};

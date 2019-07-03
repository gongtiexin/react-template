module.exports = {
  // parser: "sugarss",
  plugins: {
    // "postcss-import": {},
    'postcss-preset-env': {},
    cssnano: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};

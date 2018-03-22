/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       postcss config
 * */

module.exports = {
  plugins: {
    "postcss-cssnext": {},
    "css-declaration-sorter": {
      order: "concentric-css",
    },
    "css-mqpacker": {},
  },
};

const Mock = require("mockjs");
const config = require("../config");

const delay = function (proxy, timer = 0) {
  const mockApi = {};
  Object.keys(proxy).forEach(function (key) {
    const result = proxy[key];
    if (
      (Object.prototype.toString.call(result) === "[object String]" &&
        /^http/.test(result)) ||
      key === "_proxy" ||
      timer === 0
    ) {
      mockApi[key] = proxy[key];
    } else {
      mockApi[key] = function (req, res) {
        let foo;
        if (Object.prototype.toString.call(result) === "[object Function]") {
          foo = result;
        } else {
          foo = function (_req, _res) {
            return _res.json(result);
          };
        }
        setTimeout(function () {
          foo(req, res);
        }, timer);
      };
    }
  });
  return mockApi;
};
const API_BASE_URL = "/hs-api";

const proxy = {
  [`GET ${API_BASE_URL}/redpeak/visual/project/page`]: (req, res) => {
    return res.json(
      Mock.mock({
        status: "0",
        data: {
          size: 10,
          page: 1,
          totalElements: 10,
          "data|10": [
            {
              projectName: "projectName",
              projectDesc: "projectDesc",
            },
          ],
        },
      })
    );
  },
};
module.exports = config.mock ? delay(proxy, 1000) : {};

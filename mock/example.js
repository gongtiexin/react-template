const Mock = require("mockjs");

module.exports = {
  [`GET /api/query`]: (req, res) => {
    return res.json(
      Mock.mock({
        status: "200",
        data: req.query,
      })
    );
  },
};

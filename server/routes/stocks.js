const router = require("express").Router();

let stocks = require("../data/stocks.json");

router.get("/", (req, res) => {
  res.json(stocks);
});

module.exports = router;
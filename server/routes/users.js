const router = require("express").Router();

let users = require("../data/users.json").users;

router.get("/:username", (req, res) => {
  let user = users.find(obj => {
    return obj.username === req.params.username;
  });

  if (!user) {
    console.log("User isn't found");
    req.status(400).end();
    return;
  }

  // Add new properties
  user.curBudget = user.startBudget;
  user.purchasedStocks = [];

  res.json(user);
});

module.exports = router;
const router = require("express").Router();

let users = require("../data/users.json").users;

router.get("/", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
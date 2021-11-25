const router = require("express").Router();

let users = require("../data/users.json").users;

router.get("/", (req, res) => {
  res.end();
});

router.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "admin") {
    res.json({
      redirect: true,
      url: "/admin"
    });
    return;
  }

  let user = users.find(obj => {
    return obj.username === req.body.username;
  });
  // User isn't found
  if (!user) {
    console.log("User isn't found");
    res.json({
      redirect: false,
      message: "User isn't found"
    });
    return;
  }
  if (user.password === req.body.password) {
    res.json({
      redirect: true,
      url: `/user/${user.username}`
    });
  } else {
    res.json({
      redirect: false,
      message: "Incorrect password"
    })
  }
});

module.exports = router;
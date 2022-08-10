const router = require("express").Router();
const { Post, User } = require("../../models");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Post,
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.send('User added');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {});

module.exports = router;

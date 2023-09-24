import { Router } from "express";
let User = require("../models/user.model.ts");

const router = Router();

router.route("/add").post(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, email, password });

    if (await newUser.save()) {
      res.status(200).json("Sucesfully Added");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.status(200).json("User Found");
  } else {
    res.status(404).json("User Not Found");
  }
});

module.exports = router;

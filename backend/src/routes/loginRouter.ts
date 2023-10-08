import { Router } from "express";
const JWT = require("jsonwebtoken");
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
    const encryptedCred = JWT.sign(
      {
        username: user.username,
        id: user._id,
        password: password,
      },
      process.env.JSON_KEY
    );
    res.status(200).json({ encryptedCred });
  } else {
    res.status(404).json("User Not Found");
  }
});

module.exports = router;

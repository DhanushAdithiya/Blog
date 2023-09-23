import { Router } from "express";
const User = require("../models/user.model.ts");

const router = Router();

router.route("/subscribe/:id").post(async (req, res) => {
  const subbedUser = req.params.id;
  const userId = req.body.userId;
  const user = await User.findByIdAndUpdate(userId, {
    subscriptions: [...User.subscriptions, subbedUser],
  });
});

router.route("/unsubscribe/:id").post(async (req, res) => {
  const subbedUser = req.params.id;
  const userId = req.body.userId;
  const user = await User.find(userId);
  user.subscriptions = user.subscriptions.filter(
    (sub: String) => sub !== subbedUser
  );
  await user.save();
});

module.exports = router;

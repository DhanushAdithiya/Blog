import { Router } from "express";
const Reply = require("../models/replies.model.ts");

const router = Router();

router.route("/post").post(async (req, res) => {
  try {
    const { reply, username, originalComment } = req.body;
    const newReply = new Reply({
      username,
      reply,
      originalComment,
    });
    const posted = await newReply.save();
    if (posted) {
      res.status(200).json("Reply Sucessfully Poster");
    } else {
      res.status(400).json("Error occured");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const fetched = await Reply.find({ originalComment: req.params.id }).exec;
    if (fetched) {
      res.status(200).json(fetched);
    } else {
      res.status(404).json("Couldn't find the comment");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/delete/:id").post(async (req, res) => {
  try {
    const deleted = await Reply.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json("Sucessfully Delted the comment");
    } else {
      res.status(404).json("Couldn't find the comment");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

module.exports = router;

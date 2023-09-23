import { Router } from "express";
const Comment = require("../models/comment.model.ts");
const router = Router();

//Post a comment
router.route("/post").post(async (req, res) => {
  try {
    const { username, comment, blogId } = req.body;

    const newComment = new Comment({ username, comment, blogId });
    const commentPosted = await newComment.save();
    if (commentPosted) {
      res.status(200).json("Successfully Posted Comment");
    } else {
      res.status(400).json("Error While Posting Comment");
    }
  } catch (err) {
    res.status(400).json("Error While Posting Comment" + err);
  }
});

//Delete a comment
router.route("/delete/:id").post(async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json("Sucessfully Deleted");
    } else {
      res.status(404).json("Couldn't find the blog");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

//Update a comment
router.route("/update/:id").post(async (req, res) => {
  try {
    const { comment } = req.body;
    const updated = await Comment.findByIdAndUpdate(req.params.id, { comment });
    if (updated) {
      res.status(200).json("Sucessfully Updated");
    } else {
      res.status(404).json("Couldn't find the blog");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

//Find all comments for a blog
router.route("/fetch/:id").get(async (req, res) => {
  try {
    const comments = Comment.find({ blogPost: req.params.id }).exec();
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json("Couldn't find the blog");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

module.exports = router;

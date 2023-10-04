import { createSocket } from "dgram";
import { resolveSoa } from "dns";
import { Router } from "express";
const User = require("../models/user.model.ts");
const Blog = require("../models/blog.model.ts");

const router = Router();

//Subscribe to a user
router.route("/subscribe/:id").post(async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    user.subscriptions = [...user.subscriptions, req.params.id];
    const subbedUser = await User.findById(req.params.id);
    subbedUser.subscribers = subbedUser.subscribers + 1;
    // TODO - Implement a feature to check if the user is already present in the list or not
    // ! Might cause potential bugs (ERROR)

    if (subbedUser.save() && user.save()) {
      res.status(200).json("Subscribed to the user!");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Unsubscribe from an user
// ? Can be refactored into a single API endpoint?

router.route("/unsubscribe/:id").post(async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  user.subscriptions = user.subscriptions.filter(
    (sub: String) => sub !== req.params.id
  );
  const subbedUser = await User.findById(req.params.id);
  subbedUser.subscriptions = subbedUser.subscriptions - 1;
  subbedUser.save();
  await user.save();
});

// Like a blog post
router.route("/like/:id").post(async (req, res) => {
  const postId = req.params.id;
  const blog = await Blog.findById(postId);
  let postLikes = blog.likes;
  const likedBy = blog.likedBy;
  if (likedBy.includes(req.body.username)) {
    blog.likes = postLikes - 1;
    likedBy.splice(likedBy.indexOf(req.body.username), 1);
  } else {
    likedBy.push(req.body.username);
    blog.likes = postLikes + 1;
  }
  await blog.save();
});

// Join the mailing list
router.route("/mail/:id").post(async (req, res) => {
  try {
    const blogAuthor = await User.findById(req.params.id);
    if (blogAuthor.mailingList.includes(req.body.email)) {
      blogAuthor.mailingList = blogAuthor.mailingList.filter(
        (email: String) => email != req.body.email
      );
    } else {
      blogAuthor.mailingList = [...blogAuthor.mailingList, req.body.email];
    }

    if (await blogAuthor.save()) {
      res.status(200).json("Sucessfully added email");
    } else {
      res.status(400).json("Error Occured");
    }
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

// Enable / Disable Mails
router.route("/mailinglist").post(async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    user.mails = !user.mails;
    user.save();

    res.status(200).json("Succesfully enabled mails");
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

module.exports = router;

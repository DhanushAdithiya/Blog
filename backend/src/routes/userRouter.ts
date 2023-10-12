import { Router } from "express";
import sendMail from "../functions/mailerFunction";
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
    const user = await User.findById(req.body.userId);

    // ? This works but might take a long time incase there are a lot of emails in the list.

    if (blogAuthor.mailingList.includes(req.body.email)) {
      blogAuthor.mailingList = blogAuthor.mailingList.filter(
        (email: String) => email != req.body.email
      );
      user.mailsSubscription = user.mailsSubscription.filter(
        (id: String) => id != req.params.id
      );
    } else {
      blogAuthor.mailingList = [...blogAuthor.mailingList, req.body.email];
      user.mailsSubscription = [...user.mailsSubscription, req.params.id];
    }

    if ((await blogAuthor.save()) && user.save()) {
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
    const userMail = user.email;
    user.mails = !user.mails;
    if (!user.mails) {
      for (let author in user.mailsSubscription) {
        const blogAuthor = User.findById(author);
        blogAuthor.mailingList = blogAuthor.mailingList.filter(
          (emails: String) => {
            emails != userMail;
          }
        );
        blogAuthor.save();
      }
    }
    user.save();

    res.status(200).json("Succesfully enabled mails");
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

router.route("/:id").get(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).exec();
    if (user) {
      res.status(200).json({
        username: user.username,
        profilePicture: user.profilePicture,
        linkedin: user.linkedin,
        instagram: user.instagram,
      });
    } else {
      res.status(404).json("Could not find the user");
    }
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

router.route("/forgot-password").post(async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ username: username }).exec();

    if (user) {
      const userMail = user.email;
      const userId = user._id;
      const details = {
        from: "userbotnotes@gmail.com",
        to: `${userMail}`,
        subject: `Password Reset Request`,
        text: `You have requested for a password reset, click this link to reset your password "http://127.0.0.1:3000/reset/${userId}", if this was not you ignore this mail. `,
      };
      sendMail(details);
      // ! ERROR HANDLING IS STILL PENDING HERE
      res.status(200).json("Mail Sent Succesfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

router.route("/reset/:id").post(async (req, res) => {
  try {
    const userId = req.params.id;
    const newPassword = req.body.password;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });

    if (updatedUser) {
      res.status(200).json("Sucessfully Updated User");
    } else {
      res.status(404).json("Could not find user");
    }
  } catch (err) {
    res.status(400).json("Error Occured: " + err);
  }
});

module.exports = router;

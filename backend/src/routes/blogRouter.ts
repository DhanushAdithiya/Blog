import { Router } from "express";
import sendMail from "../functions/mailerFunction";
const User = require("../models/user.model");

let Blog = require("../models/blog.model");

const router = Router();

//Routers for CRUD On Blogs
router.route("/post").post(async (req, res) => {
  try {
    const { title, content, authorId, authorName, picture, summary } = req.body;
    if (!authorId) {
      res.status(400).json("AuthorId is Missing");
    }
    let newBlog = new Blog({
      title,
      content,
      authorName,
      authorId,
      picture,
      summary,
    });
    await newBlog.save();

    // Adding a module to send mails to the mailingList
    const author = await User.findById(authorId);
    const mailArr = await author.mailingList;
    if (mailArr) {
      for (let userMail of mailArr) {
        const details = {
          from: "userbotnotes@gmail.com",
          to: `${userMail}`,
          subject: `New Blog By ${authorName}`,
          text: `Check out this new blog by ${authorName} about ${title}`,
        };
        sendMail(details);
      }
    }

    res.status(200).json("Sucessfully added blog");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Router to find a blog by its id
router.route("/:id").get(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json({
        title: blog.title,
        content: blog.content,
        author: blog.authorName,
        authorId: blog.authorId,
        likes: blog.likes,
        time: blog.updatedAt,
        summary: blog.summary,
        picture: blog.picture,
      });
    } else {
      res.status(404).json("Blog not found");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//router to delete a blog
router.route("/delete/:id").post(async (req, res) => {
  try {
    const delted = await Blog.findByIdAndDelete(req.params.id);
    if (delted) {
      res.status(200).json("Success");
    } else {
      res.status(404).json("Could not find Blog");
    }
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

//Router to find all the blogs by a user
router.route("/user/:id").get(async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.params.id }).exec();
    if (blogs) {
      res.status(200).json("Success");
    } else {
      res.status(404).json("Couldn't find the user");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Router to update a blog post
router.route("/update/:id").post(async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (updated) {
      res.status(200).json("Sucessfully Updated");
    } else {
      res.status(404).json("Could not find blog");
    }
  } catch (err) {
    res.status(200).json("Error: " + err);
  }
});

module.exports = router;

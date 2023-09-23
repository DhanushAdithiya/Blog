import { Router } from "express";
let Blog = require("../models/blog.model");

const router = Router();

//Routers for CRUD On Blogs
router.route("/post").post(async (req, res) => {
  try {
    const { title, content, authorId, authorName } = req.body;
    if (!authorId) {
      res.status(400).json("AuthorId is Missing");
    }
    let newBlog = new Blog({ title, content, authorName, authorId });
    await newBlog.save();
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
      res.status(200).json(blog);
      console.log(blog.author);
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

import { Router } from "express";
let Blog = require("../models/blog.model");

const router = Router();

//Routers for CRUD On Blogs
router.route("/post").post(async (req, res) => {
  try {
    const { title, content, authorId, authorName } = req.body;

    let newBlog = new Blog({ title, content, authorName, authorId });
    await newBlog.save();
  } catch (err) {
    res.status(400).json("Error: ", err);
  }
});

// Router to find a blog by its id
router.route("/:id").get((req, res) => {
  console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Router to find all the blogs by a user

module.exports = router;

import mongoose from "mongoose";
const User = require("../models/user.model.ts");

const Schema = mongoose.Schema;

const blogsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogsSchema);
module.exports = Blogs;

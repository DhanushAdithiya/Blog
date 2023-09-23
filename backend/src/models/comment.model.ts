import mongoose from "mongoose";
const Blog = require("../models/blog.model.ts");

const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    blogPost: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;

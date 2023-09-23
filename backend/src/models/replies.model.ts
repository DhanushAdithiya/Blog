import mongoose from "mongoose";
const Comment = require("../models/comment.model.ts");

const Schema = mongoose.Schema;
const repliesModel = new Schema(
  {
    username: { type: String, required: true },
    reply: { type: String, required: true },
    originalComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Replies = mongoose.model("Reply", repliesModel);
module.exports = Replies;

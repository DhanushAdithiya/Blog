import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/originals/a9/fc/ea/a9fceab8da2bedb462f34e73afa7ba51.jpg",
    },
    biography: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    subscriptions: { type: [String], unique: true },
    subscribers: { type: Number, default: 0 },
    mails: { type: Boolean, default: false },
    mailingList: { type: [String], unique: true },
    mailsSubscription: { type: [String], unique: true },
    instagram: { type: String },
    linkedin: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

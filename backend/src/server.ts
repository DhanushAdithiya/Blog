const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/BLOG", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err: Error) => console.log(err));

const loginRouter = require("../src/routes/loginRouter.ts");
const blogsRouter = require("../src/routes/blogRouter.ts");
const commentsRouter = require("../src/routes/commentsRouter.ts");
const repliesRouter = require("../src/routes/repliesRouter.ts");
const userActions = require("../src/routes/userRouter");

app.use("/login", loginRouter);
app.use("/blogs", blogsRouter);
app.use("/comments", commentsRouter);
app.use("/replies", repliesRouter);
app.use("/user", userActions);

app.listen(8000, () => {
  console.log("server listening at port 8000");
});

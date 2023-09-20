const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/BLOG", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

const loginRouter = require("../src/routes/loginRouter.ts");
const blogsRouter = require("../src/routes/blogRouter.ts");

app.use("/login", loginRouter);
app.use("/blogs", blogsRouter);

app.listen(8000, () => {
  console.log("server listening at port 8000");
});

const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const authorRoutes = require("./api/authors/authors.routes");
const dotEnv = require("dotenv");
const connectDb = require("./database");

dotEnv.config();

connectDb();
app.use(express.json());
app.use("/posts", postsRoutes);
app.use("/authors", authorRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8000");
});

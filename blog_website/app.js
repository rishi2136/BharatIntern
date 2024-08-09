const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const postsRouter = require("./routes/post");
const connectDB = require("./database");
const mongoose = require('mongoose');
const Blog = require("./models/post");

connectDB()
  .then(() => console.log("Connected to the mongoDB database"))
  .catch((err) => console.error('Connection error', err))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // to parse the data
app.use(express.json()); // to parse the json data especially


app.get("/create", (req, res) => {
  const newBlog = new Blog({
    title: 'random title',
    intro: 'This is an introduction to my first blog post.',
    description: 'This is the detailed content of my first blog post.',
  });

  newBlog.save()
    .then((response) => {
      console.log('Blog post saved!');
      res.json(response);
    })
    .catch((err) => console.error('Error saving blog post', err));
})

app.use("/", postsRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

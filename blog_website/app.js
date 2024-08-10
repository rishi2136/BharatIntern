const express = require('express');
const path = require('path');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const ejsMate = require("ejs-mate");
const postsRouter = require("./routes/post");
const connectDB = require("./database");
const methodOverride = require('method-override')


connectDB()
  .then(() => console.log("Connected to the mongoDB database"))
  .catch((err) => console.error('Connection error', err))

app.engine('ejs', ejsMate);


app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // to parse the data
app.use(express.json()); // to parse the json data especially

//all the routes
app.use("/blogpost", postsRouter);

app.use((err, req, res, next) => {
  console.log(err.name);
  // Handle different types of errors using switch-case
  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      message = err.message || 'Validation failed';
      res.json(message).status(statusCode);
      break;
    case 'CastError':
      statusCode = 400;
      message = 'Invalid ID format';
      res.json(message).status(statusCode);
      break;
    default:
      statusCode = err.status || 500;
      message = err.message || 'Internal server error';
      res.json(message).status(statusCode);
      break;
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




//to initialize with some sample blogpost
// app.get("/create", async (req, res) => {
//   try {
//     await Blog.deleteMany();
//     console.log(dummyData);
//     const dummyBlogs = await Blog.insertMany(dummyData);
//     res.send(dummyBlogs);
//   } catch (err) {
//     res.json(err.message).status(err.status);
//   }
// })
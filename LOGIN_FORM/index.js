const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ejsMate = require("ejs-mate");
require("dotenv").config();
const User = require("./models/schema");
const dbConnection = require("./config/db");

// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);

dbConnection()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', "ejs");


app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse JSON bodies


// Routes
app.get("/user", (req, res) => {
  res.render("pages/index.ejs")
});



app.post("/user/auth", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.render("pages/failure.ejs");
      return;
    }
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) return err;
      let newUser = new User({
        name,
        email,
        password: hash,
      });
      let savedUser = await newUser.save();
      console.log(savedUser);
      res.render("pages/success.ejs");
    });
  } catch (error) {
    res.send("Something want wrong ! try again", error);
  }

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
const methodOverride = require('method-override')
const port = process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// database connection
async function main() {
  await mongoose.connect(process.env.MONGO_ATLAS_URL)
}
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

//Schema structure
let wealthSchema = new mongoose.Schema({
  info: String,
  date: Date,
  wealth_type: {
    type: String,
    enum: ["expanse", "income"]
  },
  amount: Number,
})
//create the model to work on
const Wealth = mongoose.model("Wealth", wealthSchema)

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to remove all
app.get('/remove', async (req, res, next) => {
  try {
    let response = await Wealth.deleteMany();
    console.log(response);
    res.json({ msg: "Truncated all detail from the database" });
  } catch (err) {
    next(err);
  }
})


// home page
app.get("/home", async (req, res, next) => {
  try {
    let wealthInfo = await Wealth.find();
    res.render("home.ejs", { wealthInfo })
  } catch (err) {
    next(err);
  }
})

//add new cash flow data
app.post('/add', async (req, res, next) => {
  try {
    let formData = req.body;
    let wealthDetail = new Wealth({
      info: formData.info,
      date: formData.date,
      wealth_type: formData.wealth_type,
      amount: formData.amount,
    })
    const saved = await wealthDetail.save();
    console.log("Added to your  database", saved);
    res.redirect("/home");
  } catch (err) {
    next(err);
  }

})

//delete particular chunk of data
app.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let deletedData = await Wealth.findByIdAndDelete(id);
    console.log("Deleted from your  database", deletedData);
    res.redirect("/home");
  } catch (err) {
    next(err);
  }
})


//error handler
app.use((err, req, res, next) => {
  console.log(err.name);
  let errMsg = err.message;
  if (err.name === "ValidationError") {
    errMsg = "You need to enter the valid field data"
  }
  else if (err.name === "CastError") {
    errMsg = "The given income is not considered, Please enter the numerical value"
  }
  res.render("error.ejs", { errMsg });
})


app.listen(port, () => {
  console.log(`You need to go on http://localhost:${port}`)
  console.log(`The server is listening at ${port}`);
})




const homePage = (req, res) => {
  res.render("index", { title: "starting new blog" })
}




module.exports = { homePage }
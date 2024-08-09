const express = require("express");
const router = express.Router();
const { homePage } = require("../controllers/post")

router.get("/", homePage)



module.exports = router;
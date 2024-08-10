const express = require("express");
const router = express.Router();
const blogController = require("../controllers/post");
const wrapAysnc = require("../utils/wrapAsync")

router.get("/", wrapAysnc(blogController.homePage))

router.route("/new")
  .get(blogController.blogPostCreateForm)
  .post(wrapAysnc(blogController.createBlogPost))

router.get("/:id/edit", wrapAysnc(blogController.blogPostEditForm))


router.route("/:id")
  .get(wrapAysnc(blogController.viewBlogPost))
  .put(wrapAysnc(blogController.editBlogPost))
  .delete(wrapAysnc(blogController.deleteBlogPost))



module.exports = router;
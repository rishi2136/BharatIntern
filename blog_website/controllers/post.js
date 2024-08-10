// const dummyData = require("../data/dummyData.json");
const Blog = require("../models/post");
const CustomError = require("../utils/CustomError")


//to render home page 
const homePage = async (req, res) => {
  const blogPosts = await Blog.find();
  res.render("pages/index", { blogPosts });
}

//to render blogpost create form
const blogPostCreateForm = (req, res) => {
  res.render("pages/createForm");
}

// Create a new blog post
const createBlogPost = async (req, res, next) => {
  const { title, intro, description } = req.body;
  if (!title || !intro || !description) {
    let { status, message } = new CustomError("All field are required", 400);
    return res.json(message).status(status);
  }
  const newBlog = new Blog({ title, intro, description });
  const savedBlog = await newBlog.save();
  console.log(savedBlog);
  res.redirect("/blogpost");
};


// Get a single blog post by ID
const viewBlogPost = async (req, res) => {
  const blogPost = await Blog.findById(req.params.id);
  if (!blogPost) {
    let { status, message } = new CustomError("Blog Post not found", 404);
    return res.json(message).status(status);
  }
  res.render("pages/viewBlogPost", { blogPost });
};

const blogPostEditForm = async (req, res, next) => {
  const blogPost = await Blog.findById(req.params.id);
  if (!blogPost) {
    let { status, message } = new CustomError("You search for the wrong user", 404);
    return res.json(message).status(status);
  }
  res.render("pages/editForm", { blogPost })
}


// Update a blog post by ID
const editBlogPost = async (req, res) => {
  const { title, intro, description } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, intro, description },
    { new: true, runValidators: true }
    // `new: true` returns the updated document and runvalidator apply schema validation 
  );
  // Check if the blog post exists
  if (!updatedBlog) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  res.redirect("/blogpost");
};



// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {

  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  // Check if the blog post exists
  if (!deletedBlog) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  res.redirect("/blogpost");
};



module.exports = { homePage, createBlogPost, blogPostCreateForm, viewBlogPost, editBlogPost, deleteBlogPost, blogPostEditForm }
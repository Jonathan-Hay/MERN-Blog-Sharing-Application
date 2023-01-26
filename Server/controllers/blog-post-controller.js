import mongoose from "mongoose";
import BlogPost from "../model/BlogPost.js";
import User from "../model/User.js";

export const getAllBlogPosts = async (req, res, next) => {
  let allBlogPosts;

  try {
    allBlogPosts = await BlogPost.find().populate("author");
  } catch (e) {
    return console.log(e);
  }

  if (!allBlogPosts) {
    return res.status(400).json({ message: "No blog posts found!" });
  }

  return res.status(200).json({ allBlogPosts });
};

export const newBlogPost = async (req, res, next) => {
  const { title, text, image, author } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(author);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find User By This ID" });
  }

  const blog = new BlogPost({
    title,
    text,
    image,
    author,
  });

  try {
    const { _id } = await blog.save();

    existingUser.blogs.push(_id);
    await existingUser.save();

    console.log("Post created for user");
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

export const editBlogPost = async (req, res, next) => {
  console.log("EDITING");
  const { title, text } = req.body;

  const blogID = req.params.id;

  let blogPost;

  try {
    blogPost = await BlogPost.findByIdAndUpdate(blogID, {
      title,
      text,
    });
  } catch (e) {
    return console.log(e);
  }

  if (!blogPost) {
    return res.status(500).json({ message: "Post not found!" });
  }

  return res.status(200).json({ blogPost });
};

export const getPostByID = async (req, res, next) => {
  const id = req.params.id;

  let blogPost;

  try {
    blogPost = await BlogPost.findById(id);
  } catch (e) {
    return console.log(e);
  }

  if (!blogPost) {
    return res.status(404).json({ message: "Blog post not found! " });
  }

  return res.status(200).json({ blogPost });
};

export const removeBlogPost = async (req, res, next) => {
  const id = req.params.id;

  let blogPost;

  try {
    blogPost = await BlogPost.findByIdAndDelete(id).populate("author");
    await blogPost.author.blogs.pull(blogPost);

    await blogPost.author.save();
  } catch (e) {
    console.log(e);
  }

  if (!blogPost) {
    res.status(500).json({ message: "Post not found" });
  }

  return res.status(200).json({ message: "Deleted blog post!" });
};

export const getUserByID = async (req, res, next) => {
  const userID = req.params.id;

  let userAndBlogs;

  try {
    userAndBlogs = await User.findById(userID).populate("blogs");
  } catch (e) {
    return console.log(e);
  }

  if (!userAndBlogs) {
    return res.status(404).json({ message: "Not found!" });
  }

  return res.status(200).json({ userAndBlogs });
};

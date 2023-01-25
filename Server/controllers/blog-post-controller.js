import mongoose from "mongoose";
import BlogPost from "../model/BlogPost.js";
import User from "../model/User.js";

export const getAllBlogPosts = async (req, res, next) => {
  let allBlogPosts;

  try {
    allBlogPosts = await BlogPost.find().populate("author");

    let test = await BlogPost.find();
    console.log(test);
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

  const blog = new Blog({
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
export const editBlogPost = async (req, res, next) => {};
export const getPostByID = async (req, res, next) => {};
export const removeBlogPost = async (req, res, next) => {};
export const getUserByID = async (req, res, next) => {};
export const getAllBlogs = async (req, res, next) => {};

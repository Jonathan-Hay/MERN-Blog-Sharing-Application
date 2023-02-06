import express from "express";
import {
    getAllBlogPosts,
    newBlogPost,
    editBlogPost,
    getPostByID,
    removeBlogPost,
    getUserByID,
} from '../controllers/blog-post-controller.js';
  

const postRouter = express.Router();

postRouter.get("/", getAllBlogPosts);
postRouter.post("/new", newBlogPost);
postRouter.patch("/edit/:id", editBlogPost);
postRouter.get("/:id", getPostByID);
postRouter.delete("/:id", removeBlogPost);
postRouter.get("/user/:id", getUserByID);  //perhaps move

export default postRouter;

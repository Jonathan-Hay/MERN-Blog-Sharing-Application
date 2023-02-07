import express from "express";
import { checkAuth } from '../middlewares/checkAuth.js';

import {
    getAllBlogPosts,
    newBlogPost,
    editBlogPost,
    getPostByID,
    removeBlogPost,
    getUserByID,
} from '../controllers/blog-post-controller.js';
  

const postRouter = express.Router();

postRouter.get("/user/:id", getUserByID);  //perhaps move
postRouter.get("/", getAllBlogPosts);
postRouter.get("/:id", getPostByID);

postRouter.use(checkAuth);

postRouter.post("/new", newBlogPost);
postRouter.patch("/edit/:id", editBlogPost);
postRouter.delete("/:id", removeBlogPost);

export default postRouter;

import express from "express";

const postRouter = express.Router();

postRouter.get("/", getAllBlogPosts);
postRouter.post("/new", newBlogPost);
postRouter.put("/edit/:id", editBlogPost);
postRouter.get("/:id", getPostByID);
postRouter.delete("/remove", removeBlogPost);
postRouter.get("/user/:id", getUserByID);

export default postRouter;

import express from 'express';


const userRouter = express.Router();

postRouter.get("/", getAllUsers);
postRouter.post("/", signup);
postRouter.post("/", login);

export default userRouter;
import express from 'express';
import {
    signup,
    login,
    getAllUsers,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

postRouter.get("/", getAllUsers);
postRouter.post("/", signup);
postRouter.post("/", login);

export default userRouter;
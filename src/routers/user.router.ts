import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
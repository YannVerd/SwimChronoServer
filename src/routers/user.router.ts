import { Router } from "express";
import { authUser, logout, loginUser, registerUser } from "../controllers/user.controller";
import { auth } from "../auth/token";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/auth", auth, authUser);
userRouter.get("/logout", logout)
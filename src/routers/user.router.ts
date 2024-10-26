import { Router } from "express";
import { insertUser } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/insert", insertUser);
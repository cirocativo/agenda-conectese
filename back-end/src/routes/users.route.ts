import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserProfileController,
  getUsersController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

export const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  getUsersController
);
userRouter.get("/profile", ensureAuthMiddleware, getUserProfileController);

userRouter.patch("", ensureAuthMiddleware, updateUserController);
userRouter.delete("", ensureAuthMiddleware, deleteUserController);

import { Router } from "express";
import {
  createUserController,
  deleteUserController,
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
userRouter.patch("/:id", ensureAuthMiddleware, updateUserController);
userRouter.delete("/:id", ensureAuthMiddleware, deleteUserController);

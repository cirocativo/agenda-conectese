import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
} from "../controllers/contacts.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

export const contactRouter = Router();

contactRouter.post("", ensureAuthMiddleware, createContactController);
contactRouter.get("", ensureAuthMiddleware, getContactsController);
contactRouter.patch("/:id", ensureAuthMiddleware, updateContactController);
contactRouter.delete("/:id", ensureAuthMiddleware, deleteContactController);

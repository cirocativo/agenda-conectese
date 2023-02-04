import { Router } from "express";
import AppError from "../errors/AppError";

export const errorRouter = Router();

errorRouter.get("", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

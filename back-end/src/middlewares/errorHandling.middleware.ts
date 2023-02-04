import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export default function errorHandlingMiddleware(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({ message: "Internal Server Error" });
}

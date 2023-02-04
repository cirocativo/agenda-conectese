import { Request, Response } from "express";
import { ILogin } from "../interfaces";
import { loginService } from "../services/login.service";
import { instanceToPlain } from "class-transformer";

export const loginController = async (request: Request, response: Response) => {
  const data: ILogin = request.body;

  const loginResponse = await loginService(data);

  return response.json(instanceToPlain(loginResponse));
};

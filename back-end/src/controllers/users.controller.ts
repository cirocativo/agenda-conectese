import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserUpdate } from "../interfaces";
import {
  createUserService,
  deleteUserService,
  getUserProfileService,
  getUsersService,
  updateUserService,
} from "../services/users.service";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const newUser = request.body;

  const { password, ...userProps } = await createUserService(newUser);

  return response.status(201).json({ ...userProps });
};

export const getUserProfileController = async (
  request: Request,
  response: Response
) => {
  const id = request.user.id;

  const user = await getUserProfileService(id);

  return response.json(instanceToPlain(user));
};

export const getUsersController = async (
  request: Request,
  response: Response
) => {
  const users = await getUsersService();

  return response.json(instanceToPlain(users));
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const user: IUserUpdate = request.body;
  const id: string = request.user.id;

  const updatedUser = await updateUserService(user, id);

  return response.status(201).json(instanceToPlain(updatedUser));
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.user.id;

  await deleteUserService(id);

  return response.status(204).send();
};

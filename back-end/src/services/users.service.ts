import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces";

import * as bcrypt from "bcryptjs";
import AppError from "../errors/AppError";

export const createUserService = async ({
  name,
  email,
  isAdm,
  password,
  phone,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  console.log("vai procurar agora");
  const userAlreadyExists = await userRepository.findOne({
    where: {
      email,
    },
  });
  console.log("arouca", userAlreadyExists);
  if (userAlreadyExists) throw new AppError("E-mail already exists", 403);

  console.log("marimba");
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
    phone,
  });

  await userRepository.save(user);

  return user;
};

export const getUserProfileService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) throw new AppError("User not found", 404);

  return user;
};

export const getUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export const updateUserService = async (
  { email, name, password, phone }: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!findUser) throw new AppError("Invalid id", 404);

  await userRepository.update(id, {
    email: email || findUser.email,
    name: name || findUser.name,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
    phone: phone || findUser.phone,
  });

  const updatedUser = await userRepository.findOneBy({
    id,
  });

  return updatedUser!;
};

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) throw new AppError("Invalid id", 404);

  await userRepository.delete({ id });

  return "User deleted successfully";
};

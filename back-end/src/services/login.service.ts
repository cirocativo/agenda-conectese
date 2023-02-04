import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { ILogin, ILoginResponse } from "../interfaces";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import AppError from "../errors/AppError";

export const loginService = async ({
  email,
  password,
}: ILogin): Promise<ILoginResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) throw new AppError("Wrong e-mail/password", 403);

  const passwordMatched = bcrypt.compareSync(password, user.password);

  if (!passwordMatched) throw new AppError("Wrong e-mail/password", 403);

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      email: user.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return { user, token };
};

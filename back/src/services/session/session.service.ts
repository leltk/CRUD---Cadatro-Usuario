import { compare } from "bcryptjs";
import {
  ISessionRequest,
  ISessionResponse,
} from "../../interfaces/session.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";

const sessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<ISessionResponse> => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Email or password invalid");
  }

  const comparePass = await compare(password, user.password);

  if (!comparePass) {
    throw new AppError("Email or password invalid");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRETKEY as string, {
    subject: user.id,
    expiresIn: "24h",
  });

  return { token };
};

export default sessionService;
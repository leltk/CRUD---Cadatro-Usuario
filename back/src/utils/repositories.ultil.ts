import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const usersRepository = AppDataSource.getRepository(User);

export {
  usersRepository
};
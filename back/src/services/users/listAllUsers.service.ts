import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IDataUserResponse } from "../../interfaces/users.interfaces"; 

const listAllUsersService = async (): Promise<IDataUserResponse[]> => {
  const usersRepository = AppDataSource.getRepository(User);
  return await usersRepository.find({ relations: { contacts: true } });
};

export default listAllUsersService;
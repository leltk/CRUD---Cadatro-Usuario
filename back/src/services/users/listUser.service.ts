import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IDataUserResponse } from "../../interfaces/users.interfaces";

const listUserIDService = async (
  idUser: string
): Promise<IDataUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOne({
    where: { id: idUser },
    
  });

  return users;
};

export default listUserIDService;

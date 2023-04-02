import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IDataUserRequest } from "../../interfaces/users.interfaces";


const createUserService = async ({
  ...dataUser
}: IDataUserRequest): Promise<IDataUserRequest> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ email: dataUser.email });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const user = userRepository.create(dataUser);
  await userRepository.save(user);

  return user;
};

export default createUserService;

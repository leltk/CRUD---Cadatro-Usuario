import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import {
  IDataUserUpdateResponse,
  IUpdateUserRequest,
} from "../../interfaces/users.interfaces"

const updateUserService = async (
  userId: string,
  dataUser: IUpdateUserRequest
): Promise<IDataUserUpdateResponse> => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({ id: userId });

  if (dataUser.email) {
    const findUser = await usersRepository.findOneBy({
      email: dataUser.email,
    });

    if (findUser && findUser.id !== user.id)
      throw new AppError("User already exists", 409);
  }

  const updatedUser = { ...user, ...dataUser };

  if (dataUser.password) updatedUser.password = hashSync(dataUser.password, 10);
  await usersRepository.save(updatedUser);

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export default updateUserService;
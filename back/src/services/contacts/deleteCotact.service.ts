import { Contact } from "../../entities/contact.entity";
import AppDataSource from "../../data-source";

export const deleteContactService = async (id: string): Promise<void> => {

  const contactsRepository = AppDataSource.getRepository(Contact);
  await contactsRepository.delete(id);
};
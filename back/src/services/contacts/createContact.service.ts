import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Contact } from "../../entities/contact.entity";
import { ICreateContactRequest } from "../../interfaces/contacts.interfaces";
import { AppError } from "../../errors/errors";

export const createContactService = async (
  dataContact: ICreateContactRequest,
  user: User
) => {
  const contactsRepository = AppDataSource.getRepository(Contact);

  const contactExists = await contactsRepository.findOneBy({
    phone: dataContact.phone,
  });

  if (contactExists) {
    throw new AppError(
      `Contact with email ${contactExists.email} or phone ${contactExists.phone} already exists.`
    );
  }

  const contact = contactsRepository.create({ ...dataContact, user });
  await contactsRepository.save(contact);

  const {
    user: { password: password, ...userWithoutPassword },
    ...contactInfo
  } = contact;

  return  contact;
};
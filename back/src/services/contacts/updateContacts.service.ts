import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import {
  IUpdateContactRequest,
  IUpdateContactResponse,
} from "../../interfaces/contacts.interfaces";

export const updateContactService = async (
  contact: Contact,
  dataContact: IUpdateContactRequest
): Promise<IUpdateContactResponse> => {
  const contactsRepository = AppDataSource.getRepository(Contact);

  const updatedContact = { ...contact, ...dataContact };

  await contactsRepository.save(updatedContact);

  return updatedContact;
};
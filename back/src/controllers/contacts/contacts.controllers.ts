import { Request, Response } from "express";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import {
  ICreateContactRequest,
  IUpdateContactRequest,
} from "../../interfaces/contacts.interfaces";
import { createContactService } from "../../services/contacts/createContact.service";
import { updateContactService } from "../../services/contacts/updateContacts.service";
import { instanceToPlain } from "class-transformer";
import { deleteContactService } from "../../services/contacts/deleteCotact.service";;
import { listContactsService } from "../../services/contacts/listContact.services";

const createContactController = async (req: Request, res: Response) => {
  const dataContact: ICreateContactRequest = req.body;
  const user: User = req.user
  const contact = await createContactService(dataContact, user);
  return res.status(201).json(instanceToPlain(contact));
};

const updateContactController = async (req: Request, res: Response) => {
  const dataContact: IUpdateContactRequest = req.body;
  const contactInRequest: Contact = req.contact;
  const contact = await updateContactService(contactInRequest, dataContact);
  return res.status(200).json(instanceToPlain(contact));
};

const deleteContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  await deleteContactService(contactId);
  return res.status(204).json();
};

const listContactsController = async (req: Request, res: Response) => {
  const userid = req.user.id
  const contacts = await listContactsService(userid);
  return res.status(200).json(contacts);
};

export {
  createContactController,
  updateContactController,
  deleteContactController,
  listContactsController,
};
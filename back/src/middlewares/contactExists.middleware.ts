import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entity";

export const contactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactId = +req.params.id;

  const contactsRepository = AppDataSource.getRepository(Contact);
  const contact = await contactsRepository.findOneBy({ id: contactId });

  if (!contact) {
    return res.status(404).json({ message: "Contact not found." });
  }

  req.contact = contact;

  next();
};
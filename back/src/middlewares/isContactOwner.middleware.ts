import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entity";

export const isContactOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactId = +req.params.id;

  const contactsRepository = AppDataSource.getRepository(Contact);
  const contact = await contactsRepository.findOne({
    where: { id: contactId },
    relations: ['user']
  });
  if (contact.user.id != req.user.id) {
    return res.status(403).json({ message: "You are not contact owner" });
  }

  req.contact = contact;

  next();
};
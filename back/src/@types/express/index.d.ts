import * as express from "express";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user: User;
      id: string;
      contact: Contact;

    }
  }
}
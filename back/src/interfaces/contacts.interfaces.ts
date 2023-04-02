import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";

export interface ICreateContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ICreateContactResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  user: User;
}

export interface IContactResponse {
  user: {
    user_id: string;
    user_name: string;
    user_email: string;
  };
  contacts: Contact[];
}

export interface IUpdateContactRequest {
  name?: string;
  phone?: string;
  email?: string;
}

export interface IUpdateContactResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  user: User;
}
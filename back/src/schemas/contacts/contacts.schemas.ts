import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICreateContactRequest,
  IUpdateContactRequest,
} from "../../interfaces/contacts.interfaces";

const contactCreateSchema: SchemaOf<ICreateContactRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().length(9).required(),
  });

const contactUpdateSchema: SchemaOf<IUpdateContactRequest> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string().length(9),
  });

export { contactCreateSchema, contactUpdateSchema };
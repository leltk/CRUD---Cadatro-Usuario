import * as yup from "yup";
import { SchemaOf} from "yup";
import { IDataUserRequest, IDataUserUpdateResponse, IUpdateUserRequest } from "../../interfaces/users.interfaces"


const userRequestSchema: SchemaOf<IDataUserRequest> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  image: yup.string().required(),
  phone: yup.string().required().min(9),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateRequestSchema: SchemaOf<IUpdateUserRequest> = yup.object().shape({
  name: yup.string(),
  age: yup.number(),
  image: yup.string(),
  phone: yup.string().min(9).max(9),
  email: yup.string().email(),
  password: yup.string(),
});

const userResponseUpdateSchema: SchemaOf<IDataUserUpdateResponse> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  age: yup.number().required(),
  image: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

export {
  userRequestSchema,
  userUpdateRequestSchema,
  userResponseUpdateSchema,
};
import { Router } from "express";
import { createContactController, updateContactController,deleteContactController,listContactsController } from "../controllers/contacts/contacts.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import validatedBodyMiddleware
 from "../middlewares/validatedData.middleware";
 import { contactExistsMiddleware } from "../middlewares/contactExists.middleware";
import { contactCreateSchema, contactUpdateSchema } from "../schemas/contacts/contacts.schemas";
import { isContactOwnerMiddleware } from "../middlewares/isContactOwner.middleware";
const ContactRouter = Router();


ContactRouter.post("/",
 authTokenMiddleware,
 validatedBodyMiddleware(contactCreateSchema),
 createContactController
);

ContactRouter.patch(
  "/:id",
  authTokenMiddleware,
  validatedBodyMiddleware(contactUpdateSchema),
  contactExistsMiddleware,
  isContactOwnerMiddleware,
  updateContactController
);

ContactRouter.delete(
  "/:id",
  authTokenMiddleware,
  contactExistsMiddleware,
  deleteContactController
);

ContactRouter.get(
  "/",
  authTokenMiddleware,
  listContactsController
)
export default ContactRouter;
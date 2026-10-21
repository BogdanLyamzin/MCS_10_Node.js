import { Router } from "express";

import {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  deleteContactById,
} from "../controllers/contacts.controller.ts";

import { contactIdSchema, createContactSchema, updateContactSchema } from './../validation/contacts.validation.ts';
import { paginationQuerySchema } from "../validation/index.validation.ts";

import validateBody from "../middlewares/validate-body.middleware.ts";
import validateId from "../middlewares/validate-id.middleware.ts";
import validateQuery from "../middlewares/validate-query.middleware.ts";

const contactsRouter = Router();

contactsRouter.get("/", validateQuery(paginationQuerySchema), getContacts);

contactsRouter.get("/:id", validateId(contactIdSchema), getContactsById);

contactsRouter.post("/", validateBody(createContactSchema), addContact);

contactsRouter.put("/:id", validateId(contactIdSchema), validateBody(updateContactSchema), updateContactById);

contactsRouter.delete("/:id", validateId(contactIdSchema), deleteContactById);

export default contactsRouter;

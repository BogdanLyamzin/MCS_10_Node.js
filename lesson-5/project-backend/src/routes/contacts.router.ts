import {Router} from "express";

import {checkContacAddBody, checkContacUpdateBody} from "../validation/contacts.validation.ts";

import {getContacts, getContactsById, addContact, updateContactById, deleteContactById} from "../controllers/contacts.controller.ts";

const contactsRouter = Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContactsById);

contactsRouter.post("/", checkContacAddBody, addContact);

contactsRouter.put("/:id", checkContacUpdateBody, updateContactById)

contactsRouter.delete("/:id", deleteContactById);

export default contactsRouter;
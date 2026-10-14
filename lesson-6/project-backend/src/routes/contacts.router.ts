import {Router} from "express";

import {getContacts, getContactsById, addContact, updateContactById, deleteContactById} from "../controllers/contacts.controller.ts";

const contactsRouter = Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContactsById);

contactsRouter.post("/", addContact);

contactsRouter.put("/:id", updateContactById)

contactsRouter.delete("/:id", deleteContactById);

export default contactsRouter;
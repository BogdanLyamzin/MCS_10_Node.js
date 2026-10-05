import {Router} from "express";

import {getContacts, getContactsById} from "../controllers/contacts.controller.ts";

const contactsRouter = Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContactsById);

export default contactsRouter;
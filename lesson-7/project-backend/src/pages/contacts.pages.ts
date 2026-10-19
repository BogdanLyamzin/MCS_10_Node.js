import { Router } from "express";

import { getContactsPage, getContactByIdPage } from "../controllers/contacts-pages.controller.ts";

const contactsPagesRouter = Router();

contactsPagesRouter.get("/", getContactsPage);

contactsPagesRouter.get("/:id", getContactByIdPage);

export default contactsPagesRouter;
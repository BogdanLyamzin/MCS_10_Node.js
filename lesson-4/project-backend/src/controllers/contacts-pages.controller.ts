import { type Request, type Response } from "express";

import {
  getContactsFromStorage,
} from "../services/contacts.service.ts";

export const getContactsPage = async (req: Request, res: Response) => {
  const contacts = await getContactsFromStorage();
  res.render("contacts", { title: "My contacts", contacts });
};

export const getContactByIdPage = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const contact = contacts.find((item) => item.id === id);
  if (!contact) {
    return res.render("contact-id", {
      id,
      title: `Contact ${id} not found`,
    });
  }

  res.render("contact-id", {
    id,
    title: `Contact ${id}`,
    contact,
  });
};

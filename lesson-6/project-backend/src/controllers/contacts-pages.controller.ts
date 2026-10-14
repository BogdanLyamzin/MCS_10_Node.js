import { type Request, type Response } from "express";

import prisma from "../db.ts";

export const getContactsPage = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany();
  res.render("contacts", { title: "My contacts", contacts });
};

export const getContactByIdPage = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.findUnique({
    where: {
      id
    }
  });

  res.render("contact-id", {
    id,
    title: `Contact ${id}`,
    contact,
  });
};

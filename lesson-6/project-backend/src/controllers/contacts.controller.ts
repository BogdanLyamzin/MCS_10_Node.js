import { type Request, type Response } from "express";

import prisma from "../db.ts";

import HttpError from "../classes/HttpError.ts";

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany();
  res.json(contacts);
};

export const getContactsById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.findUnique({
    where: {
      id
    }
  });

  if (!contact) throw new HttpError(`Contact with id=${id}`, 404);

  res.json(contact);
};

export const addContact = async (req: Request, res: Response) => {
 const contact = await prisma.contact.create({
  data: req.body,
 });
  res.status(201).json(contact);
};

export const updateContactById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.update({
    where: {
      id
    },
    data: req.body
  });
  if (!contact) throw new HttpError(`Contact with id=${id}`, 404);
  res.json(contact);
};



export const deleteContactById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.delete({
    where: {
      id
    }
  });

  if (!contact) throw new HttpError(`Contact with id=${id}`, 404);

  res.json(contact);
};

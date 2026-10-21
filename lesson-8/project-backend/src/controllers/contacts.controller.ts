import { type Request, type Response } from "express";

import prisma from "../db.ts";

import HttpError from "../classes/HttpError.ts";

import { type ContactId } from "../validation/contacts.validation.ts";

export const getContacts = async (req: Request, res: Response) => {
 const {page, limit} = res.locals.query;
  const [contacts, total] =  await Promise.all([prisma.contact.findMany({
    skip: (page - 1) * limit,
    take: limit,
  }), prisma.contact.count()]);

  res.json({
    contacts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total/ limit)
    }
  });
};

export const getContactsById = async (
  req: Request,
  res: Response<unknown, ContactId>,
) => {
  const {id} = res.locals;
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

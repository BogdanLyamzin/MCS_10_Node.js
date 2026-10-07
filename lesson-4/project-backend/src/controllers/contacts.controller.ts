import { type Request, type Response } from "express";

import HttpError from "../classes/HttpError.ts";

import { getContactsFromStorage, updateContactsInStorage } from "../services/contacts.service.ts";

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await getContactsFromStorage();
  res.json(contacts);
};

export const getContactsById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const result = contacts.find((item) => item.id === id);

  if (!result) throw new HttpError(`Contact with id=${id}`, 404);

  res.json(result);
};

export const addContact = async (req: Request, res: Response) => {
  const contacts = await getContactsFromStorage();
  // const nextId = contacts[contacts.length - 1].id + 1;
  const nextId = (contacts[contacts.length - 1]?.id ?? 0) + 1;
  const newContact = {
    id: nextId,
    ...req.body,
  };
  contacts.push(newContact);
  await updateContactsInStorage(contacts);
  res.status(201).json(newContact);
};

export const updateContactById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) throw new HttpError(`Contact with id=${id}`, 404);
  contacts[idx] = { ...contacts[idx], ...req.body };
  await updateContactsInStorage(contacts);
  res.json(contacts[idx]);
};

export const deleteContactById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) throw new HttpError(`Contact with id=${id}`, 404);
  const [result] = contacts.splice(idx, 1);
  await updateContactsInStorage(contacts);
  res.json(result);
};

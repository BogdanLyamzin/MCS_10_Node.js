import { type Request, type Response } from "express";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const contactsPath = resolve("src", "data", "contacts.json");

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const getContactsFromStorage = async (): Promise<Contact[]> =>
  JSON.parse(await readFile(contactsPath, "utf-8"));

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await getContactsFromStorage();
  res.json(contacts);
};

export const getContactsById = async (req: Request<{id: string}>, res: Response) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const result = contacts.find((item) => item.id === id);
  res.json(result);
};



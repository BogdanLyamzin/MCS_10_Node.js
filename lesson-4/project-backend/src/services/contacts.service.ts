import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const contactsPath = resolve("src", "data", "contacts.json");

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const getContactsFromStorage = async (): Promise<Contact[]> =>
  JSON.parse(await readFile(contactsPath, "utf-8"));

export const updateContactsInStorage = (contacts: Contact[]) =>
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));
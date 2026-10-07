import { type Request, type Response } from "express";

import {
  getContactsFromStorage,
  updateContactsInStorage,
} from "../services/contacts.service.ts";

export const getContactsPage = async (req: Request, res: Response) => {
  const contacts = await getContactsFromStorage();

//   const contactsHtml = contacts
//     .map(
//       (item) => `<li>
//         <p><strong>${item.name}</strong></p>
//         <p>Email: ${item.email}</p>
//         <p>Phone: ${item.phone}</p>
//         </li>`,
//     )
//     .join("");

//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>My contacts</title>
//     </head>
//     <body>
//         <h1>My contacts</h1>
//         <ul>
//         ${contactsHtml}
//         </ul>
//     </body>
//     </html>
//     `;
  res.render("contacts", {contacts});
};

export const getContactByIdPage = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contacts = await getContactsFromStorage();
  const contact = contacts.find((item) => item.id === id);
  let html = "";
  if (!contact) {
    html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact ${id} not found</title>
    </head>
    <body>
        <h1>Contact ${id} not found</h1>
    </body>
    </html>
    `;
  } else {
    html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact ${id}</title>
    </head>
    <body>
        <h1>Contact ${contact.name}</h1>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.phone}</p>
    </body>
    </html>
    `;
  }
  res.send(html);
};

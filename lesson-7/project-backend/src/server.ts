import express from "express";
import {resolve} from "node:path";

import notFoundMiddleware from "./middlewares/not-found.middleware.ts";
import errorMiddleware from "./middlewares/error.middleware.ts";

import contactsPagesRouter from "./pages/contacts.pages.ts";
import contactsRouter from "./routes/contacts.router.ts";

const viewsPath = resolve("src", "views");

const app = express();

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.json());

app.use("/pages/contacts", contactsPagesRouter);
app.use("/api/contacts", contactsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(3000, () => console.log("Server running on 3000 port"));

import express from "express";

import notFoundMiddleware from "./middlewares/not-found.middleware.ts";
import errorMiddleware from "./middlewares/error.middleware.ts";

import contactsRouter from "./routes/contacts.router.ts";

const app = express(); // app - web-server

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// });

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// });

app.get("/", (request, response) => {
  console.log(request.url);
  console.log(request.method);
  response.send("<h1>Home page</h1>");
  // console.log("After send response");
});

app.use("/api/contacts", contactsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(3000, () => console.log("Server running on 3000 port"));

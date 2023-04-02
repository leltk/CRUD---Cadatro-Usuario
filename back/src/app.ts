import "express-async-errors";
import "reflect-metadata";
import express from "express";
import userRouter from "./router/users.routes";
import sessionRouter from "./router/session.routes";
import { errorHandler } from "./errors/errors";
import ContactRouter from "./router/contacts.routes";

const app = express();

app.use(express.json());

app.use("/users", UserRouter);
app.use("/login", SessionRouter);
app.use('/contacts',ContactRouter)


// app.use(errorHandler);

export default app;

import "express-async-errors";
import "reflect-metadata";
import express from "express";
import userRouter from "./router/users.routes";
import sessionRouter from "./router/session.routes";
import { errorHandler } from "./errors/errors";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/login", sessionRouter);

// app.use(errorHandler);

export default app;

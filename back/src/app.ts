import "express-async-errors";
import "reflect-metadata";
import express from "express";
// import { UserRouter } from "./router/users.routes";
// import { addressRouter } from "./router/address.router";

const app = express();

app.use(express.json());
// app.use("/users", UserRouter);
// app.use("/users", addressRouter);


// app.use(errorHandler);

export default app;

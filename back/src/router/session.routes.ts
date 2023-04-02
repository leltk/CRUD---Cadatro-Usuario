import Router from "express";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import { sessionController } from "../controllers/session/session.controllers";
import { sessionSchema } from "../schemas/session/session.schemas";

const SessionRouter = Router();

SessionRouter.post(
  "",
  validatedBodyMiddleware(sessionSchema),
  sessionController
);

export default SessionRouter;
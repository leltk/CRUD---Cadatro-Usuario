import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/users/user.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { userExistsMiddlewere } from "../middlewares/userExists.middleware";
import { validateUserPermissionsMiddlewere } from "../middlewares/validateUserPermissions.middleware";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import {
  userRequestSchema,
  userUpdateRequestSchema,
} from "../schemas/users/users.schemas";

const userRouter = Router();

userRouter.post(
  "",
  validatedBodyMiddleware(userRequestSchema),
  createUserController
);

userRouter.get("", authTokenMiddleware,getAllUsersController);

userRouter.get(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  getUserByIdController
);

userRouter.patch(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  validatedBodyMiddleware(userUpdateRequestSchema),
  updateUserController
);

userRouter.delete(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  deleteUserController
);

export default userRouter
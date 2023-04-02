import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { usersRepository } from "../utils/repositories.ultil";
import { IDataUserResponse } from "../interfaces/users.interfaces";
import { User } from "../entities/user.entity";


export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = authToken?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRETKEY as string,
    (error: Error, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
        });
      }
     
      req.id = decoded.sub as string;
      
    }
  );
  const user = await usersRepository.findOneBy({id: req.id})
  req.user = user
  return next();
};
import { Response, Request, NextFunction, response } from "express";
import { messageFormater } from "../../libs/messageFormater";
import { Exception } from "../../libs/exceptionHandler";
import { CreateUserSchemaType, UserIdSchemaType } from "./user.schema";
import { userService } from "./user.service";

export const UserController = {
  addUser: async (
    req: Request<{}, {}, CreateUserSchemaType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData = req.body;
      const response = await userService.addUser(userData);
      res
        .status(201)
        .json(
          messageFormater(true, "Successfully added user data", response, 200),
        );
    } catch (error) {
      next(error);
    }
  },

  findAllUsers: async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await userService.findAllUsers();
      res
        .status(201)
        .json(
          messageFormater(true, "Successfully fetched all user", response, 200),
        );
    } catch (error) {
      next(error);
    }
  },

  findById: async (
    req: Request<UserIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const response = await userService.findUserById(id);
      res
        .status(201)
        .json(
          messageFormater(true, "Successfully fetched the user", response, 200),
        );
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (
    req: Request<UserIdSchemaType, {}, CreateUserSchemaType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      console.log("user data in controller", userData);

      const response = await userService.updateUser(id, userData);
      res
        .status(201)
        .json(
          messageFormater(
            true,
            response,
            "Successfully updated user data",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (
    req: Request<UserIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const response = await userService.deleteUser(id);
      res.status(201).json(
        messageFormater(
          true,
          "Successfully deleted user data",
          response,
          200,
        ),
      );
    } catch (error) {
      next(error);
    }
  },
};

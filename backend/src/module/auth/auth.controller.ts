import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { LoginSchemaType } from "./auth.schema";
import { messageFormater } from "../../libs/messageFormater";

export const AuthController = {
  login: async (
    req: Request<{}, {}, LoginSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userName, password } = req.body;

      const user = await authService.login(userName, password);

      res.status(200).json(
        messageFormater(
          true,
          "Login successful",
          user,
          200
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

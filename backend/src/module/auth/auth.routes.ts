import { Router } from "express";
import ZOD from "../../middlewares/schemaValidator";
import { loginSchema } from "./auth.schema";
import { AuthController } from "./auth.controller";

export const AuthRouter = (route: Router) => {
  route.post(
    "/auth/login",
    ZOD.requestParser({
      schema: loginSchema,
      type: "Body",
    }),
    AuthController.login
  );
};

import { Router } from "express";
import ZOD from "../../middlewares/schemaValidator";

import { UserController } from "./user.controller";
import { createUserSchema, userIdSchema } from "./user.schema";
import { TableController } from "../table/table.controller";
import { TableIdSchema } from "../table/table.schema";

export const UserRouter = (route: Router) => {
  route.get("/users", UserController.findAllUsers);
  route.post(
    "/user",
    ZOD.requestParser({
      schema: createUserSchema,
      type: "Body",
    }),
    UserController.addUser,
  );

  route.get(
    "/table/:tableNumber",
    ZOD.requestParser({
      schema: TableIdSchema,
      type: "Params",
    }),
    TableController.findByNumber,
  );
  route.delete(
    "/table/:id",
    ZOD.requestParser({
      schema: TableIdSchema,
      type: "Params",
    }),
    TableController.deleteTable,
  );
  route.patch(
    "/user/update/:id",
    
    ZOD.requestParser(
      {
        schema: createUserSchema,
        type: "Body",
      },
      {
        schema: userIdSchema,
        type: "Params",
      },
    ),
    UserController.updateUser,
  );
};

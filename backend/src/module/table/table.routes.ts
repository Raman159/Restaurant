import { Router } from "express";
import ZOD from "../../middlewares/schemaValidator";

import { TableController,  } from "./table.controller";
import { CreateTableSchema, TableIdSchema, TableNumberSchema, UpdateTableSchema } from "./table.schema";
import { number, string } from "zod";


export const TableRouter = (route: Router) => {
  route.get("/tables", TableController.findAllTables);
  route.post(
    "/table",
    ZOD.requestParser({
      schema: CreateTableSchema,
      type: "Body",
    }),
    TableController.addTable,
  );

  route.get(
    "/table/:number",
    ZOD.requestParser({
      schema: TableNumberSchema,
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
    "/table/update/:id",
    ZOD.requestParser(
      {
        schema: UpdateTableSchema,
        type: "Body",
      },
      {
        schema: TableIdSchema,
        type: "Params",
      },
    ),
    TableController.updateTable,
  );
};

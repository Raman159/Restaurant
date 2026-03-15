import { Response, Request, NextFunction, response } from "express";
import { messageFormater } from "../../libs/messageFormater";
import { CreateTableSchemaType, TableIdSchemaType, UpdateTableSchemaType } from "./table.schema";
import { TableService } from "./table.service";
import { UserIdSchemaType } from "../user/user.schema";
import { userService } from "../user/user.service";

export const TableController = {
  addTable: async (
    req: Request<{}, {}, CreateTableSchemaType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const tableData = req.body;
      const response = await TableService.addTable(tableData);
      res
        .status(201)
        .json(
          messageFormater(true, "Successfully added table data", response, 200),
        );
    } catch (error) {
      next(error);
    }
  },

  findAllTables: async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await TableService.getAllTables();
      res
        .status(201)
        .json(
          messageFormater(
            true,
            "Successfully fetched all tables",
            response,
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  },

  findByNumber: async (
    req: Request<{ tableNumber: string }, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { tableNumber } = req.params;
      const response = await TableService.getTableByNumber(tableNumber);
      res
        .status(201)
        .json(
          messageFormater(
            true,
            "Successfully fetched the table",
            response,
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  },

  updateTable: async (
    req: Request<TableIdSchemaType, {}, UpdateTableSchemaType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      console.log("table data in controller", data,id);
      const response = await TableService.updateTable(
        id,
        data,
      );
      res
        .status(201)
        .json(
          messageFormater(
            true,
            response,
            "Successfully updated table data",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  },
  deleteTable: async (
    req: Request<TableIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const response = await TableService.deleteTable(id);
      res.status(201).json(
        messageFormater(
          true,

          "Successfully deleted table data",
          response,
          200,
        ),
      );
    } catch (error) {
      next(error);
    }
  },
};

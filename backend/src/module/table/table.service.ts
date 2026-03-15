import { Exception } from "../../libs/exceptionHandler";
import ORMHelper from "../../libs/ORMHelper";
import { TableRepository } from "./table.repository";
import { CreateTableSchemaType, UpdateTableSchemaType } from "./table.schema";

export const TableService = {
  addTable: async (data: CreateTableSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();

    try {
      const getTable = await TableRepository.findByNumber({
        runner,
        tableNumber: data.tableNumber,
      });
      if (getTable)
        throw new Exception(
          "Table number already exists, please choose another",
          400,
        );
      const response = await TableRepository.insert({ runner, data });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
  getTableByNumber: async (tableNumber: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await TableRepository.findByNumber({
        runner,
        tableNumber,
      });
      if (!response) throw new Exception("Unable to find table data", 400);

      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
  getAllTables: async () => {
    const runner = await ORMHelper.createQueryRunner();

    try {
      const response = await TableRepository.findAll({ runner });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
  updateTable: async (id: number, data: UpdateTableSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();

    try {
      const getTable = await TableRepository.findByNumber({
        runner,
        tableNumber: data.tableNumber! ,
      });
      if (getTable && getTable.id !== id)
        throw new Exception(
          "Table number already exists, please choose another",
          400,
        );

      const response = await TableRepository.updateTable({ runner, id, data });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
  deleteTable: async (id: number) => {
    const runner = await ORMHelper.createQueryRunner();

    try {
      const response = await TableRepository.delete({ runner, id });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
};

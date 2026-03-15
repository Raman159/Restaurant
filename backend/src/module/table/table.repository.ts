import { Runner } from "../../global/global";
import { Table } from "../../models/Table";
import { CreateTableSchemaType } from "./table.schema";

export const TableRepository = {
  // CREATE
  insert: async ({
    runner,
    data,
  }: Runner & { data: CreateTableSchemaType }) => {
    const repo = runner.manager.getRepository(Table);

    try {
      const response = await repo.save({
        tableNumber: data.tableNumber,
        status: data.status ?? "AVAILABLE",
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // GET BY ID
  findByNumber: async ({
    runner,
    tableNumber,
  }: Runner & Pick<Table, "tableNumber">) => {
    const repo = runner.manager.getRepository(Table);

    try {
      const response = await repo.findOne({
        where: { tableNumber },
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // GET ALL TABLES
  findAll: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(Table);

    try {
      const response = await repo.find({
        order: {
          tableNumber: "ASC",
        },
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // UPDATE
  updateTable: async ({
    runner,
    id,
    data,
  }: Runner & {
    id: number;
    data: Partial<Pick<Table, "tableNumber" | "status">>;
  }) => {
    const repo = runner.manager.getRepository(Table);

    try {
      await repo.update(id, data);

      const result = await repo.findOne({
        where: { id },
      });

      return result;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // DELETE
  delete: async ({ runner, id }: Runner & Pick<Table, "id">) => {
    const repo = runner.manager.getRepository(Table);

    try {
      const response = await repo.delete({
        id,
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  findById: async ({ runner, id }: Runner & Pick<Table, "id">) => {
    const repo = runner.manager.getRepository(Table);

    try {
      const response = await repo.findOne({
        where: { id },
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },
  findByStatus: async ({ runner, status }: Runner & Pick<Table, "status">) => {
    const repo = runner.manager.getRepository(Table);
    try {
      const response = await repo.find({
        where: { status },
      });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },
};

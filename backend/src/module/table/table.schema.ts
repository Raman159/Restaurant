import { z } from "zod";

export const TableStatusEnum = z.enum(["AVAILABLE", "OCCUPIED", "RESERVED"]);

export const CreateTableSchema = z.object({
  tableNumber: z.string(),
  status: TableStatusEnum.optional().default("AVAILABLE"),
});

export const UpdateTableSchema = z.object({
  tableNumber: z.string(),
  status: TableStatusEnum,
});

export const TableIdSchema = z.object({
  id: z.string({ required_error: "Table id is required" }),
}).strict();

export const TableNumberSchema = z.object({
  number: z.string({ required_error: "Table number is required" }),
}).strict();


export type CreateTableSchemaType = z.infer<typeof CreateTableSchema>;
export type UpdateTableSchemaType = z.infer<typeof UpdateTableSchema>;
export type TableStatusEnumType = z.infer<typeof TableStatusEnum>;
export type TableIdSchemaType = z.infer<typeof TableIdSchema>;
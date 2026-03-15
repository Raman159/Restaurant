import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string({ required_error: "User name is required" }),
  password: z.string({ required_error: "Password is required" }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
import { z } from "zod";

// const passwordRegex =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const createUserSchema = z.object({
  userName: z
    .string({ required_error: "user name is required" })
    .min(3, { message: "User name should be more than 3 character" }),

   password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),

});

export const userIdSchema = z
  .object({
    id: z.string({ required_error: "User id is required" }),
  })
  .strict();

export const userStatusSchema = z.object({
  isActive: z.boolean({ required_error: "Active status is required" }),
});

export const loginSchema = z.object({
  userName: z.string({ required_error: "User name is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const updateUserSchema = z.object({
  userName: z
    .string({ required_error: "user name is required" })
    .min(3, { message: "User name should be more than 3 character" }),

   password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),

});


export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type UserIdSchemaType = z.infer<typeof userIdSchema>;
export type UserStatusSchemaType = z.infer<typeof userStatusSchema>;

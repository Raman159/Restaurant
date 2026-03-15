import { z } from "zod";

/**
 * Food Category Enum
 */
export const foodCategoryEnum = z.enum([
  "STARTER",
  "MAIN_COURSE",
  "DESSERT",
  "DRINK",
  "OTHER",
]);

/**
 * Create Food Item Schema
 */
export const createFoodItemSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),

  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0")
    .max(99999999.99, "Price exceeds maximum allowed value"),

  category: foodCategoryEnum.default("OTHER"),

  isAvailable: z.boolean().default(true),
  imageUrl: z.string().url("Image URL must be a valid URL").nullable().default(null),

});

export const updateFoodItemSchema = createFoodItemSchema.partial();
export const foodByNameSchema = z.object({
  name: z.string().min(1, "Name is required").max(150, "Name must be at most 150 characters"),
});
export const foodByIdSchema = z.object({
  id: z.coerce.number({
  
  }).positive("ID must be a positive number"),
});

export type CreateFoodItemSchemaType = z.infer<typeof createFoodItemSchema>;
export type UpdateFoodItemSchemaType = z.infer<typeof updateFoodItemSchema>;
export type FoodByNameSchemaType = z.infer<typeof foodByNameSchema>;
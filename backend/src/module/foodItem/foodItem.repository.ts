import { Runner } from "../../global/global";
import { FoodItem } from "../../models/FoodItem";
import {
  CreateFoodItemSchemaType,
  UpdateFoodItemSchemaType,
} from "./foodItem.schema";

export const FoodItemRepository = {
  // CREATE
  insert: async ({
    runner,
    data,
  }: Runner & { data: CreateFoodItemSchemaType }) => {
    const repo = runner.manager.getRepository(FoodItem);

    try {
      const response = await repo.save({
        ...data,
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // GET BY ID
  findByName: async ({ runner, name }: Runner & Pick<FoodItem, "name">) => {
    const repo = runner.manager.getRepository(FoodItem);

    try {
      const response = await repo.findOne({
        where: { name },
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // GET ALL FOOD ITEMS

  findAll: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(FoodItem);

    try {
      const response = await repo.find({
        order: {
          name: "ASC",
        },
      });

      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  // UPDATE
  updateFoodItem: async ({
    runner,
    id,
    data,
  }: Runner & {
    id: number;
    data: UpdateFoodItemSchemaType;
  }) => {
    const repo = runner.manager.getRepository(FoodItem);

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
  delete: async ({ runner, id }: Runner & Pick<FoodItem, "id">) => {
    const repo = runner.manager.getRepository(FoodItem);

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

  findById: async ({ runner, id }: Runner & Pick<FoodItem, "id">) => {
    const repo = runner.manager.getRepository(FoodItem);

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
  findByStatus: async ({
    runner,
    isAvailable,
  }: Runner & Pick<FoodItem, "isAvailable">) => {
    const repo = runner.manager.getRepository(FoodItem);
    try {
      const response = await repo.find({
        where: { isAvailable },
      });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },
};

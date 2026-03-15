import { Runner } from "../../global/global";
import { Exception } from "../../libs/exceptionHandler";

import ORMHelper from "../../libs/ORMHelper";
import { FoodItem } from "../../models/FoodItem";
import { FoodItemRepository } from "./foodItem.repository";
import {
  CreateFoodItemSchemaType,
  updateFoodItemSchema,
  UpdateFoodItemSchemaType,
} from "./foodItem.schema";

export const FoodItemService = {
  // CREATE
  create: async (data: CreateFoodItemSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const getFoodItem = await FoodItemRepository.findByName({
        runner,
        name: data.name,
      });
      if (getFoodItem) throw new Exception("Food item already exists", 400);
      const response = await FoodItemRepository.insert({ runner, data });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
  // GET BY Name
  getByName: async (name: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await FoodItemRepository.findByName({ runner, name });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  // GET ALL FOOD ITEMS
  getAll: async () => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await FoodItemRepository.findAll({ runner });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  // UPDATE
  update: async ({
    id,
    data,
  }: Runner & {
    id: number;
    data: UpdateFoodItemSchemaType;
  }) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const getFoodItem = await FoodItemRepository.findById({ runner, id });
      if (!getFoodItem)
        throw new Exception("Unable to find food item data", 400);
      await FoodItemRepository.updateFoodItem({ runner, id, data });
      const response = await FoodItemRepository.findById({ runner, id });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
    await ORMHelper.release(runner);
  },

  // DELETE
  delete: async (id: number) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const getFoodItem = await FoodItemRepository.findById({ runner, id });
      if (!getFoodItem)
        throw new Exception("Unable to find food item data", 400);
      const response = await FoodItemRepository.delete({ runner, id });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },

   findById: async (id: number) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await FoodItemRepository.findById({ runner, id });
      return response;
    } catch (error) {
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  }
};

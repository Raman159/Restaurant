import { Request, Response, NextFunction } from "express";
import {
  CreateFoodItemSchemaType,
  FoodByNameSchemaType,
} from "./foodItem.schema";
import { Exception } from "../../libs/exceptionHandler";
import { MulterHelper } from "../../middlewares/multer";
import { FoodItemService } from "./foodItem.service";
import { messageFormater } from "../../libs/messageFormater";
import { get } from "request";

export const FoodItemController = {
  addFoodItem: async (
    req: Request<{}, {}, CreateFoodItemSchemaType>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.files || !MulterHelper.isObject(req.files)) {
        throw new Exception("Image is required", 400);
      }

      const foodImg = req.files["foodImg"]?.[0]?.path.split("/").pop();
      if (!foodImg) {
        console.log("Food image extraction failed");
        throw new Exception("Please insert image", 400);
      }

      const data = {
        ...req.body,
        imageUrl: foodImg,
      };
      console.log(req.body.imageUrl);
      console.log("Data prepared:", data);

      const response = await FoodItemService.create(data);
      console.log("Food item added successfully:", response);

      res
        .status(200)
        .json(
          messageFormater(true, response, "Successfully saved food item data"),
        );
    } catch (error) {
      console.log("Error occurred:", error);
      next(error); // Ensure this is the only call in the catch block
    }
  },

  getAllFoodItems: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const response = await FoodItemService.getAll();
      res
        .status(200)
        .json(
          messageFormater(
            true,
            response,
            "Successfully retrieved all food items",
          ),
        );
    } catch (error) {
      console.log("Error occurred:", error);
      next(error);
    }
  },

  getFoodItemByName: async (
    req: Request<FoodByNameSchemaType, {}, {}>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name } = req.params;
      const response = await FoodItemService.getByName(name);
      res
        .status(200)
        .json(
          messageFormater(true, response, "Successfully retrieved food item"),
        );
    } catch (error) {
      console.log("Error occurred:", error);
      next(error);
    }
  },

  getFoodItemById: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const response = await FoodItemService.findById(id);
      res
        .status(200)
        .json(
          messageFormater(true, response, "Successfully retrieved food item"),
        );
    } catch (error) {
      console.log("Error occurred:", error);
      next(error);
    }
  },
};

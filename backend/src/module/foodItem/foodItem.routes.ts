import { Router } from "express";
import ZOD from "../../middlewares/schemaValidator";
import { FoodItemController } from "./foodItem.controller";
import {
  createFoodItemSchema,

} from "./foodItem.schema";
import { MulterHelper } from "../../middlewares/multer";

export const FoodRouter = (route: Router) => {
  route.get("/foods", FoodItemController.getAllFoodItems);
  route.post(
    "/food",
    MulterHelper.getStorage("uploads/foodItems", {
      moduleName: "foodItem",
    }).fields([{ name: "foodImg", maxCount: 1 }]),
    ZOD.requestParser({
      schema: createFoodItemSchema,
      type: "Body",
    }),
    FoodItemController.addFoodItem,

   //  route.get(
   //    "/food/:name",
   //    ZOD.requestParser({
   //      schema: FoodByNameSchema,
   //      type: "Params",
   //    }),
   //    FoodItemController.getFoodItemByName,
   //  ),
   //  route.delete(
   //    "/food/:id",
   //    ZOD.requestParser()
   //  )
  );

  //   route.get(
  //     "/table/:number",
  //     ZOD.requestParser({
  //       schema: TableNumberSchema,
  //       type: "Params",
  //     }),
  //     TableController.findByNumber,
  //   );
  //   route.delete(
  //     "/table/:id",
  //     ZOD.requestParser({
  //       schema: TableIdSchema,
  //       type: "Params",
  //     }),
  //     TableController.deleteTable,
  //   );
  //   route.patch(
  //     "/table/update/:id",
  //     ZOD.requestParser(
  //       {
  //         schema: UpdateTableSchema,
  //         type: "Body",
  //       },
  //       {
  //         schema: TableIdSchema,
  //         type: "Params",
  //       },
  //     ),
  //     TableController.updateTable,
  //   );
  // };
};

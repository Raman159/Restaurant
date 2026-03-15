import { Express, Router } from "express";
import { UserRouter } from "../module/user/user.routes";
import { AuthRouter } from "../module/auth/auth.routes";
import { Table } from "typeorm";
import { TableRouter } from "../module/table/table.routes";
import { FoodRouter } from "../module/foodItem/foodItem.routes";


export const router = (app: Express) => {
  const router = Router();
  TableRouter(router);
  UserRouter(router);
  AuthRouter(router);
  FoodRouter(router);
  app.use("/api/", router);
};

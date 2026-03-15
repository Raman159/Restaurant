import "reflect-metadata";
import { DataSource } from "typeorm";
import { getDatabasePath } from "./db-path";
import { User } from "../models/User";
import { Table } from "../models/Table";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { FoodItem } from "../models/FoodItem";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: getDatabasePath(),
  synchronize: true, // ok for dev, disable in prod
  logging: false,
  entities: [User, Table, Order, OrderItem, FoodItem], // add all your entities here
});

export const initializeDataSource = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log("📦 SQLite database connected at", getDatabasePath());
  } catch (error) {
    console.error("❌ DB connection failed", error);
    throw error;
  }
};

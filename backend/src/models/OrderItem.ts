// backend/src/modules/order/entities/orderItem.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { FoodItem } from "./FoodItem";
import { Order } from "./Order";


@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number; // price snapshot at time of order

  // 🔥 Many OrderItems belong to one Order
  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: "CASCADE",
  })
  order: Order;

  // 🔥 Many OrderItems reference one FoodItem
  @ManyToOne(() => FoodItem)
  foodItem: FoodItem;
}

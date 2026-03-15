// backend/src/modules/order/entities/order.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { Table } from "./Table";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  tableNumber: string; // optional for dine-in

  @Column({
    type: "varchar",
    length: 20,
    default: "PENDING",
  })
  status: "PENDING" | "PREPARING" | "COMPLETED" | "CANCELLED";

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  // 🔥 One Order has many OrderItems
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItem[];

  @ManyToOne(() => Table, (table) => table.orders)
  table: Table;
}

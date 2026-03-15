import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
 
} from "typeorm";
import { Order } from "./Order";

@Entity({ name: "tables" })
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tableNumber: string;

  @Column({
    type: "varchar",
    length: 10,
    default: "AVAILABLE",
  })
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED";

   @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}

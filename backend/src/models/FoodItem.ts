// backend/src/modules/food/entities/foodItem.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";



@Entity("food_items")
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  name: string;


  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({
    type: "varchar",
   length: 20,
    default: "OTHER"
  })
  category: "DRINK" | "STARTER" | "MAIN_COURSE" | "DESSERT" | "OTHER";

  @Column({ type: "boolean", default: true })
  isAvailable: boolean;

  @Column({ type: "varchar", nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

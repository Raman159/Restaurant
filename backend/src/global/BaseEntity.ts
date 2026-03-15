import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Admin")
export class BaseUserEntity {
  @PrimaryColumn({
    type: "varchar",
    nullable: false,
  })
  id: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  userName: string;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  password: string;

  @Column({
    type: "enum",
    enum: ["ADMIN", "USER"],
  })
  role: "ADMIN" | "USER";

  @Column({
    type: "boolean",
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

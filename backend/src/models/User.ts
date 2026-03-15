import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";

@Entity("Users")
export class User {
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
  type: "varchar",
  length: 10,
  default: "USER",
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

   @BeforeInsert()
   async hashPassword() {
     this.password = await bcrypt.hash(this.password, 10);
   }
}

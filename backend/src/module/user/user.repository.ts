import { date } from "zod";
import { Runner } from "../../global/global";

import { In } from "typeorm";
import { CreateUserSchemaType } from "./user.schema";
import { User } from "../../models/User";
import { uniqueKey } from "../../libs/hash";

export const UserRepository = {
  insert: async ({
    runner,
    data,
    
  }: Runner & { data: CreateUserSchemaType}) => {
    const repo = runner.manager.getRepository(User);

    try {
      const response = await repo.save({
        id: uniqueKey(),
        userName: data.userName,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return response;
    } catch (error: any) {
      throw error;
    }
  },

  findById: async ({ runner, id }: Runner & Pick<User, "id">) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.findOne({
        where: {
          id: id,
        },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  findByUserName: async ({
    runner,
    userName,
  }: Runner & Pick<User, "userName">) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.findOne({
        where: {
          userName: userName,
        },
      });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  findAllUser: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.find({
        where: {
          role: "USER",
        },
      });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  deleteUser: async ({ runner, id }: Runner & Pick<User, "id">) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.delete({
        id: id,
      });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },

  updateUser: async ({
    runner,
    id,
    data,
  }: Runner & { id: string; data: any }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.update(id, data);

      const result = await repo.findOne({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error: any) {
      error.level == "DB";
      throw error;
    }
  },
  
  setAssignedTrue: async ({
    runner,
    studentIds,
  }: Runner & { studentIds: string[] }) => {
    const repo = runner.manager.getRepository(User);
    await repo.update({ id: In(studentIds) }, { isAssigned: true });
  },


  setActiveStatus: async ({
    runner,
    id,
    status,
  }: Runner & { id: string; status: boolean }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.update({ id }, { isActive: status });
      return response;
    } catch (error: any) {
      error.level = "DB";
      throw error;
    }
  },
}


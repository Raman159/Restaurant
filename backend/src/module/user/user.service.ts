import { Exception } from "../../libs/exceptionHandler";
import ORMHelper from "../../libs/ORMHelper";
import { TableRepository } from "../table/table.repository";
import { UserRepository } from "./user.repository";
import { CreateUserSchemaType } from "./user.schema";

export const userService = {
  addUser: async (data: CreateUserSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const existingUser = await UserRepository.findByUserName({
        runner,
        userName: data.userName,
      });
      if (existingUser) {
        throw new Exception("User name already exists, please login", 400);
      }

      const createdUser = await UserRepository.insert({ runner, data });
      await runner.commitTransaction();
      return createdUser;
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  findAllUsers: async () => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const users = await UserRepository.findAllUser({ runner });
      return users;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  findUserById: async (id: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const user = await UserRepository.findById({ runner, id });
      if (!user) throw new Exception("User not found", 404);
      return user;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  updateUser: async (id: string, data: Partial<CreateUserSchemaType>) => {
    const runner = await ORMHelper.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const existingUser = await UserRepository.findById({ runner, id });
      if (!existingUser) throw new Exception("User does not exist", 404);

      const updatedUser = await UserRepository.updateUser({ runner, id, data });
      await runner.commitTransaction();
      return updatedUser;
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },

  deleteUser: async (id: string) => {
    const runner = await ORMHelper.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const existingUser = await UserRepository.findById({ runner, id });
      if (!existingUser) throw new Exception("User not found", 404);

      const result = await UserRepository.deleteUser({ runner, id });
      if (result.affected === 0)
        throw new Exception("Unable to delete user", 400);

      await runner.commitTransaction();
      return { message: "User deleted successfully" };
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      await ORMHelper.release(runner);
    }
  },
};

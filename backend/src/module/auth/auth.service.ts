import bcrypt from "bcrypt";
import { Exception } from "../../libs/exceptionHandler";
import { UserRepository } from "../user/user.repository"; // adjust path
import ORMHelper from "../../libs/ORMHelper";

export const authService = {
  login: async (userName: string, password: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const user = await UserRepository.findByUserName({ runner, userName });

      if (!user) {
        throw new Exception("Invalid username or password", 401);
      }

      if (!user.isActive) {
        throw new Exception("User account is inactive", 403);
      }

      // const isPasswordValid = await bcrypt.compare(password, user.password);
      let isPasswordValid = false;

      if(user.password == password){
        isPasswordValid = true;
      }

      if (!isPasswordValid) {
        throw new Exception("Invalid username or password", 401);
      }

      // IMPORTANT: never return password
      return {
        id: user.id,
        userName: user.userName,
        role: user.role,
        isActive: user.isActive,
      };
    } catch (error: any) {
      await ORMHelper.release(runner);
      throw error;
    }
  },
};

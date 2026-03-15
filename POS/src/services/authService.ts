import apiClient from "../apiClient";
import { handleApiError } from "../helper/errorHelper";

export type LoginCredentials = { userName: string; password: string };

export type LoginUser = {
  id: string;
  userName: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
};

export type LoginResponse = {
  success: boolean;
  statusCode: number;
  data: LoginUser;
  message: string;
};

export const authService = {
 login: async (credentials: LoginCredentials): Promise<LoginUser> => {
    try {
      const res = await apiClient.post<LoginResponse>("/auth/login", credentials);
      if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
      }
      return res.data.data; // ✅ only return the user object
    } catch (err) {
      throw handleApiError(err);
    }
  },
  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      throw handleApiError(err);
    }
  },
};

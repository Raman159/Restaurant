import apiClient from "../apiClient";
import { handleApiError } from "../helper/errorHelper";
import type { ApiResponse } from "../types/api";

export type UserData = {
  id?: string;
  userName: string;
  password: string;
  role?: "ADMIN" | "USER";
  isActive?: boolean;
};

export type UserStatus = {
  isActive: boolean;
};

export const userService = {
  // ✅ Fetch all users
  getUsers: async (): Promise<UserData[]> => {
    try {
      const res = await apiClient.get<ApiResponse<UserData[]>>("/users");
      return res.data.data; // ✅ UNWRAP HERE
    } catch (error) {
      throw handleApiError(error); // 🔥 do NOT return error
    }
  },

  // ✅ Add user
  addUser: async (userData: UserData): Promise<UserData> => {
    try {
      const res = await apiClient.post<ApiResponse<UserData>>(
        "/users",
        userData
      );
      return res.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // ✅ Update user
  updateUser: async (
    id: string,
    userData: Partial<UserData>
  ): Promise<UserData> => {
    try {
      const res = await apiClient.patch<ApiResponse<UserData>>(
        `/user/update/${id}`,
        userData
      );
      return res.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // ✅ Delete user
  deleteUser: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<ApiResponse<null>>(`/user/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // ✅ Toggle active status (optional)
  setActiveStatus: async (
    id: string,
    status: UserStatus
  ): Promise<void> => {
    try {
      await apiClient.patch<ApiResponse<null>>(
        `/users/${id}/status`,
        status
      );
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

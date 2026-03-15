import { useState } from "react";
import { handleApiError } from "../helper/errorHelper";
import {
  authService,
  type LoginCredentials,
  type LoginUser,
} from "../services/authService";

export const useAuthController = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; user?: LoginUser }> => {
    setLoading(true);
    setError(null);

    try {
      // authService.login now returns LoginUser directly
      const user: LoginUser = await authService.login(credentials);

      return { success: true, user }; // ✅ directly return user
    } catch (err) {
      // store error for UI
      handleApiError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { login, loading, error, clearError };
};

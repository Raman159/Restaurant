import { useState } from "react";

interface User {
  id: string;
  userName: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  const setAuthUser = (userData: User) => {
    setUser(userData);
  };

  return { user, logout, setAuthUser };
};
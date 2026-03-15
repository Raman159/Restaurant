import React, { createContext, useState } from "react";
import { authService, type LoginUser } from "../services/authService";

interface AuthContextProps {
  user: LoginUser | null;
  isAuthenticated: boolean;
  login: (user: LoginUser) => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) as LoginUser : null;
  });

  const login = (user: LoginUser) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

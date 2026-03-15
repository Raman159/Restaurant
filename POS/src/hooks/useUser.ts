import { userService, type UserData } from "../services/userService";
import { useCallback, useState } from "react";
import { handleApiError } from "../helper/errorHelper";

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.getUsers();
      setUsers(res); // ✅ FIX
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = async (user: UserData) => {
    setLoading(true);
    try {
      const res = await userService.addUser(user);
      setUsers((prev) => [...prev, res]); // ✅ FIX
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, user: Partial<UserData>) => {
    setLoading(true);
    try {
      const res = await userService.updateUser(id, user);
      const updatedUser = res;
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, fetchUsers, addUser, updateUser, deleteUser };
};

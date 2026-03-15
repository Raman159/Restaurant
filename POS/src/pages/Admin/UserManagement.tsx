import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiEye, FiTrash2, FiXCircle } from "react-icons/fi";
import { useUsers } from "../../hooks/useUser";
import type { UserData } from "../../services/userService";
import ConfirmationModal from "../../components/ConfirmationModal";
import Overlay from "../../components/Overlay";
import Button from "../../components/Button";
import { useToast } from "../../hooks/useToast";

/* ---------------- Types ---------------- */

type UserFormData = {
  userName: string;
  password?: string;
  role: "ADMIN" | "USER";
  isActive?: boolean;
};

const emptyUser: UserFormData = {
  userName: "",
  password: "",
  role: "USER",
  isActive: true,
};

/* ---------------- Main Component ---------------- */

const UserManagement: React.FC = () => {
  const { showToast } = useToast();
  const { users, loading, fetchUsers, addUser, updateUser, deleteUser } =
    useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* -------- Handlers -------- */

  const openAddModal = () => {
    setSelectedUser(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openViewModal = (user: UserData) => {
    setSelectedUser(user);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: UserFormData, id?: string) => {
    try {
      if (modalMode === "add") {
        await addUser({ ...data, password: data.password || "" });
        showToast("success", "User Added", "User created successfully");
      } else if (modalMode === "edit" && id) {
        await updateUser(id, data);
        showToast("success", "User Updated", "User updated successfully");
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      const error = err as { message?: string };
      showToast("error", "Error", error?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.id!);
    setShowDeleteModal(false);
    showToast("success", "Deleted", "User removed successfully");
  };

  /* -------- UI -------- */

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <FiPlus /> Add User
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">👤</div>
            <p className="text-gray-600">No users found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-3 font-medium">{user.userName}</td>
                  <td className="px-6 py-3 text-center">{user.role}</td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button onClick={() => openViewModal(user)}>
                      <FiEye />
                    </button>
                    <button onClick={() => openEditModal(user)}>
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <UserModal
          mode={modalMode}
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete User"
        message={`Delete ${selectedUser?.userName}?`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default UserManagement;

/* ---------------- Modal ---------------- */

interface UserModalProps {
  mode: "add" | "edit" | "view";
  user: UserData | null;
  onClose: () => void;
  onSubmit: (data: UserFormData, id?: string) => void;
  validationErrors: Record<string, string>;
  setValidationErrors: (e: Record<string, string>) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  mode,
  user,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<UserFormData>(
    user
      ? { userName: user.userName, role: user.role || "USER", isActive: user.isActive || true }
      : emptyUser
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName) return;
    onSubmit(formData, user?.id);
  };

  return (
    <Overlay onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">
            {mode === "add"
              ? "Add User"
              : mode === "edit"
              ? "Edit User"
              : "User Details"}
          </h2>
          <button onClick={onClose}>
            <FiXCircle />
          </button>
        </div>

        {mode === "view" ? (
          <div className="space-y-2">
            <p><b>Username:</b> {user?.userName}</p>
            <p><b>Role:</b> {user?.role}</p>
            <p><b>Status:</b> {user?.isActive ? "Active" : "Inactive"}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Username"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />

            {mode === "add" && (
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}

            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as "ADMIN" | "USER" })
              }
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        )}
      </div>
    </Overlay>
  );
};

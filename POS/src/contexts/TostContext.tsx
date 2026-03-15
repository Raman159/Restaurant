// frontend/src/context/ToastProvider.tsx
import React, { useState, useEffect, type ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import ToastContainer, { type ToastItem } from "../components/ToastContainer";
import type { ToastType } from "../components/Toast";
import { setGlobalShowToast } from "../utils/globalToast";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: ToastType, title: string, message?: string, duration = 5000) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };

  // Save globally for api error handler in useEffect
  useEffect(() => {
    setGlobalShowToast(showToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};


export { ToastContext };

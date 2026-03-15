import React, { createContext, useState, useCallback } from "react";

type ToastType = "info" | "success" | "error";

interface ToastContextProps {
  showToast: (type: ToastType, title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export { ToastContext };

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ type: ToastType; title: string; message: string } | null>(null);

  const showToast = useCallback((type: ToastType, title: string, message: string) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <strong>{toast.title}</strong>: {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
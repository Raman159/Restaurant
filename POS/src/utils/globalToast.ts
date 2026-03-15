import type { ToastType } from "../components/Toast";

let globalShowToast: ((type: ToastType, title: string, message?: string, duration?: number) => void) | null = null;

export const setGlobalShowToast = (fn: (type: ToastType, title: string, message?: string, duration?: number) => void) => {
  globalShowToast = fn;
};

export const getGlobalShowToast = () => globalShowToast;
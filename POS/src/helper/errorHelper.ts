// frontend/src/helper/errorHelper.ts
import axios from "axios";
import { getGlobalShowToast } from "../utils/globalToast";

export const handleApiError = (error: unknown): never => {
  let message = "An unknown error occurred";

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.message || "API Error";
    console.error("API Error Details:", error.response?.data || error.message);
  } else if (error instanceof Error) {
    message = error.message;
    console.error("System Error:", error.message);
  } else {
    console.error("Unexpected Error:", error);
  }

  // Show toast globally
  const showToast = getGlobalShowToast();
  if (showToast) {
    showToast("error", "Error", message);
  }

  // Always throw to stop further execution if needed
  throw new Error(message);
};

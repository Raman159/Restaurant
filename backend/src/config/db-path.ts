import path from "path";
import { app } from "electron";
import { env } from "./env.config";

export const getDatabasePath = () => {
  if (env.ELECTRON) {
    // Electron production path
    return path.join(app.getPath("userData"), env.DB_NAME!);
  }
  // Dev fallback path
  return path.join(process.cwd(), env.DB_NAME || "restaurant.dev.db");
};

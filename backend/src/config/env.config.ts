import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
   ? path.resolve(__dirname, "../../../.env.prod")  // go up 3 levels to root
    : path.resolve(__dirname, "../../../.env.dev");

console.log("Loading env file from:", envFile);

const result = dotenv.config({ path: envFile });
if (result.error) {
  console.error("Failed to load env file:", result.error);
}

console.log("process.env.PORT =", process.env.PORT);

const port = process.env.PORT ? Number(process.env.PORT) : NaN;

if (isNaN(port)) {
  throw new Error("PORT is not defined or not a number in env file");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SERVER_PORT: port,
  DB_NAME: process.env.DB_NAME,
  REACT_DEV_SERVER: process.env.REACT_DEV_SERVER,
  ELECTRON: process.env.ELECTRON === "true",
};

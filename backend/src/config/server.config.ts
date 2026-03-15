import express, { Express } from "express";
import { router } from "../shared";
import { env } from "./env.config";
import * as dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";

import cors from "cors";
import { errorHandler } from "../libs/errorHandler";
import { UserRouter } from "../module/user/user.routes";

dotenv.config();

export const initializeExpressServer = (app: Express) => {
  
  // Serve static files
  app.use("/public", express.static(path.resolve("public")));

  // Middleware
  app.use(morgan("dev"));
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.disable("x-powered-by");
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Main API routes
   router(app);
  // Global error handler
  app.use(errorHandler());

  // Start server
  const PORT =env.SERVER_PORT;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at port ${PORT}`);
  });
};

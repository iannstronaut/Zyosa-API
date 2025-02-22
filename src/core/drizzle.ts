import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import config from "../config/config";
import { logger } from "./winston";

const connection = await mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: Number(config.db.port),
});

const drizzleLogger = {
  logQuery: (query: string, params?: unknown[]) => {
    logger.info(
      `Executing Query: ${query} ${params ? JSON.stringify(params) : ""}`
    );
  },
  logError: (error: Error, query?: string, params?: unknown[]) => {
    logger.error(
      `Drizzle Error: ${error.message} | Query: ${
        query ?? "Unknown"
      } | Params: ${params ? JSON.stringify(params) : "N/A"}`
    );
  },
};

export const db = drizzle({ client: connection, logger: drizzleLogger });

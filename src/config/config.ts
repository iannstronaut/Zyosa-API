import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../env/.env.dev") });

export default {
  app: {
    name: process.env.APP_NAME || "Hono",
    debug: process.env.APP_DEBUG || true,
    jwtSecret: process.env.JWT_SECRET,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
  },
};

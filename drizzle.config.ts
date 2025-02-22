import { defineConfig } from "drizzle-kit";
import config from "./src/config/config";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/schema/model.ts",
  dbCredentials: {
    url: `mysql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`,
  },
});

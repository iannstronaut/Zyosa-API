import { Hono } from "hono";
import { logger } from "./core/winston";
import { cors } from "hono/cors";
import { z } from "zod";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ErrorHandling } from "./types/error_type";

const app = new Hono()
  .use(
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )
  .basePath("/api");

app.use("*", async (c, next) => {
  const start = performance.now();
  await next();
  const end = performance.now();
  const duration = end - start;
  logger.info(
    `[${c.req.method}] ${c.req.path} \t-\t ${c.res.status}   ${duration.toFixed(
      2
    )}ms`
  );
});

app.notFound((c) => {
  logger.warn(`[${c.req.method}] ${c.req.path} \t-\t 404 not found`);
  return c.json(
    {
      message: "Not Found",
      error: {
        issue: `Path ${c.req.path} not found`,
      },
    },
    404
  );
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError((err, c) => {
  logger.error(err);
  if (err instanceof ErrorHandling) {
    return c.json(
      {
        message: err.message,
        error: {
          issue: err.issue,
          error_details: err.error_details,
        },
      },
      err.statusCode as ContentfulStatusCode
    );
  }
  if (err instanceof z.ZodError) {
    return c.json(
      {
        message: "Entity Validation Error",
        error: {
          issue: "Invalid request body",
          error_details: err.formErrors.fieldErrors,
        },
      },
      422
    );
  }
  return c.json(
    {
      message: "Internal Server Error",
      error: {
        issue: "An unexpected error occurred",
      },
    },
    500
  );
});

export default {
  port: 8080,
  fetch: app.fetch,
};
